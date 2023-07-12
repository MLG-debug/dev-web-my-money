import { Category } from '@app/entities/category'
import { CategoriesRepository } from '@app/repositories/categories-repository'
import { PrismaService } from '../prisma.service'
import { PrismaCategoryMapper } from '../mappers/prisma-category-mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaCategoriesRepository implements CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async create(category: Category) {
    const raw = PrismaCategoryMapper.toPrisma(category)
    const categoryCreated = await this.prisma.category.create({
      data: raw,
    })

    return PrismaCategoryMapper.toDomain(categoryCreated)
  }

  async findById(categoryId: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
        archived: false,
      },
    })

    if (!category) {
      return null
    }

    return PrismaCategoryMapper.toDomain(category)
  }

  async findByName(categoryName: string) {
    const category = await this.prisma.category.findFirst({
      where: {
        name: categoryName,
        archived: false,
      },
    })

    if (!category) {
      return null
    }

    return PrismaCategoryMapper.toDomain(category)
  }

  async findAll() {
    const categories = await this.prisma.category.findMany({
      where: {
        archived: false,
      },
    })

    return categories.map(PrismaCategoryMapper.toDomain)
  }

  async archive(categoryId: string) {
    await this.prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        archived: true,
      },
    })
  }

  async save(category: Category) {
    const raw = PrismaCategoryMapper.toPrisma(category)
    await this.prisma.category.update({
      where: {
        id: category.id,
      },
      data: raw,
    })
  }
}
