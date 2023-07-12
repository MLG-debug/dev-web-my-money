import { Transaction } from '@app/entities/transaction'
import { TransactionsRepository } from '@app/repositories/transactions-repository'
import { Injectable } from '@nestjs/common'

interface GetAllOutcomeTransactionsByYearUseCaseRequest {
  year: number
  page: number
}

interface GetAllOutcomeTransactionsByYearUseCaseResponse {
  transactions: Transaction[]
}

@Injectable()
export class GetAllOutcomeTransactionsByYearUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    year,
    page,
  }: GetAllOutcomeTransactionsByYearUseCaseRequest): Promise<GetAllOutcomeTransactionsByYearUseCaseResponse> {
    const transactions = await this.transactionsRepository.findByYear({
      page,
      year,
    })

    return { transactions }
  }
}
