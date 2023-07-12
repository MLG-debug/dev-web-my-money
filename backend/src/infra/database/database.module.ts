import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CategoriesRepository } from '@app/repositories/categories-repository'
import { PrismaCategoriesRepository } from './prisma/repositories/prisma-categories-repository'
import { TransactionsRepository } from '@app/repositories/transactions-repository'
import { PrismaTransactionRepository } from './prisma/repositories/prisma-transactions-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: CategoriesRepository,
      useClass: PrismaCategoriesRepository,
    },
    {
      provide: TransactionsRepository,
      useClass: PrismaTransactionRepository,
    },
  ],
  imports: [],
  exports: [CategoriesRepository, TransactionsRepository],
})
export class DatabaseModule {}
