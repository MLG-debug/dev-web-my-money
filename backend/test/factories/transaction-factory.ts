import { ITransactionProperties, Transaction } from '@app/entities/transaction'

type Override = Partial<ITransactionProperties>

export const makeTransaction = (override: Override = {}) => {
  const transaction = new Transaction({
    description: 'Transaction description',
    price: 100.0,
    date: new Date(),
    categoryId: 'categoryId',
    type: 'INCOME',

    ...override,
  })

  return { transaction }
}
