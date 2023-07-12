import { InMemoryTransactionsRepository } from '@infra/database/in-memory-database/repositories/in-memory-transactions-repository'
import { EditTransactionUseCase } from './edit-transaction'
import { makeTransaction } from '@test/factories/transaction-factory'
import { InMemoryCategoriesRepository } from '@infra/database/in-memory-database/repositories/in-memory-categories-repository'
import { makeCategory } from '@test/factories/category-factory'
import { ResourceNotFound } from '../@errors/resource-not-found-error'

let categoriesRepository: InMemoryCategoriesRepository
let transactionsRepository: InMemoryTransactionsRepository

let sut: EditTransactionUseCase

describe('Edit Transaction Use Case', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new EditTransactionUseCase(
      transactionsRepository,
      categoriesRepository,
    )
  })

  it('should be able to edit a transaction', async () => {
    const { category: categoryCreated } = makeCategory()
    await categoriesRepository.create(categoryCreated)
    const { transaction: transactionCreated } = makeTransaction({
      categoryId: categoryCreated.id,
    })
    transactionsRepository.transactions.push(transactionCreated)

    await sut.execute({
      transactionId: transactionCreated.id,
      categoryId: categoryCreated.id,
      description: 'Transaction description',
      date: '2023-05-04',
      type: 'INCOME',
      price: 10,
    })

    const transaction = await transactionsRepository.findById(
      transactionCreated.id,
    )

    expect(transaction).toBeTruthy()
    expect(transaction.description).toEqual('Transaction description')
    expect(transactionsRepository.transactions).toHaveLength(1)
  })

  it('should not be able to edit a transaction if the category does not exist', async () => {
    const { transaction } = makeTransaction()

    await expect(
      sut.execute({
        transactionId: transaction.id,
        categoryId: 'invalid-id',
        description: 'Transaction description',
        date: '2023-05-04',
        type: 'INCOME',
        price: 10,
      }),
    ).rejects.toThrowError(ResourceNotFound)
  })

  it('should not be able to edit a transaction if it does not exist', async () => {
    const { category: categoryCreated } = makeCategory()
    await categoriesRepository.create(categoryCreated)

    await expect(
      sut.execute({
        transactionId: 'invalid-id',
        categoryId: categoryCreated.id,
        description: 'Transaction description',
        date: '2023-05-04',
        type: 'INCOME',
        price: 10,
      }),
    ).rejects.toThrowError(ResourceNotFound)
  })
})
