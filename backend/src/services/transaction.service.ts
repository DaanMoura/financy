import { CreateTransactionInput, UpdateTransactionInput } from '../dtos/input/transaction.input'
import { prismaClient } from '../client/prisma'

export class TransactionService {
  async createTransaction(data: CreateTransactionInput, userId: string) {
    const category = await prismaClient.category.findUnique({
      where: { id: data.categoryId }
    })

    if (!category) {
      throw new Error('Category not found')
    }

    return prismaClient.transaction.create({
      data: {
        description: data.description,
        type: data.type,
        amount: data.amount,
        date: data.date,
        category: { connect: { id: data.categoryId } },
        user: { connect: { id: userId } }
      }
    })
  }

  async updateTransaction(id: string, data: UpdateTransactionInput, userId: string) {
    const transaction = await prismaClient.transaction.findUnique({
      where: { id }
    })

    if (!transaction) {
      throw new Error('Transaction not found')
    }

    if (transaction.userId !== userId) {
      throw new Error('User is not authorized to update transaction of another user')
    }

    const updatedTransaction = await prismaClient.transaction.update({
      where: { id },
      data: {
        description: data.description || transaction.description,
        type: data.type || transaction.type,
        amount: data.amount || transaction.amount,
        date: data.date || transaction.date,
        category: { connect: { id: data.categoryId || transaction.categoryId } }
      }
    })

    return updatedTransaction
  }

  async deleteTransaction(id: string, userId: string) {
    const transaction = await prismaClient.transaction.findUnique({
      where: { id }
    })

    if (!transaction) {
      throw new Error('Transaction not found')
    }

    if (transaction.userId !== userId) {
      throw new Error('User is not authorized to delete transaction of another user')
    }

    await prismaClient.transaction.delete({
      where: { id }
    })
  }

  async listTransactions(userId: string) {
    const transactions = await prismaClient.transaction.findMany({
      where: { userId },
      orderBy: {
        date: 'desc'
      }
    })

    return transactions
  }

  async listTransactionsByCategory(categoryId: string, userId: string) {
    const category = await prismaClient.category.findUnique({
      where: { id: categoryId }
    })

    if (!category) {
      throw new Error('Category not found')
    }

    if (category.userId !== userId) {
      throw new Error('User is not authorized to list transactions of another user')
    }

    const transactions = await prismaClient.transaction.findMany({
      where: { categoryId }
    })

    return transactions
  }

  async findTransactionById(id: string, userId: string) {
    const transaction = await prismaClient.transaction.findUnique({
      where: { id }
    })

    if (!transaction) {
      throw new Error('Transaction not found')
    }

    if (transaction.userId !== userId) {
      throw new Error('User is not authorized to find transaction of another user')
    }

    return transaction
  }
}
