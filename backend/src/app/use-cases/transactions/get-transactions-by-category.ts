import { Transaction } from '@app/entities/transaction'
import { CategoriesRepository } from '@app/repositories/categories-repository'
import { TransactionsRepository } from '@app/repositories/transactions-repository'
import { ResourceNotFound } from '../@errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'

interface GetTransactionsByCategoryUseCaseRequest {
  categoryId: string
  page: number
}

interface GetTransactionsByCategoryUseCaseResponse {
  transactions: Transaction[]
}

@Injectable()
export class GetTransactionsByCategoryUseCase {
  constructor(
    private transactionsRepository: TransactionsRepository,
    private categoriesRepository: CategoriesRepository,
  ) {}

  async execute({
    categoryId,
    page,
  }: GetTransactionsByCategoryUseCaseRequest): Promise<GetTransactionsByCategoryUseCaseResponse> {
    const category = await this.categoriesRepository.findById(categoryId)
    if (!category) throw new ResourceNotFound('Categoria não encontrada.')

    const transactions = await this.transactionsRepository.findByCategory({
      categoryId,
      page,
    })

    return { transactions }
  }
}
