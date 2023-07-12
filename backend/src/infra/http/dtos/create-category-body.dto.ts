import { IsNotEmpty } from 'class-validator'

export class CreateCategoryBody {
  @IsNotEmpty()
  name: string
}
