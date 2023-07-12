import { InMemoryTransactionsRepository } from '@infra/database/in-memory-database/repositories/in-memory-transactions-repository'
import { ResourceNotFound } from '../@errors/resource-not-found-error'
import { DeleteTransactionUseCase } from './delete-transaction'
import { makeTransaction } from '@test/factories/transaction-factory'

let transactionsRepository: InMemoryTransactionsRepository

let sut: DeleteTransactionUseCase

describe('Delete Transaction Use Case', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new DeleteTransactionUseCase(transactionsRepository)
  })

  it('should be able to delete a transaction', async () => {
    const { transaction } = makeTransaction()
    transactionsRepository.transactions.push(transaction)

    await sut.execute({ transactionId: transaction.id })

    expect(transactionsRepository.transactions).toHaveLength(0)
  })

  it('should not be able to delete a transaction if it does not exist', async () => {
    await expect(sut.execute({ transactionId: 'invalid-id' })).rejects.toThrow(
      ResourceNotFound,
    )
  })
})
