import { InMemoryTransactionsRepository } from '@infra/database/in-memory-database/repositories/in-memory-transactions-repository'
import { makeTransaction } from '@test/factories/transaction-factory'
import { GetAllOutcomeTransactionsByYearUseCase } from './get-all-outcome-transactions-by-year'

let transactionsRepository: InMemoryTransactionsRepository

let sut: GetAllOutcomeTransactionsByYearUseCase

describe('Get All Outcome Transactions By Year Use Case', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new GetAllOutcomeTransactionsByYearUseCase(transactionsRepository)
  })

  it('should be able to get all outcome transactions by year', async () => {
    for (let i = 0; i < 10; i++) {
      const { transaction } = makeTransaction({
        description: `Transaction ${i}`,
        date: new Date('2022-03-01'),
      })
      transactionsRepository.transactions.push(transaction)
    }

    const { transactions } = await sut.execute({ page: 1, year: 2022 })

    expect(transactions).toBeTruthy()
    expect(transactions).toHaveLength(10)
  })

  it('should not be able to get all transactions by year if it is not available', async () => {
    const { transactions } = await sut.execute({ page: 1, year: 2022 })
    expect(transactions).toHaveLength(0)
  })
})
