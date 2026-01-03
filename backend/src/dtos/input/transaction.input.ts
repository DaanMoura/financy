import { TransactionType } from '@prisma/client'
import { Field, GraphQLISODateTime, InputType, Int } from 'type-graphql'

@InputType()
export class CreateTransactionInput {
  @Field(() => String)
  description!: string

  @Field(() => TransactionType)
  type!: TransactionType

  @Field(() => Int)
  amount!: number

  @Field(() => GraphQLISODateTime)
  date!: Date

  @Field(() => String)
  categoryId!: string
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType

  @Field(() => Int, { nullable: true })
  amount?: number

  @Field(() => GraphQLISODateTime, { nullable: true })
  date?: Date

  @Field(() => String, { nullable: true })
  categoryId?: string
}
