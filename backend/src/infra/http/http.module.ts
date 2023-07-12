import { DatabaseModule } from '@infra/database/database.module'
import { Module } from '@nestjs/common'
import { CategoriesController } from './controllers/categories.controller'
import { CreateCategoryUseCase } from '@app/use-cases/categories/create-category'
import { EditCategoryUseCase } from '@app/use-cases/categories/edit-category'
import { ArchiveCategoryUseCase } from '@app/use-cases/categories/archive-category'
import { FindCategoryByIdUseCase } from '@app/use-cases/categories/find-category-by-id'
import { FindAllCategoriesUseCase } from '@app/use-cases/categories/find-all-categories'
import { CreateTransactionUseCase } from '@app/use-cases/transactions/create-transaction'
import { DeleteTransactionUseCase } from '@app/use-cases/transactions/delete-transaction'
import { EditTransactionUseCase } from '@app/use-cases/transactions/edit-transaction'
import { GetAllOutcomeTransactionsByYearUseCase } from '@app/use-cases/transactions/get-all-outcome-transactions-by-year'
import { GetAllTransactionsUseCase } from '@app/use-cases/transactions/get-all-transactions'
import { GetTransactionByIdUseCase } from '@app/use-cases/transactions/get-transaction-by-id'
import { GetTransactionsByCategoryUseCase } from '@app/use-cases/transactions/get-transactions-by-category'
import { GetTransactionsByDateUseCase } from '@app/use-cases/transactions/get-transactions-by-date'
import { GetTransactionsByQueryUseCase } from '@app/use-cases/transactions/get-transactions-by-query'
import { TransactionsController } from './controllers/transactions.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [CategoriesController, TransactionsController],
  providers: [
    // category
    CreateCategoryUseCase,
    EditCategoryUseCase,
    ArchiveCategoryUseCase,
    FindCategoryByIdUseCase,
    FindAllCategoriesUseCase,

    // transaction

    CreateTransactionUseCase,
    DeleteTransactionUseCase,
    EditTransactionUseCase,
    GetAllOutcomeTransactionsByYearUseCase,
    GetAllTransactionsUseCase,
    GetTransactionByIdUseCase,
    GetTransactionsByCategoryUseCase,
    GetTransactionsByDateUseCase,
    GetTransactionsByQueryUseCase,
  ],
  exports: [],
})
export class HttpModule {}
