import { IsDateString, IsNotEmpty } from 'class-validator'

export class GetTransactionsByDateQuery {
  @IsDateString()
  @IsNotEmpty()
  startDate: string

  @IsDateString()
  @IsNotEmpty()
  endDate: string
}
