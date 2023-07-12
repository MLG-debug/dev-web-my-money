import { randomUUID } from 'crypto'
import { Replace } from 'src/helpers/Replace'

export type TransactionTypes = 'OUTCOME' | 'INCOME'

export interface ITransactionProperties {
  price: number
  description: string
  type: TransactionTypes
  date: Date
  categoryId: string

  createdAt: Date
  updatedAt?: Date
}

export class Transaction {
  private _id: string
  private props: ITransactionProperties
  // private configService: ConfigService;

  constructor(
    props: Replace<ITransactionProperties, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }
  }

  public get id(): string {
    return this._id
  }

  public get price(): number {
    return this.props.price
  }

  public set price(value: number) {
    this.props.price = value
  }

  public get description(): string {
    return this.props.description
  }

  public set description(value: string) {
    this.props.description = value
  }

  public get type(): TransactionTypes {
    return this.props.type
  }

  public set type(value: TransactionTypes) {
    this.props.type = value
  }

  public get date(): Date {
    return this.props.date
  }

  public set date(value: Date) {
    this.props.date = value
  }

  public get categoryId(): string {
    return this.props.categoryId
  }

  public set categoryId(value: string) {
    this.props.categoryId = value
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }

  public set createdAt(value: Date) {
    this.props.createdAt = value
  }

  public get updatedAt(): Date {
    return this.props.updatedAt
  }

  public set updatedAt(value: Date) {
    this.props.updatedAt = value
  }
}
