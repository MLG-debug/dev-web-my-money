import { DatabaseModule } from '@infra/database/database.module'
import { Module } from '@nestjs/common'
import { CategoriesController } from './controllers/categories.controller'
import { CreateCategoryUseCase } from '@app/use-cases/categories/create-category'
import { EditCategoryUseCase } from '@app/use-cases/categories/edit-category'
import { ArchiveCategoryUseCase } from '@app/use-cases/categories/archive-category'
import { CreateTransactionUseCase } from '@app/use-cases/transactions/create-transaction'
import { DeleteTransactionUseCase } from '@app/use-cases/transactions/delete-transaction'
import { EditTransactionUseCase } from '@app/use-cases/transactions/edit-transaction'
import { GetAllTransactionsUseCase } from '@app/use-cases/transactions/get-all-transactions'
import { GetTransactionByIdUseCase } from '@app/use-cases/transactions/get-transaction-by-id'
import { GetTransactionsByCategoryUseCase } from '@app/use-cases/transactions/get-transactions-by-category'
import { GetTransactionsByDateUseCase } from '@app/use-cases/transactions/get-transactions-by-date'
import { GetTransactionsByQueryUseCase } from '@app/use-cases/transactions/get-transactions-by-query'
import { TransactionsController } from './controllers/transactions.controller'
import { GetCategoryByIdUseCase } from '@app/use-cases/categories/get-category-by-id'
import { GetAllCategoriesUseCase } from '@app/use-cases/categories/get-all-categories'
import { GetMonthlyOutcomeSumsByYearUseCase } from '@app/use-cases/transactions/get-all-outcome-transactions-by-year'
import { GetAllTransactionsDetailsUseCase } from '@app/use-cases/transactions/get-all-transactions-details'

@Module({
  imports: [DatabaseModule],
  controllers: [CategoriesController, TransactionsController],
  providers: [
    // category
    CreateCategoryUseCase,
    EditCategoryUseCase,
    ArchiveCategoryUseCase,
    GetCategoryByIdUseCase,
    GetAllCategoriesUseCase,

    // transaction

    CreateTransactionUseCase,
    DeleteTransactionUseCase,
    EditTransactionUseCase,
    GetMonthlyOutcomeSumsByYearUseCase,
    GetAllTransactionsUseCase,
    GetAllTransactionsDetailsUseCase,
    GetTransactionByIdUseCase,
    GetTransactionsByCategoryUseCase,
    GetTransactionsByDateUseCase,
    GetTransactionsByQueryUseCase,
  ],
  exports: [],
})
export class HttpModule {}
