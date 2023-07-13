import { Injectable } from '@nestjs/common'

import { ResourceNotFound } from '../@errors/resource-not-found-error'
import { TransactionTypes, Transaction } from '@app/entities/transaction'
import { CategoriesRepository } from '@app/repositories/categories-repository'
import { TransactionsRepository } from '@app/repositories/transactions-repository'

interface CreateTransactionUseCaseRequest {
  description: string
  price: number
  type: TransactionTypes
  categoryId: string
  date: string
}

interface CreateTransactionUseCaseResponse {
  transaction: Transaction
}

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    private categoriesRepository: CategoriesRepository,
    private transactionsRepository: TransactionsRepository,
  ) {}

  async execute({
    categoryId,
    date,
    description,
    price,
    type,
  }: CreateTransactionUseCaseRequest): Promise<CreateTransactionUseCaseResponse> {
    const categoryFound = await this.categoriesRepository.findById(categoryId)
    if (!categoryFound) throw new ResourceNotFound('Categoria não encontrada.')

    const newTransaction = new Transaction({
      categoryId,
      date: new Date(date),
      description,
      price,
      type,
    })

    const transaction = await this.transactionsRepository.create(newTransaction)
    return { transaction }
  }
}
