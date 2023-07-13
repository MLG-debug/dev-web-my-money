import { Transaction } from '@app/entities/Transaction'
import {
  FindByCategoryProps,
  FindByDateProps,
  FindMonthlyOutcomeSumsByYearResponse,
  Paginate,
  SearchProps,
  TransactionsRepository,
} from '@app/repositories/transactions-repository'
import { PrismaService } from '../prisma.service'
import {
  PrismaTransactionMapper,
  RawTransactionWithCategory,
} from '../mappers/prisma-transaction-mapper'
import { Injectable } from '@nestjs/common'

const PAGE_SIZE = 10

@Injectable()
export class PrismaTransactionRepository implements TransactionsRepository {
  constructor(private prisma: PrismaService) {}

  async create(transaction: Transaction) {
    const raw = PrismaTransactionMapper.toPrisma(transaction)
    const transactionCreated = await this.prisma.transaction.create({
      data: raw,
      include: {
        category: true,
      },
    })

    return PrismaTransactionMapper.toDomainWithCategory(
      transactionCreated as RawTransactionWithCategory,
    )
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

  async findAll(props: Paginate) {
    const pagination = {} as any

    if (props !== undefined) {
      const skip = (props.page - 1) * PAGE_SIZE
      pagination.skip = skip
      pagination.take = PAGE_SIZE
    }

    const transactions = await this.prisma.transaction.findMany({
      ...pagination,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    if (transactions.length === 0) return []

    return transactions.map((t) => {
      return PrismaTransactionMapper.toDomainWithCategory(
        t as RawTransactionWithCategory,
      )
    })
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
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    if (transactions.length === 0) return []

    return transactions.map((t) => {
      return PrismaTransactionMapper.toDomainWithCategory(
        t as RawTransactionWithCategory,
      )
    })
  }

  // async findByYear(props: FindByYearProps) {
  //   const { year, page } = props

  //   const skip = (page - 1) * PAGE_SIZE

  //   const transactions = await this.prisma.transaction.findMany({
  //     where: {
  //       date: {
  //         gte: new Date(year, 0, 1),
  //         lte: new Date(year, 11, 31),
  //       },
  //     },
  //     skip,
  //     take: PAGE_SIZE,
  //     orderBy: {
  //       createdAt: 'desc',
  //     },
  //   })

  //   return transactions.map((t) => PrismaTransactionMapper.toDomain(t))
  // }

  async findMonthlyOutcomeSumsByYear(
    year: number,
  ): Promise<FindMonthlyOutcomeSumsByYearResponse> {
    const monthlyExpenseSums = Array(12).fill(0)

    const transactions = await this.prisma.transaction.findMany({
      where: {
        date: {
          gte: new Date(year, 0, 1),
          lte: new Date(year, 11, 31),
        },
      },
    })

    if (transactions.length === 0) return { months: [] }

    transactions.forEach((transaction) => {
      if (transaction.type === 'OUTCOME') {
        const month = transaction.date.getMonth()
        const expense = transaction.price
        monthlyExpenseSums[month] += expense
      }
    })

    return { months: monthlyExpenseSums }
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
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    if (transactions.length === 0) return []

    return transactions.map((t) => {
      return PrismaTransactionMapper.toDomainWithCategory(
        t as RawTransactionWithCategory,
      )
    })
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
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    if (transactions.length === 0) return []

    return transactions.map((t) => {
      return PrismaTransactionMapper.toDomainWithCategory(
        t as RawTransactionWithCategory,
      )
    })
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
