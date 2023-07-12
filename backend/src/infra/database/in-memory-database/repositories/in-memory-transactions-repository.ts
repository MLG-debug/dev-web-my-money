import { Transaction } from '@app/entities/transaction'
import {
  Paginate,
  FindByDateProps,
  FindByYearProps,
  FindByCategoryProps,
  SearchProps,
  TransactionsRepository,
} from '@app/repositories/transactions-repository'

const PAGE_SIZE = 10

export class InMemoryTransactionsRepository implements TransactionsRepository {
  public transactions: Transaction[] = []

  async create(transaction: Transaction) {
    this.transactions.push(transaction)
    return transaction
  }

  async findById(transactionId: string) {
    const transaction = this.transactions.find((t) => t.id === transactionId)
    return transaction ?? null
  }

  async findAll({ page }: Paginate) {
    const startIndex = (page - 1) * PAGE_SIZE
    const endIndex = startIndex + PAGE_SIZE
    return this.transactions.slice(startIndex, endIndex)
  }

  async findByDate({ startDate, endDate, page }: FindByDateProps) {
    const filteredTransactions = this.transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date)
      return transactionDate >= startDate && transactionDate <= endDate
    })

    const startIndex = (page - 1) * PAGE_SIZE
    const endIndex = page * PAGE_SIZE
    const paginatedTransactions = filteredTransactions.slice(
      startIndex,
      endIndex,
    )

    return paginatedTransactions
  }

  async findByYear(props: FindByYearProps): Promise<Transaction[]> {
    const filteredTransactions = this.transactions.filter((transaction) => {
      const transactionDate = transaction.date
      return transactionDate.getFullYear() === props.year
    })

    return filteredTransactions
  }

  async findByCategory({ categoryId, page }: FindByCategoryProps) {
    const filteredTransactions = this.transactions.filter(
      (transaction) => transaction.categoryId === categoryId,
    )

    const startIndex = (page - 1) * PAGE_SIZE
    const endIndex = page * PAGE_SIZE
    const paginatedTransactions = filteredTransactions.slice(
      startIndex,
      endIndex,
    )

    return paginatedTransactions
  }

  async search({ page, query }: SearchProps) {
    const filteredTransactions = this.transactions.filter((transaction) => {
      const transactionDescription = transaction.description.toLowerCase()
      const queryLowerCase = query.toLowerCase()
      return transactionDescription.includes(queryLowerCase)
    })

    const startIndex = (page - 1) * PAGE_SIZE
    const endIndex = page * PAGE_SIZE
    const paginatedTransactions = filteredTransactions.slice(
      startIndex,
      endIndex,
    )

    return paginatedTransactions
  }

  async delete(transactionId: string) {
    const transactionIndex = this.transactions.findIndex(
      (t) => t.id === transactionId,
    )
    if (transactionIndex >= 0) {
      this.transactions.splice(transactionIndex, 1)
    }
  }

  async save(transaction: Transaction) {
    const transactionIndex = this.transactions.findIndex(
      (t) => t.id === transaction.id,
    )
    if (transactionIndex >= 0) {
      this.transactions[transactionIndex] = transaction
    }
  }
}
