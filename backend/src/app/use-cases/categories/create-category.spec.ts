import { InMemoryCategoriesRepository } from '@infra/database/in-memory-database/repositories/in-memory-categories-repository'
import { CreateCategoryUseCase } from './create-category'

let categoriesRepository: InMemoryCategoriesRepository

let sut: CreateCategoryUseCase

describe('Create Category Use Case', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new CreateCategoryUseCase(categoriesRepository)
  })

  it('should be able to create a new category', async () => {
    const category = await sut.execute({ name: 'Category 1' })
    expect(category).toHaveProperty('category')
    expect(category.category).toHaveProperty('id')
    expect(category.category).toHaveProperty('name', 'Category 1')
  })

  it('should not be able to create a new category with the same name as another', async () => {
    await sut.execute({ name: 'Category 1' })
    await expect(sut.execute({ name: 'Category    1' })).rejects.toThrow()
  })
})
