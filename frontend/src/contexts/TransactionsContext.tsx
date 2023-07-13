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
  id: string
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
  totalPages: number
  transactions: Transaction[]
  transactionsDetails: TransactionDetail[]
  fetchTransactions: (props: FetchTransactionsProps) => Promise<void>
  fetchTransactionsByCategory: (
    props: FetchTransactionsByCategoryProps,
  ) => Promise<void>
  fetchTransactionsBySearch: (props: FetchTransactionsProps) => Promise<void>
  loadMore: (page: number) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
  deleteTransaction: (id: string) => Promise<void>
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

  const [totalPages, setTotalPages] = useState(1)
  const [currentSearchType, setCurrentSearchType] = useState<
    'all' | 'search' | 'category'
  >('all')

  const fetchTransactions = useCallback(
    async (props: FetchTransactionsProps) => {
      const response = await api.get('/transactions', {
        params: {
          page: props.page || 1,
          search: props.query,
        },
      })

      setTotalPages(response.data.totalPages)
      setCurrentSearchType('all')

      setTransactions(response.data.transactions)
    },
    [],
  )

  const fetchTransactionsBySearch = useCallback(
    async (props: FetchTransactionsProps) => {
      const response = await api.get('/transactions/search', {
        params: {
          page: props.page || 1,
          query: props.query,
        },
      })

      setTotalPages(response.data.totalPages)
      setCurrentSearchType('search')

      setTransactions(response.data.transactions)
    },
    [],
  )

  const fetchTransactionsByCategory = useCallback(
    async (props: FetchTransactionsByCategoryProps) => {
      const response = await api.get(
        '/transactions/category/' + props.categoryId,
        {
          params: {
            page: props.page || 1,
          },
        },
      )

      console.log(response.data.totalPages)

      setTotalPages(response.data.totalPages)
      setCurrentSearchType('category')

      setTransactions(response.data.transactions)
    },
    [],
  )

  const fetchTransactionsDetails = useCallback(async () => {
    const response = await api.get('/transactions/details')
    if (response.data) {
      setTransactionsDetails(response.data)
    }
  }, [])

  const loadMore = useCallback(
    async (page: number) => {
      if (currentSearchType === 'all') {
        await fetchTransactions({ page })
      } else if (currentSearchType === 'search') {
        await fetchTransactionsBySearch({ page })
      } else if (currentSearchType === 'category') {
        await fetchTransactionsByCategory({
          page,
          categoryId: transactions[0].category.id,
        })
      }
    },
    [
      currentSearchType,
      fetchTransactions,
      fetchTransactionsBySearch,
      fetchTransactionsByCategory,
      transactions,
    ],
  )

  const deleteTransaction = useCallback(async (id: string) => {
    await api.delete(`/transactions/${id}`)
    setTransactions((state) => state.filter((t) => t.id !== id))
    setTransactionsDetails((state) => state.filter((t) => t.id !== id))
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
      setTransactionsDetails((state) => [response.data, ...state])
    },
    [],
  )

  useEffect(() => {
    fetchTransactions({})
    fetchTransactionsDetails()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{
        totalPages,
        loadMore,
        deleteTransaction,
        transactions,
        fetchTransactionsBySearch,
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
