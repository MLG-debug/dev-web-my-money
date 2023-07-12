import { Injectable } from '@nestjs/common'
import { Category } from '@app/entities/category'
import { ResourceNotFound } from '../@errors/resource-not-found-error'
import { CategoriesRepository } from '@app/repositories/categories-repository'

interface FindCategoryByIdUseCaseRequest {
  categoryId: string
}
interface FindCategoryByIdUseCaseResponse {
  category: Category
}

@Injectable()
export class FindCategoryByIdUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    categoryId,
  }: FindCategoryByIdUseCaseRequest): Promise<FindCategoryByIdUseCaseResponse> {
    const category = await this.categoriesRepository.findById(categoryId)
    if (!category) throw new ResourceNotFound('Categoria não encontrada.')
    return { category }
  }
}
