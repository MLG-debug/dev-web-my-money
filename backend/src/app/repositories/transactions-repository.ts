import { Transaction } from '../entities/Transaction'

export interface Paginate {
  page: number
}

export interface SearchProps extends Paginate {
  query: string
}

export interface FindByDateProps extends Paginate {
  startDate: Date
  endDate: Date
}

export interface FindByCategoryProps extends Paginate {
  categoryId: string
}

export interface FindMonthlyOutcomeSumsByYearResponse {
  months: number[]
}

export abstract class TransactionsRepository {
  abstract create(transaction: Transaction): Promise<Transaction>
  abstract findById(transactionId: string): Promise<Transaction | null>
  abstract findAll(props?: Paginate): Promise<Transaction[] | null>
  abstract findByDate(props: FindByDateProps): Promise<Transaction[] | null>
  abstract findMonthlyOutcomeSumsByYear(
    year: number,
  ): Promise<FindMonthlyOutcomeSumsByYearResponse>

  abstract findByCategory(
    props: FindByCategoryProps,
  ): Promise<Transaction[] | null>

  abstract search(props: SearchProps): Promise<Transaction[] | null>

  abstract delete(transactionId: string): Promise<void>
  abstract save(transaction: Transaction): Promise<void>
}
