import { Transaction } from '@app/entities/Transaction'
import { TransactionsRepository } from '@app/repositories/transactions-repository'
import { Injectable } from '@nestjs/common'

interface GetAllTransactionsDetailsUseCaseResponse {
  transactions: Transaction[]
  totalPages: number
}

@Injectable()
export class GetAllTransactionsDetailsUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute(): Promise<GetAllTransactionsDetailsUseCaseResponse> {
    const { totalPages, transactions } =
      await this.transactionsRepository.findAll()
    return {
      transactions,
      totalPages,
    }
  }
}
