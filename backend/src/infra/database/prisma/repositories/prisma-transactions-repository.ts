import { Transaction } from '@app/entities/Transaction'
import {
  FindByCategoryProps,
  FindByDateProps,
  FindByYearProps,
  Paginate,
  SearchProps,
  TransactionsRepository,
} from '@app/repositories/transactions-repository'
import { PrismaService } from '../prisma.service'
import { PrismaTransactionMapper } from '../mappers/prisma-transaction-mapper'
import { Injectable } from '@nestjs/common'

const PAGE_SIZE = 10

@Injectable()
export class PrismaTransactionRepository implements TransactionsRepository {
  constructor(private prisma: PrismaService) {}

  async create(transaction: Transaction) {
    const raw = PrismaTransactionMapper.toPrisma(transaction)
    const transactionCreated = await this.prisma.transaction.create({
      data: raw,
    })

    return PrismaTransactionMapper.toDomain(transactionCreated)
  }

  async findById(transactionId: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
    })

    if (!transaction) {
      return null
    }

    return PrismaTransactionMapper.toDomain(transaction)
  }

  async findAll({ page }: Paginate) {
    const skip = (page - 1) * PAGE_SIZE

    const transactions = await this.prisma.transaction.findMany({
      skip,
      take: PAGE_SIZE,
    })

    return transactions.map((t) => PrismaTransactionMapper.toDomain(t))
  }

  async findByDate(props: FindByDateProps) {
    const { startDate, endDate, page } = props

    const skip = (page - 1) * PAGE_SIZE

    const transactions = await this.prisma.transaction.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      skip,
      take: PAGE_SIZE,
    })

    return transactions.map((t) => PrismaTransactionMapper.toDomain(t))
  }

  async findByYear(props: FindByYearProps) {
    const { year } = props

    const transactions = await this.prisma.transaction.findMany({
      where: {
        date: {
          gte: new Date(year, 0, 1),
          lte: new Date(year, 11, 31),
        },
      },
    })

    return transactions.map((t) => PrismaTransactionMapper.toDomain(t))
  }

  async findByCategory(props: FindByCategoryProps) {
    const { categoryId, page } = props

    const skip = (page - 1) * PAGE_SIZE

    const transactions = await this.prisma.transaction.findMany({
      where: {
        categoryId,
      },
      skip,
      take: PAGE_SIZE,
    })

    return transactions.map((t) => PrismaTransactionMapper.toDomain(t))
  }

  async search(props: SearchProps) {
    const { query, page } = props

    const skip = (page - 1) * PAGE_SIZE

    const transactions = await this.prisma.transaction.findMany({
      where: {
        OR: [
          {
            description: {
              contains: query,
            },
          },
          // {
          //   price: {
          //     equals: Number(query),
          //   },
          // },
          // {
          //   date: {
          //     equals: new Date(query),
          //   },
          // },
        ],
      },
      skip,
      take: PAGE_SIZE,
    })

    return transactions.map((t) => PrismaTransactionMapper.toDomain(t))
  }

  async delete(transactionId: string) {
    await this.prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    })
  }

  async save(transaction: Transaction) {
    const raw = PrismaTransactionMapper.toPrisma(transaction)

    await this.prisma.transaction.update({
      where: {
        id: transaction.id,
      },
      data: raw,
    })
  }
}
