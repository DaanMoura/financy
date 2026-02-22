import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class SummaryModel {
  @Field(() => Number)
  totalBalance!: number

  @Field(() => Number)
  monthlyIncome!: number

  @Field(() => Number)
  monthlyExpense!: number
}
