import { IsDateString, IsEnum, IsNotEmpty, IsUUID } from 'class-validator'

enum TransactionTypes {
  OUTCOME = 'OUTCOME',
  INCOME = 'INCOME',
}

export class EditTransactionBody {
  @IsNotEmpty()
  description: string

  @IsNotEmpty()
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
