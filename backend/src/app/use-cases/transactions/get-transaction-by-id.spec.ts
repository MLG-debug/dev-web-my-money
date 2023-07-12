import { InMemoryTransactionsRepository } from '@infra/database/in-memory-database/repositories/in-memory-transactions-repository'
import { makeTransaction } from '@test/factories/transaction-factory'
import { GetTransactionByIdUseCase } from './get-transaction-by-id'
import { ResourceNotFound } from '../@errors/resource-not-found-error'

let transactionsRepository: InMemoryTransactionsRepository

let sut: GetTransactionByIdUseCase

describe('Get Transaction By Id Use Case', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new GetTransactionByIdUseCase(transactionsRepository)
  })

  it('should be able to get transaction by id', async () => {
    const { transaction: transactionCreated } = makeTransaction({
      description: 'transaction description',
    })
    transactionsRepository.transactions.push(transactionCreated)

    const { transaction } = await sut.execute({
      transactionId: transactionCreated.id,
    })

    expect(transaction).toBeTruthy()
    expect(transaction.description).toEqual('transaction description')
    expect(transactionsRepository.transactions).toHaveLength(1)
  })

  it('should not be able to get transaction by id if it does not exists', async () => {
    await expect(sut.execute({ transactionId: 'invalid-id' })).rejects.toThrow(
      ResourceNotFound,
    )
  })
})
