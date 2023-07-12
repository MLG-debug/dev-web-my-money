import { InMemoryTransactionsRepository } from '@infra/database/in-memory-database/repositories/in-memory-transactions-repository'
import { makeTransaction } from '@test/factories/transaction-factory'
import { ResourceNotFound } from '../@errors/resource-not-found-error'
import { GetTransactionsByCategoryUseCase } from './get-transactions-by-category'
import { InMemoryCategoriesRepository } from '@infra/database/in-memory-database/repositories/in-memory-categories-repository'
import { makeCategory } from '@test/factories/category-factory'

let transactionsRepository: InMemoryTransactionsRepository
let categoriesRepository: InMemoryCategoriesRepository

let sut: GetTransactionsByCategoryUseCase

describe('Get Transactions By Category Use Case', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new GetTransactionsByCategoryUseCase(
      transactionsRepository,
      categoriesRepository,
    )
  })

  it('should be able to get transactionS by category', async () => {
    const { category } = makeCategory()
    categoriesRepository.categories.push(category)
    for (let i = 0; i < 23; i++) {
      const { transaction } = makeTransaction({
        description: `Transaction ${i}`,
        date: new Date('2022-03-01'),
        categoryId: category.id,
      })
      transactionsRepository.transactions.push(transaction)
    }

    const { transactions } = await sut.execute({
      page: 1,
      categoryId: category.id,
    })

    expect(transactions).toBeTruthy()
    expect(transactions).toHaveLength(10)
    expect(transactions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          description: 'Transaction 0',
        }),
      ]),
    )
  })

  it('should not be able to get transactions by category if category does not exists', async () => {
    await expect(
      sut.execute({
        page: 1,
        categoryId: 'invalid-category-id',
      }),
    ).rejects.toThrow(ResourceNotFound)
  })
})
