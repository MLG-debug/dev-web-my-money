import { IsNotEmpty, IsNumberString } from 'class-validator'

export class GetTransactionsByYearQuery {
  @IsNumberString()
  @IsNotEmpty()
  year: number
}
