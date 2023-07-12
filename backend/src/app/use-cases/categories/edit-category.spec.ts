import { InMemoryCategoriesRepository } from '@infra/database/in-memory-database/repositories/in-memory-categories-repository'
import { makeCategory } from '@test/factories/category-factory'
import { ResourceNotFound } from '../@errors/resource-not-found-error'
import { EditCategoryUseCase } from './edit-category'
import { DataError } from '../@errors/data-error'

let categoriesRepository: InMemoryCategoriesRepository

let sut: EditCategoryUseCase

describe('Edit Category Use Case', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new EditCategoryUseCase(categoriesRepository)
  })

  it('should be able to edit a category', async () => {
    const { category } = makeCategory()
    await categoriesRepository.create(category)
    await sut.execute({ categoryId: category.id, name: 'Category 2' })

    const editedCategory = await categoriesRepository.findById(category.id)

    expect(categoriesRepository.categories).toHaveLength(1)
    expect(editedCategory.name).toEqual('Category 2')
  })

  it('should not be able to edit a category if it does not exist', async () => {
    await expect(
      sut.execute({ categoryId: 'invalid-id', name: 'name' }),
    ).rejects.toThrow(ResourceNotFound)
  })

  it('should not be able to edit a category if the name is already in use', async () => {
    const { category } = makeCategory({ name: 'category name 1' })
    await categoriesRepository.create(category)
    await expect(
      sut.execute({ categoryId: category.id, name: 'category   name 1' }),
    ).rejects.toThrow()
  })

  it('should not be able to edit a category if the name is empty', async () => {
    const { category } = makeCategory()
    await categoriesRepository.create(category)
    await expect(
      sut.execute({ categoryId: category.id, name: '' }),
    ).rejects.toThrow(DataError)
  })
})
