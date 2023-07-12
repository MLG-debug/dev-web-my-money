import { InMemoryTransactionsRepository } from '@infra/database/in-memory-database/repositories/in-memory-transactions-repository'
import { makeTransaction } from '@test/factories/transaction-factory'
import { GetAllTransactionsUseCase } from './get-all-transactions'

let transactionsRepository: InMemoryTransactionsRepository

let sut: GetAllTransactionsUseCase

describe('Get All TransactionsUse Case', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new GetAllTransactionsUseCase(transactionsRepository)
  })

  it('should be able to get all transactions', async () => {
    for (let i = 0; i < 23; i++) {
      const { transaction } = makeTransaction({
        description: `Transaction ${i}`,
        date: new Date('2022-03-01'),
      })
      transactionsRepository.transactions.push(transaction)
    }

    const { transactions } = await sut.execute({ page: 1 })

    expect(transactions).toBeTruthy()
    expect(transactions).toHaveLength(10)
  })

  it('should not be able to get all transactions if it is not available', async () => {
    const { transactions } = await sut.execute({ page: 1 })
    expect(transactions).toHaveLength(0)
  })
})
