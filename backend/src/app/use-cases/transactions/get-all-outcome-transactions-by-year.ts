import { TransactionsRepository } from '@app/repositories/transactions-repository'
import { Injectable } from '@nestjs/common'

interface GetMonthlyOutcomeSumsByYearUseCaseRequest {
  year: number
}

interface GetMonthlyOutcomeSumsByYearUseCaseResponse {
  months: number[]
}

@Injectable()
export class GetMonthlyOutcomeSumsByYearUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    year,
  }: GetMonthlyOutcomeSumsByYearUseCaseRequest): Promise<GetMonthlyOutcomeSumsByYearUseCaseResponse> {
    const { months } =
      await this.transactionsRepository.findMonthlyOutcomeSumsByYear(year)

    return { months }
  }
}
