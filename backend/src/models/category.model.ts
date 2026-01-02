import { Field, GraphQLISODateTime, ID, ObjectType, registerEnumType } from "type-graphql";
import { UserModel } from "./user.model";
import { TransactionModel } from "./transaction.model";
import { CategoryIcon } from "@prisma/client";

registerEnumType(CategoryIcon, {
  name: "CategoryIcon",
});

@ObjectType()
export class CategoryModel {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  title!: string

  @Field(() => String, { nullable: true })
  description!: string | null

  @Field(() => CategoryIcon)
  icon!: CategoryIcon

  @Field(() => String)
  color!: string

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date

  @Field(() => String)
  userId!: string

  @Field(() => UserModel, { nullable: true })
  user?: UserModel

  @Field(() => [TransactionModel], { nullable: true })
  transactions?: TransactionModel[]
}
