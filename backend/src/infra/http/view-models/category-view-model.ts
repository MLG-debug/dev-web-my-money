import { Category } from '@app/entities/category'

export class CategoryViewModel {
  static toHTTP(category: Category) {
    return {
      id: category.id,
      name: category.name,

      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }
  }
}
