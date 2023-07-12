import { Category } from '../entities/category'

export abstract class CategoriesRepository {
  abstract create(category: Category): Promise<Category>
  abstract findById(categoryId: string): Promise<Category | null>
  abstract findByName(categoryName: string): Promise<Category | null>
  abstract findAll(): Promise<Category[] | null>

  abstract archive(categoryId: string): Promise<void>
  abstract save(category: Category): Promise<void>
}
