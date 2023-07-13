import { InMemoryCategoriesRepository } from '@infra/database/in-memory-database/repositories/in-memory-categories-repository'
import { makeCategory } from '@test/factories/category-factory'
import { GetAllCategoriesUseCase } from './get-all-categories'

let categoriesRepository: InMemoryCategoriesRepository

let sut: GetAllCategoriesUseCase

describe('Find All Categories Use Case', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new GetAllCategoriesUseCase(categoriesRepository)
  })

  it('should be able to get all categories', async () => {
    for (let i = 0; i < 15; i++) {
      const { category } = makeCategory()
      categoriesRepository.categories.push(category)
    }

    const { categories } = await sut.execute()

    expect(categories).toHaveLength(15)
    expect(categoriesRepository.categories).toHaveLength(15)
  })
})
