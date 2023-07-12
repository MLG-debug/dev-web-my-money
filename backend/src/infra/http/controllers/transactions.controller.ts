import { CreateTransactionUseCase } from './../../../app/use-cases/transactions/create-transaction'
import { GetTransactionsByQueryUseCase } from './../../../app/use-cases/transactions/get-transactions-by-query'
import { GetTransactionsByDateUseCase } from './../../../app/use-cases/transactions/get-transactions-by-date'
import { GetTransactionsByCategoryUseCase } from './../../../app/use-cases/transactions/get-transactions-by-category'
import { GetTransactionByIdUseCase } from './../../../app/use-cases/transactions/get-transaction-by-id'
import { GetAllTransactionsUseCase } from './../../../app/use-cases/transactions/get-all-transactions'
import { GetAllOutcomeTransactionsByYearUseCase } from './../../../app/use-cases/transactions/get-all-outcome-transactions-by-year'
import { EditTransactionUseCase } from './../../../app/use-cases/transactions/edit-transaction'
import { DeleteTransactionUseCase } from './../../../app/use-cases/transactions/delete-transaction'
import {
  Body,
  Controller,
  Post,
  Put,
  Param,
  Get,
  Delete,
  Query,
} from '@nestjs/common'
import { CreateTransactionBody } from '../dtos/create-transaction-body'
import { PaginationQuery } from '../dtos/pagination.dto'
import { EditTransactionBody } from '../dtos/edit-transaction-body.dtos'
import { GetTransactionsBySearchQuery } from '../dtos/get-transactions-by-search-query.dto'
import { GetTransactionsByDateQuery } from '../dtos/get-transactions-by-date-query.dto'
import { GetTransactionsByYearQuery } from '../dtos/get-transactions-by-year-query.dto'

@Controller('/transactions')
export class TransactionsController {
  constructor(
    private createTransaction: CreateTransactionUseCase,
    private deleteTransaction: DeleteTransactionUseCase,
    private editTransaction: EditTransactionUseCase,
    private getAllOutcomeTransactionsByYear: GetAllOutcomeTransactionsByYearUseCase,
    private getAllTransactions: GetAllTransactionsUseCase,
    private getTransactionById: GetTransactionByIdUseCase,
    private getTransactionsByCategory: GetTransactionsByCategoryUseCase,
    private getTransactionsByDate: GetTransactionsByDateUseCase,
    private getTransactionsByQuery: GetTransactionsByQueryUseCase,
  ) {}

  @Post('/')
  async create(@Body() body: CreateTransactionBody) {
    const { description, categoryId, date, price, type } = body
    const { transaction } = await this.createTransaction.execute({
      categoryId,
      date,
      description,
      price,
      type,
    })
    return {
      transaction,
    }
  }

  @Delete('/:transactionId')
  async delete(@Param('transactionId') transactionId) {
    await this.deleteTransaction.execute({ transactionId })
  }

  @Put('/:transactionId')
  async edit(
    @Param('transactionId') transactionId,
    @Body() body: EditTransactionBody,
  ) {
    const { description, categoryId, date, price, type } = body
    await this.editTransaction.execute({
      transactionId,
      categoryId,
      date,
      description,
      price,
      type,
    })
  }

  @Get('/')
  async getAll(@Query() { page = 1 }: PaginationQuery) {
    const { transactions } = await this.getAllTransactions.execute({ page })
    return {
      transactions,
    }
  }

  @Get('/year')
  async getOutcomeByYear(
    @Query() { year }: GetTransactionsByYearQuery,
    @Query() { page = 1 }: PaginationQuery,
  ) {
    const { transactions } = await this.getAllOutcomeTransactionsByYear.execute(
      {
        year,
        page,
      },
    )
    return {
      transactions,
    }
  }

  @Get('/category/:categoryId')
  async getByCategory(
    @Param('categoryId') categoryId,
    @Query() { page = 1 }: PaginationQuery,
  ) {
    const { transactions } = await this.getTransactionsByCategory.execute({
      categoryId,
      page,
    })
    return {
      transactions,
    }
  }

  @Get('/date')
  async getByDate(
    @Query() { endDate, startDate }: GetTransactionsByDateQuery,
    @Query() { page = 1 }: PaginationQuery,
  ) {
    const { transactions } = await this.getTransactionsByDate.execute({
      startDate,
      endDate,
      page,
    })
    return {
      transactions,
    }
  }

  @Get('/search')
  async getByQuery(
    @Query() { query }: GetTransactionsBySearchQuery,
    @Query() { page = 1 }: PaginationQuery,
  ) {
    const { transactions } = await this.getTransactionsByQuery.execute({
      query,
      page,
    })
    return {
      transactions,
    }
  }

  @Get('/:transactionId')
  async getOne(@Param('transactionId') transactionId) {
    const { transaction } = await this.getTransactionById.execute({
      transactionId,
    })
    return {
      transaction,
    }
  }
}
