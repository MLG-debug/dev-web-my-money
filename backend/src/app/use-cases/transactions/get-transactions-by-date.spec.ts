import { InMemoryTransactionsRepository } from '@infra/database/in-memory-database/repositories/in-memory-transactions-repository'
import { makeTransaction } from '@test/factories/transaction-factory'
import { GetTransactionsByDateUseCase } from './get-transactions-by-date'

let transactionsRepository: InMemoryTransactionsRepository

let sut: GetTransactionsByDateUseCase

describe('Get Transactions By Date Use Case', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new GetTransactionsByDateUseCase(transactionsRepository)
  })

  it('should be able to get transactionS by date', async () => {
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
      endDate: '2022-03-09',
      startDate: '2022-03-01',
    })

    expect(transactions).toBeTruthy()
    expect(transactions).toHaveLength(5)
    expect(transactions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          description: 'Transaction 1',
        }),
      ]),
    )
  })
})
