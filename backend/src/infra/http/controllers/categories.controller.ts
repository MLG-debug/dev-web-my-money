import { Body, Controller, Post, Patch, Put, Param, Get } from '@nestjs/common'
import { FindAllCategoriesUseCase } from './../../../app/use-cases/categories/find-all-categories'
import { FindCategoryByIdUseCase } from './../../../app/use-cases/categories/find-category-by-id'
import { ArchiveCategoryUseCase } from './../../../app/use-cases/categories/archive-category'
import { CreateCategoryBody } from '../dtos/create-category-body.dto'
import { EditCategoryBody } from '../dtos/edit-category-body.dto'
import { EditCategoryUseCase } from '@app/use-cases/categories/edit-category'
import { CreateCategoryUseCase } from './../../../app/use-cases/categories/create-category'

@Controller('/categories')
export class CategoriesController {
  constructor(
    private createCategory: CreateCategoryUseCase,
    private editCategory: EditCategoryUseCase,
    private archiveCategory: ArchiveCategoryUseCase,
    private findCategoryById: FindCategoryByIdUseCase,
    private findAllCategories: FindAllCategoriesUseCase,
  ) {}

  @Post('/')
  async create(@Body() body: CreateCategoryBody) {
    const { name } = body
    const { category } = await this.createCategory.execute({ name })
    return {
      category,
    }
  }

  @Put('/:categoryId')
  async update(
    @Body() body: EditCategoryBody,
    @Param('categoryId') categoryId: string,
  ) {
    const { name } = body
    await this.editCategory.execute({
      name,
      categoryId,
    })
  }

  @Patch('/archive/:categoryId')
  async archive(@Param('categoryId') categoryId: string) {
    await this.archiveCategory.execute({ categoryId })
  }

  @Get('/')
  async getAll() {
    const { categories } = await this.findAllCategories.execute()
    return {
      categories,
    }
  }

  @Get('/:categoryId')
  async getOne(@Param('categoryId') categoryId: string) {
    const { category } = await this.findCategoryById.execute({ categoryId })
    return {
      category,
    }
  }
}
