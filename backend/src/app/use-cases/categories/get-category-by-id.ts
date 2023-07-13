import { Injectable } from '@nestjs/common'
import { Category } from '@app/entities/category'
import { ResourceNotFound } from '../@errors/resource-not-found-error'
import { CategoriesRepository } from '@app/repositories/categories-repository'

interface GetCategoryByIdUseCaseRequest {
  categoryId: string
}
interface GetCategoryByIdUseCaseResponse {
  category: Category
}

@Injectable()
export class GetCategoryByIdUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    categoryId,
  }: GetCategoryByIdUseCaseRequest): Promise<GetCategoryByIdUseCaseResponse> {
    const category = await this.categoriesRepository.findById(categoryId)
    if (!category) throw new ResourceNotFound('Categoria não encontrada.')
    return { category }
  }
}
