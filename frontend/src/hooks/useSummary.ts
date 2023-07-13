import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../contexts/TransactionsContext'
import { useMemo } from 'react'

export const useSummary = () => {
  const transactionsDetails = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.transactionsDetails
    },
  )

  // a variável summary apenas vai ser recriada quando o transactions details mudar
  const summary = useMemo(() => {
    return transactionsDetails.reduce(
      (acc, transaction) => {
        if (transaction.type === 'INCOME') {
          acc.income += transaction.price
        } else {
          acc.outcome += transaction.price
        }

        acc.total = acc.income - acc.outcome

        return acc
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )
  }, [transactionsDetails])

  return summary
}
