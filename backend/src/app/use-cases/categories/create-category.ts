import { Injectable } from '@nestjs/common'
import { ConflictError } from '../@errors/conflict-error'
import { Category } from '@app/entities/category'
import { CategoriesRepository } from '@app/repositories/categories-repository'

interface CreateCategoryUseCaseRequest {
  name: string
}

interface CreateCategoryUseCaseResponse {
  category: Category
}

@Injectable()
export class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}
  async execute({
    name,
  }: CreateCategoryUseCaseRequest): Promise<CreateCategoryUseCaseResponse> {
    const formattedName = name.replace(/\s+/g, ' ').trim()
    const category = await this.categoriesRepository.findByName(formattedName)
    if (category) throw new ConflictError('Nome de categoria em uso.')
    const newCategory = new Category({ name: formattedName })
    await this.categoriesRepository.create(newCategory)
    return { category: newCategory }
  }
}
