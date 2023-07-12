import { Category } from '@app/entities/category'
import { CategoriesRepository } from '@app/repositories/categories-repository'

export class InMemoryCategoriesRepository implements CategoriesRepository {
  public categories: Category[] = []

  async create(category: Category) {
    this.categories.push(category)
    return category
  }

  async findById(categoryId: string) {
    const category = this.categories.find((c) => c.id === categoryId)
    return category ?? null
  }

  async findByName(categoryName: string) {
    const category = this.categories.find((c) => c.name === categoryName)
    return category ?? null
  }

  async findAll() {
    return this.categories.filter((c) => c.archived !== true)
  }

  async archive(categoryId: string) {
    const category = await this.findById(categoryId)
    if (category) {
      category.archived = true
    }
  }

  async save(category: Category) {
    const categoryIndex = this.categories.findIndex((c) => c.id === category.id)
    if (categoryIndex >= 0) {
      this.categories[categoryIndex] = category
    }
  }
}
