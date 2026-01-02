import { prismaClient } from "../client/prisma";
import { CreateCategoryInput, UpdateCategoryInput } from "../dtos/input/category.input";

export class CategoryService {
  async createCategory(data: CreateCategoryInput, userId: string) {
    return prismaClient.category.create({
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        color: data.color,
        userId
      }
    })
  }

  async updateCategory(id: string, data: UpdateCategoryInput) {
    const category = await prismaClient.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new Error('Category not found');
    }

    return prismaClient.category.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        color: data.color
      }
    })
  }

  async deleteCategory(id: string) {
    const category = await prismaClient.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new Error('Category not found');
    }

    return prismaClient.category.delete({
      where: { id }
    })
  }

  async listCategories(userId: string) {
    return prismaClient.category.findMany({
      where: { userId },
    })
  }
}
