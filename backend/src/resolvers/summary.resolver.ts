import { Query, Resolver, UseMiddleware } from 'type-graphql'
import { SummaryModel } from '../models/summary.model'
import { IsAuth } from '../middlewares/auth.middleware'
import { TransactionService } from '../services/transaction.service'
import { GqlUser } from '../graphql/decorators/user.decorator'
import { User } from '@prisma/client'

@Resolver(() => SummaryModel)
@UseMiddleware(IsAuth)
export class SummaryResolver {
  private transactionService = new TransactionService()

  @Query(() => SummaryModel)
  async getSummary(@GqlUser() user: User): Promise<SummaryModel> {
    const transactions = await this.transactionService.listTransactions(user.id)

    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    let totalBalance = 0
    let monthlyIncome = 0
    let monthlyExpense = 0

    for (const transaction of transactions) {
      if (transaction.type === 'INCOME') {
        totalBalance += transaction.amount
      } else {
        totalBalance -= transaction.amount
      }

      const transactionDate = new Date(transaction.date)
      if (
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      ) {
        if (transaction.type === 'INCOME') {
          monthlyIncome += transaction.amount
        } else {
          monthlyExpense += transaction.amount
        }
      }
    }

    return {
      totalBalance,
      monthlyIncome,
      monthlyExpense
    }
  }
}
