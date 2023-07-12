import { Transaction } from '@app/entities/transaction'
import { TransactionsRepository } from '@app/repositories/transactions-repository'
import { Injectable } from '@nestjs/common'

interface GetAllTransactionsUseCaseRequest {
  page: number
}

interface GetAllTransactionsUseCaseResponse {
  transactions: Transaction[]
}

@Injectable()
export class GetAllTransactionsUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    page,
  }: GetAllTransactionsUseCaseRequest): Promise<GetAllTransactionsUseCaseResponse> {
    const transactions = await this.transactionsRepository.findAll({ page })
    return { transactions }
  }
}
