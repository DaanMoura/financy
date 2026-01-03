import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from 'type-graphql'
import { CategoryModel } from '../models/category.model'
import { IsAuth } from '../middlewares/auth.middleware'
import { TransactionService } from '../services/transaction.service'
import { UserService } from '../services/user.service'
import { CategoryService } from '../services/category.service'
import { UserModel } from '../models/user.model'
import { TransactionModel } from '../models/transaction.model'
import { CreateTransactionInput, UpdateTransactionInput } from '../dtos/input/transaction.input'
import { GqlUser } from '../graphql/decorators/user.decorator'
import { User } from '@prisma/client'

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  private transactionService = new TransactionService()
  private userService = new UserService()
  private categoryService = new CategoryService()

  @Mutation(() => TransactionModel)
  @UseMiddleware(IsAuth)
  async createTransaction(
    @Arg('data', () => CreateTransactionInput) data: CreateTransactionInput,
    @GqlUser() user: User
  ): Promise<TransactionModel> {
    return this.transactionService.createTransaction(data, user.id)
  }

  async updateTransaction(
    @Arg('id', () => String) id: string,
    @Arg('data', () => UpdateTransactionInput) data: UpdateTransactionInput,
    @GqlUser() user: User
  ): Promise<TransactionModel> {
    return this.transactionService.updateTransaction(id, data, user.id)
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg('id', () => String) id: string,
    @GqlUser() user: User
  ): Promise<boolean> {
    await this.transactionService.deleteTransaction(id, user.id)
    return true
  }

  @Query(() => [TransactionModel])
  async listTransactions(@GqlUser() user: User): Promise<TransactionModel[]> {
    return this.transactionService.listTransactions(user.id)
  }

  @FieldResolver(() => UserModel)
  async user(@Root() transaction: TransactionModel): Promise<UserModel> {
    return this.userService.findUser(transaction.userId)
  }

  @FieldResolver(() => CategoryModel)
  async category(
    @Root() transaction: TransactionModel,
    @GqlUser() user: User
  ): Promise<CategoryModel> {
    return this.categoryService.findCategoryById(transaction.categoryId, user.id)
  }
}
