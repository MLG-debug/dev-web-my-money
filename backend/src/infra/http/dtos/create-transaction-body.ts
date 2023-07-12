import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsUUID,
} from 'class-validator'

enum TransactionTypes {
  OUTCOME = 'OUTCOME',
  INCOME = 'INCOME',
}

export class CreateTransactionBody {
  @IsNotEmpty()
  description: string

  @IsNotEmpty()
  @IsNumber()
  price: number

  @IsEnum(TransactionTypes)
  @IsNotEmpty()
  type: TransactionTypes

  @IsNotEmpty()
  @IsUUID()
  categoryId: string

  @IsNotEmpty()
  @IsDateString()
  date: string
}
