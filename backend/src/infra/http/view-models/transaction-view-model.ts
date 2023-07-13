import { Transaction } from '@app/entities/Transaction'

export class TransactionViewModel {
  static toHTTP(transaction: Transaction) {
    return {
      id: transaction.id,
      description: transaction.description,
      price: transaction.price,
      type: transaction.type,
      date: transaction.date,
      // categoryId: transaction.categoryId,
      category: transaction.category ? transaction.category : undefined,

      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    }
  }
}
