import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { CategoryModel } from "../models/category.model";
import { IsAuth } from "../middlewares/auth.middleware";
import { CategoryService } from "../services/category.service";
import { CreateCategoryInput, UpdateCategoryInput } from "../dtos/input/category.input";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { User } from "@prisma/client";

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
  private categoryService = new CategoryService()

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg("data", () => CreateCategoryInput) data: CreateCategoryInput,
    @GqlUser() user: User
  ): Promise<CategoryModel> {
    return this.categoryService.createCategory(data, user.id);
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg("id", () => String) id: string,
    @Arg("data", () => UpdateCategoryInput) data: UpdateCategoryInput,
  ): Promise<CategoryModel> {
    return this.categoryService.updateCategory(id, data);
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Arg('id', () => String) id: string): Promise<boolean> {
    await this.categoryService.deleteCategory(id)
    return true
  }

  @Query(() => [CategoryModel])
  async listCategories(
    @GqlUser() user: User
  ): Promise<CategoryModel[]> {
    return this.categoryService.listCategories(user.id)
  }
}
