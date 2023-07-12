import { Injectable } from '@nestjs/common'
import { Category } from '@app/entities/category'
import { CategoriesRepository } from '@app/repositories/categories-repository'

interface FindAllCategoriesUseCaseResponse {
  categories: Category[]
}

@Injectable()
export class FindAllCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(): Promise<FindAllCategoriesUseCaseResponse> {
    const categories = await this.categoriesRepository.findAll()
    return { categories }
  }
}
