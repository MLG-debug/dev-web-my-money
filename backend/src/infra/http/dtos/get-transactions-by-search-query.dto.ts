import { IsNotEmpty } from 'class-validator'

export class GetTransactionsBySearchQuery {
  @IsNotEmpty()
  query: string
}
