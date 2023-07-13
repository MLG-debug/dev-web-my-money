import { ReactNode, useCallback, useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'

/**
 *  Por que um componente renderiza?
 *  - Hooks changed (mudou estado, mudou contexto, reducer)
 *  - Props changed (mudou propriedades)
 *  - Parent rendered (componente pai renderizou)
 *
 *  Qual o fluxo de renderização?
 *  1. O React recria o HTML da interface daquele componente em memória
 *  2. Compara a versão do HTML recriada com a versão anterior
 *  3. SE mudou alguma coisa, ele reescreve o HTML na tela
 *
 *  Evitar que um componente filho seja re-renderizado devido a renderização de um componente pai
 *  Memo: o fluxo é alterado, coloca um passo a mais antes
 *  0. Hooks changed, Props changed (deep comparison)
 *  0.1. Comparar a versão anterior dos hooks e props
 *  0.2. SE mudou algo, ele segue para o fluxo normal
 */

export interface Category {
  id: string
  name: string
}

export interface Transaction {
  id: string
  description: string
  type: 'INCOME' | 'OUTCOME'
  price: number
  date: string
  category: Category
  createdAt: string
}
export interface TransactionDetail {
  type: 'INCOME' | 'OUTCOME'
  price: number
}

interface CreateTransactionInput {
  description: string
  price: number
  categoryId: string
  date: string
  type: 'INCOME' | 'OUTCOME'
}

interface FetchTransactionsProps {
  page?: number
  query?: string
}
interface FetchTransactionsByCategoryProps {
  page?: number
  categoryId: string
}

interface TransactionContextType {
  transactions: Transaction[]
  transactionsDetails: TransactionDetail[]
  fetchTransactions: (props: FetchTransactionsProps) => Promise<void>
  fetchTransactionsByCategory: (
    props: FetchTransactionsByCategoryProps,
  ) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [transactionsDetails, setTransactionsDetails] = useState<
    TransactionDetail[]
  >([])

  const fetchTransactions = useCallback(
    async (props: FetchTransactionsProps) => {
      const response = await api.get('/transactions', {
        params: {
          page: props.page,
          query: props.query,
        },
      })
      setTransactions(response.data)
    },
    [],
  )

  const fetchTransactionsByCategory = useCallback(
    async (props: FetchTransactionsByCategoryProps) => {
      const response = await api.get(
        '/transactions/category/' + props.categoryId,
        {
          params: {
            page: props.page,
          },
        },
      )
      setTransactions(response.data)
    },
    [],
  )

  const fetchTransactionsDetails = useCallback(async () => {
    const response = await api.get('/transactions/details')
    if (response.data) {
      setTransactionsDetails(response.data)
    }
  }, [])

  // useCallback verifica se a função alterou algo, se sim, ela é recriada em memória
  const createTransaction = useCallback(
    async ({
      categoryId,
      description,
      price,
      type,
      date,
    }: CreateTransactionInput) => {
      const response = await api.post('/transactions', {
        description,
        price,
        categoryId,
        type,
        date,
        createdAt: new Date(),
      })
      setTransactions((state) => [response.data, ...state])
    },
    [],
  )

  useEffect(() => {
    fetchTransactions({})
    fetchTransactionsDetails()
  }, [fetchTransactions, fetchTransactionsDetails])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        transactionsDetails,
        fetchTransactions,
        fetchTransactionsByCategory,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
