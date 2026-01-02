import { CategoryIcon } from "@prisma/client";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  title!: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => CategoryIcon)
  icon!: CategoryIcon

  @Field(() => String)
  color!: string
}

@InputType()
export class UpdateCategoryInput {
  @Field(() => String, { nullable: false })
  title?: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => CategoryIcon, { nullable: true })
  icon?: CategoryIcon

  @Field(() => String, { nullable: true })
  color?: string
}
