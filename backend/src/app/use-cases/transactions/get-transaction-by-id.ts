import { Transaction } from '@app/entities/transaction'
import { ResourceNotFound } from '../@errors/resource-not-found-error'
import { TransactionsRepository } from '@app/repositories/transactions-repository'
import { Injectable } from '@nestjs/common'

interface GetTransactionByIdUseCaseRequest {
  transactionId: string
}

interface GetTransactionByIdUseCaseResponse {
  transaction: Transaction
}

@Injectable()
export class GetTransactionByIdUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    transactionId,
  }: GetTransactionByIdUseCaseRequest): Promise<GetTransactionByIdUseCaseResponse> {
    const transaction = await this.transactionsRepository.findById(
      transactionId,
    )
    if (!transaction) throw new ResourceNotFound('Transação não encontrada.')
    return { transaction }
  }
}
