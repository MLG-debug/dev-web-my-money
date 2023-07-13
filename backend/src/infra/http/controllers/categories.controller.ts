import { Body, Controller, Post, Patch, Put, Param, Get } from '@nestjs/common'
import { ArchiveCategoryUseCase } from './../../../app/use-cases/categories/archive-category'
import { CreateCategoryBody } from '../dtos/create-category-body.dto'
import { EditCategoryBody } from '../dtos/edit-category-body.dto'
import { EditCategoryUseCase } from '@app/use-cases/categories/edit-category'
import { CreateCategoryUseCase } from './../../../app/use-cases/categories/create-category'
import { CategoryViewModel } from '../view-models/category-view-model'
import { GetCategoryByIdUseCase } from '@app/use-cases/categories/get-category-by-id'
import { GetAllCategoriesUseCase } from '@app/use-cases/categories/get-all-categories'

@Controller('/categories')
export class CategoriesController {
  constructor(
    private createCategory: CreateCategoryUseCase,
    private editCategory: EditCategoryUseCase,
    private archiveCategory: ArchiveCategoryUseCase,
    private getCategoryById: GetCategoryByIdUseCase,
    private getAllCategories: GetAllCategoriesUseCase,
  ) {}

  @Post('/')
  async create(@Body() body: CreateCategoryBody) {
    const { name } = body
    const { category } = await this.createCategory.execute({ name })
    return CategoryViewModel.toHTTP(category)
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
    const { categories } = await this.getAllCategories.execute()
    return categories.map(CategoryViewModel.toHTTP)
  }

  @Get('/:categoryId')
  async getOne(@Param('categoryId') categoryId: string) {
    const { category } = await this.getCategoryById.execute({ categoryId })
    return CategoryViewModel.toHTTP(category)
  }
}
