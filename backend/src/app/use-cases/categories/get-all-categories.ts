import { Injectable } from '@nestjs/common'
import { Category } from '@app/entities/category'
import { CategoriesRepository } from '@app/repositories/categories-repository'

interface GetAllCategoriesUseCaseResponse {
  categories: Category[]
}

@Injectable()
export class GetAllCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(): Promise<GetAllCategoriesUseCaseResponse> {
    const categories = await this.categoriesRepository.findAll()
    return { categories }
  }
}
