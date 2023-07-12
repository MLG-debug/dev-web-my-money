import { Transaction } from '@app/entities/transaction'
import { Transaction as RawTransaction } from '@prisma/client'

export class PrismaTransactionMapper {
  static toPrisma(transaction: Transaction) {
    return {
      id: transaction.id,
      description: transaction.description,
      price: transaction.price,
      type: transaction.type,
      categoryId: transaction.categoryId,
      date: transaction.date,

      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    }
  }

  static toDomain(raw: RawTransaction) {
    return new Transaction(
      {
        description: raw.description,
        price: raw.price,
        type: raw.type,
        categoryId: raw.categoryId,
        date: raw.date,

        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    )
  }
}
