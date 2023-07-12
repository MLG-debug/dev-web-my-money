import { Injectable } from '@nestjs/common'
import { ResourceNotFound } from '../@errors/resource-not-found-error'
import { ConflictError } from '../@errors/conflict-error'
import { DataError } from '../@errors/data-error'
import { CategoriesRepository } from '@app/repositories/categories-repository'

interface EditCategoryUseCaseRequest {
  categoryId: string
  name: string
}

@Injectable()
export class EditCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({ categoryId, name }: EditCategoryUseCaseRequest) {
    if (!name) throw new DataError('O nome da categoria não pode ser vazio.')

    const category = await this.categoriesRepository.findById(categoryId)
    if (!category) throw new ResourceNotFound('Categoria não encontrada.')

    const formattedName = name.replace(/\s+/g, ' ').trim()
    const categoryAlreadyExits = await this.categoriesRepository.findByName(
      formattedName,
    )
    if (categoryAlreadyExits)
      throw new ConflictError('Nome de categoria em uso.')

    category.name = formattedName
    await this.categoriesRepository.save(category)
  }
}
