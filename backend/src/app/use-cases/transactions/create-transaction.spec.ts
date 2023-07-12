import { InMemoryCategoriesRepository } from '@infra/database/in-memory-database/repositories/in-memory-categories-repository'
import { InMemoryTransactionsRepository } from '@infra/database/in-memory-database/repositories/in-memory-transactions-repository'
import { CreateTransactionUseCase } from './create-transaction'
import { makeCategory } from '@test/factories/category-factory'
import { ResourceNotFound } from '../@errors/resource-not-found-error'

let categoriesRepository: InMemoryCategoriesRepository
let transactionsRepository: InMemoryTransactionsRepository

let sut: CreateTransactionUseCase

describe('Create Transaction Use Case', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new CreateTransactionUseCase(
      categoriesRepository,
      transactionsRepository,
    )
  })

  it('should be able to create a new transaction', async () => {
    const { category } = makeCategory()
    await categoriesRepository.create(category)

    const { transaction } = await sut.execute({
      categoryId: category.id,
      description: 'transaction description',
      price: 1200,
      date: '2023-05-04',
      type: 'INCOME',
    })

    expect(transaction).toBeTruthy()
    expect(transaction.description).toEqual('transaction description')
    expect(transactionsRepository.transactions).toHaveLength(1)
  })

  it('should not be able to create a new transaction if the category does not exist', async () => {
    await expect(
      sut.execute({
        categoryId: 'invalid-id',
        description: 'transaction description',
        price: 1200,
        date: '2023-05-04',
        type: 'INCOME',
      }),
    ).rejects.toThrow(ResourceNotFound)
  })
})
