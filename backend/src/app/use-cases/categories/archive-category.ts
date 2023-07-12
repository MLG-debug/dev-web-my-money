import { Injectable } from '@nestjs/common'
import { CategoriesRepository } from '@app/repositories/categories-repository'
import { ResourceNotFound } from '../@errors/resource-not-found-error'

interface ArchiveCategoryUseCaseRequest {
  categoryId: string
}

@Injectable()
export class ArchiveCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({ categoryId }: ArchiveCategoryUseCaseRequest) {
    const category = await this.categoriesRepository.findById(categoryId)
    if (!category) throw new ResourceNotFound('Categoria não encontrada.')

    await this.categoriesRepository.archive(categoryId)
  }
}
