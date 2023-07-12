import { InMemoryCategoriesRepository } from '@infra/database/in-memory-database/repositories/in-memory-categories-repository'
import { ArchiveCategoryUseCase } from './archive-category'
import { makeCategory } from '@test/factories/category-factory'
import { ResourceNotFound } from '../@errors/resource-not-found-error'

let categoriesRepository: InMemoryCategoriesRepository

let sut: ArchiveCategoryUseCase

describe('Archive Category Use Case', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new ArchiveCategoryUseCase(categoriesRepository)
  })

  it('should be able to archive a category', async () => {
    const { category } = makeCategory()
    await categoriesRepository.create(category)
    await sut.execute({ categoryId: category.id })

    const archivedCategory = await categoriesRepository.findById(category.id)

    expect(categoriesRepository.categories).toHaveLength(1)
    expect(archivedCategory.archived).toEqual(true)
  })

  it('should no be able to archive a category if it does not exist', async () => {
    await expect(sut.execute({ categoryId: 'invalid-id' })).rejects.toThrow(
      ResourceNotFound,
    )
  })
})
