import { Transaction } from '@app/entities/transaction'
import { TransactionsRepository } from '@app/repositories/transactions-repository'
import { Injectable } from '@nestjs/common'

interface GetTransactionsByQueryUseCaseRequest {
  query: string
  page: number
}

interface GetTransactionsByQueryUseCaseResponse {
  transactions: Transaction[]
}

@Injectable()
export class GetTransactionsByQueryUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    query,
    page,
  }: GetTransactionsByQueryUseCaseRequest): Promise<GetTransactionsByQueryUseCaseResponse> {
    const transactions = await this.transactionsRepository.search({
      page,
      query,
    })

    return { transactions }
  }
}
