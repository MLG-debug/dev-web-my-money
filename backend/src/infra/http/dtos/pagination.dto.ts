import { Type } from 'class-transformer'
import { IsInt, IsOptional } from 'class-validator'

export class PaginationQuery {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  page: number
}
