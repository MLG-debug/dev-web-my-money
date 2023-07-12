import { Transaction } from '@app/entities/transaction'
import { TransactionsRepository } from '@app/repositories/transactions-repository'
import { Injectable } from '@nestjs/common'

interface GetTransactionsByDateUseCaseRequest {
  startDate: string
  endDate: string
  page: number
}

interface GetTransactionsByDateUseCaseResponse {
  transactions: Transaction[]
}

@Injectable()
export class GetTransactionsByDateUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    startDate,
    endDate,
    page,
  }: GetTransactionsByDateUseCaseRequest): Promise<GetTransactionsByDateUseCaseResponse> {
    const transactions = await this.transactionsRepository.findByDate({
      endDate: new Date(endDate),
      startDate: new Date(startDate),
      page,
    })

    return { transactions }
  }
}
