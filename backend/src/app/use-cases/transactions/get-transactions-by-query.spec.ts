import { InMemoryTransactionsRepository } from '@infra/database/in-memory-database/repositories/in-memory-transactions-repository'
import { makeTransaction } from '@test/factories/transaction-factory'
import { GetTransactionsByQueryUseCase } from './get-transactions-by-query'

let transactionsRepository: InMemoryTransactionsRepository

let sut: GetTransactionsByQueryUseCase

describe('Get Transactions By Query Use Case', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new GetTransactionsByQueryUseCase(transactionsRepository)
  })

  it('should be able to get transactions by query name', async () => {
    for (let i = 0; i < 10; i++) {
      const date = `2022-0${i % 2 === 0 ? 2 : 3}-0${i}`
      const { transaction } = makeTransaction({
        description: `Transaction ${i}`,
        date: new Date(date),
        categoryId: 'category.id',
      })
      transactionsRepository.transactions.push(transaction)
    }

    const { transactions } = await sut.execute({
      page: 1,
      query: 'Transaction 1',
    })

    expect(transactions).toBeTruthy()
    expect(transactions).toHaveLength(1)
    expect(transactions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          description: 'Transaction 1',
        }),
      ]),
    )
  })
})
