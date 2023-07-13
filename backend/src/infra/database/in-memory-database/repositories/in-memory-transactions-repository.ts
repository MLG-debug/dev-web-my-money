import { Transaction } from '@app/entities/transaction'
import {
  Paginate,
  FindByDateProps,
  FindByCategoryProps,
  SearchProps,
  TransactionsRepository,
  FindMonthlyOutcomeSumsByYearResponse,
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

    if (page) {
      return this.transactions.slice(startIndex, endIndex)
    } else {
      return this.transactions
    }
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

  async findMonthlyOutcomeSumsByYear(
    year: number,
  ): Promise<FindMonthlyOutcomeSumsByYearResponse> {
    const filteredTransactions = this.transactions.filter((transaction) => {
      const transactionDate = transaction.date
      return transactionDate.getFullYear() === year
    })

    const monthlyOutcomeSums = filteredTransactions.reduce(
      (acc, transaction) => {
        const transactionMonth = transaction.date.getMonth()
        const transactionOutcome = transaction.price
        acc[transactionMonth] += transactionOutcome
        return acc
      },
      Array(12).fill(0),
    )

    return {
      months: monthlyOutcomeSums,
    }
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
