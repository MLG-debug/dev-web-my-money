import { Category } from '@app/entities/category'
import { Category as RawCategory } from '@prisma/client'

export class PrismaCategoryMapper {
  static toPrisma(category: Category) {
    return {
      id: category.id,
      name: category.name,
      archived: category.archived,

      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }
  }

  static toDomain(raw: RawCategory) {
    return new Category(
      {
        name: raw.name,
        archived: raw.archived,

        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    )
  }
}
