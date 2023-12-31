import { InMemoryCategoriesRepository } from '@infra/database/in-memory-database/repositories/in-memory-categories-repository'
import { makeCategory } from '@test/factories/category-factory'
import { GetCategoryByIdUseCase } from './get-category-by-id'

let categoriesRepository: InMemoryCategoriesRepository

let sut: GetCategoryByIdUseCase

describe('Find Category By Id Use Case', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new GetCategoryByIdUseCase(categoriesRepository)
  })

  it('should be able to get category by id', async () => {
    const { category: createdCategory } = makeCategory({ name: 'category 111' })
    categoriesRepository.categories.push(createdCategory)

    const { category } = await sut.execute({ categoryId: createdCategory.id })

    expect(category).toBeTruthy()
    expect(category.name).toEqual('category 111')
    expect(categoriesRepository.categories).toHaveLength(1)
  })

  it('should not be able to get a category if it does not exist', async () => {
    await expect(
      sut.execute({ categoryId: 'invalid-id' }),
    ).rejects.toThrowError()
  })
})
