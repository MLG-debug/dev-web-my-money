import { TransactionTypes } from '@app/entities/transaction'
import { ResourceNotFound } from '../@errors/resource-not-found-error'
import { TransactionsRepository } from '@app/repositories/transactions-repository'
import { CategoriesRepository } from '@app/repositories/categories-repository'
import { Injectable } from '@nestjs/common'

interface EditTransactionUseCaseRequest {
  transactionId: string
  description: string
  date: string
  price: number
  categoryId: string
  type: TransactionTypes
}

@Injectable()
export class EditTransactionUseCase {
  constructor(
    private transactionsRepository: TransactionsRepository,
    private categoriesRepository: CategoriesRepository,
  ) {}

  async execute({
    categoryId,
    date,
    description,
    price,
    transactionId,
    type,
  }: EditTransactionUseCaseRequest) {
    const category = await this.categoriesRepository.findById(categoryId)
    if (!category) throw new ResourceNotFound('Categoria não encontrada.')

    const transaction = await this.transactionsRepository.findById(
      transactionId,
    )
    if (!transaction) throw new ResourceNotFound('Transação não encontrada.')

    transaction.description = description
    transaction.date = new Date(date)
    transaction.price = price
    transaction.categoryId = categoryId
    transaction.type = type

    await this.transactionsRepository.save(transaction)
  }
}
