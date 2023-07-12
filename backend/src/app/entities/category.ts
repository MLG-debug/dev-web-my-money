import { randomUUID } from 'crypto'
import { Replace } from 'src/helpers/Replace'

export interface ICategoryProperties {
  name: string
  archived?: boolean

  createdAt: Date
  updatedAt?: Date
}

export class Category {
  private _id: string
  private props: ICategoryProperties
  // private configService: ConfigService;

  constructor(
    props: Replace<ICategoryProperties, { createdAt?: Date }>,
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

  public get name(): string {
    return this.props.name
  }

  public set name(value: string) {
    this.props.name = value
  }

  public get archived(): boolean {
    return this.props.archived
  }

  public set archived(value: boolean) {
    this.props.archived = value
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
