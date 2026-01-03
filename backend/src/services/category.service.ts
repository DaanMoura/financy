import { prismaClient } from '../client/prisma'
import { CreateCategoryInput, UpdateCategoryInput } from '../dtos/input/category.input'

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

  async updateCategory(id: string, data: UpdateCategoryInput, userId: string) {
    const category = await prismaClient.category.findUnique({
      where: { id }
    })

    if (!category) {
      throw new Error('Category not found')
    }

    if (category.userId !== userId) {
      throw new Error('User is not authorized to update category of another user')
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

  async deleteCategory(id: string, userId: string) {
    const category = await prismaClient.category.findUnique({
      where: { id }
    })

    if (!category) {
      throw new Error('Category not found')
    }

    if (category.userId !== userId) {
      throw new Error('User is not authorized to delete category of another user')
    }

    return prismaClient.category.delete({
      where: { id }
    })
  }

  async listCategories(userId: string) {
    return prismaClient.category.findMany({
      where: { userId }
    })
  }

  async findCategoryById(id: string, userId: string) {
    const category = await prismaClient.category.findUnique({
      where: { id }
    })

    if (!category) {
      throw new Error('Category not found')
    }

    if (category.userId !== userId) {
      throw new Error('User is not authorized to access category of another user')
    }

    return category
  }
}
