import { Transaction } from '@app/entities/transaction'
import { TransactionsRepository } from '@app/repositories/transactions-repository'
import { Injectable } from '@nestjs/common'

interface GetAllTransactionsUseCaseRequest {
  page: number
}

interface GetAllTransactionsUseCaseResponse {
  transactions: Transaction[]
  totalPages: number
}

@Injectable()
export class GetAllTransactionsUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    page,
  }: GetAllTransactionsUseCaseRequest): Promise<GetAllTransactionsUseCaseResponse> {
    const { transactions, totalPages } =
      await this.transactionsRepository.findAll({ page })
    return { transactions, totalPages }
  }
}
