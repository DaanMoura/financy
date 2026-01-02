import { Field, GraphQLISODateTime, ID, Int, ObjectType, registerEnumType } from "type-graphql"
import { UserModel } from "./user.model"
import { CategoryModel } from "./category.model"
import { TransactionType } from "@prisma/client"

registerEnumType(TransactionType, {
  name: "TransactionType",
});

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  description!: string

  @Field(() => TransactionType)
  type!: TransactionType

  @Field(() => Int)
  amount!: number

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date

  @Field(() => String)
  userId!: string

  @Field(() => UserModel, { nullable: true })
  user?: UserModel

  @Field(() => String)
  cateogryId!: string

  @Field(() => CategoryModel, { nullable: true })
  category?: CategoryModel
}
