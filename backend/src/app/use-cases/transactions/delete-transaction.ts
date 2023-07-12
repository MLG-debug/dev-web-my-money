import { Injectable } from '@nestjs/common'
import { ResourceNotFound } from '../@errors/resource-not-found-error'
import { TransactionsRepository } from '@app/repositories/transactions-repository'

interface DeleteTransactionUseCaseRequest {
  transactionId: string
}

@Injectable()
export class DeleteTransactionUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({ transactionId }: DeleteTransactionUseCaseRequest) {
    const transaction = await this.transactionsRepository.findById(
      transactionId,
    )
    if (!transaction) throw new ResourceNotFound('Transação não encontrada.')

    await this.transactionsRepository.delete(transaction.id)
  }
}
