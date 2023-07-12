import { IsNotEmpty } from 'class-validator'

export class EditCategoryBody {
  @IsNotEmpty()
  name: string
}
