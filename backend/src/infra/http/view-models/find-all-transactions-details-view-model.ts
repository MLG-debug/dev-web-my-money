import { Transaction } from '@app/entities/Transaction'

export class FindAllTransactionsDetailsViewModel {
  static toHTTP(transaction: Transaction) {
    return {
      price: transaction.price,
      type: transaction.type,
    }
  }
}
