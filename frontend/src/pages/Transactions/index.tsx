import { Summary } from '../../components/Summary'
import {
  DeleteButton,
  LoadMoreContainer,
  PaginationButton,
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'
import { SearchForm } from './components/SearchForm'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'

import { useContextSelector } from 'use-context-selector'
import { ArrowLeft, ArrowRight, Trash } from 'phosphor-react'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { useState } from 'react'

export const Transactions = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })
  const deleteTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.deleteTransaction
    },
  )
  const totalPages = useContextSelector(TransactionsContext, (context) => {
    return context.totalPages
  })

  const loadMore = useContextSelector(TransactionsContext, (context) => {
    return context.loadMore
  })

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1)
    loadMore(currentPage - 1)
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
    loadMore(currentPage + 1)
  }

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    loadMore(pageNumber)
  }

  const handleDeleteTransaction = async (id: string) => {
    try {
      await deleteTransaction(id)
      toast.success('Transação excluída com sucesso.')
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      } else {
        toast.error('Erro ao excluir transação.')
      }
    }
  }

  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPageNumbers = 4
    let startPage = currentPage
    let endPage = startPage + maxPageNumbers - 1

    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(endPage - maxPageNumbers + 1, 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }

  return (
    <div>
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.length === 0 ? (
              <div>
                <h3>Oops! Nenhuma transação encontrada.</h3>
              </div>
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td width="45%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === 'OUTCOME' && '- '}
                      {transaction.type === 'INCOME' && '+ '}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category.name}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                  <td>
                    <DeleteButton
                      onClick={() => handleDeleteTransaction(transaction.id)}
                    >
                      {<Trash size={20} />}
                    </DeleteButton>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </TransactionsTable>
        <LoadMoreContainer>
          {/* <button
            onClick={handleLoadMore}
            disabled={currentPage === totalPages}
          >
            Carregar mais ({currentPage}/{totalPages}) <CaretDown />
          </button> */}
          <PaginationButton
            onClick={handlePrevPage}
            disabled={currentPage === 1 || currentPage > totalPages}
          >
            <ArrowLeft size={24} />
          </PaginationButton>
          {getPageNumbers().map((pageNumber) => (
            <PaginationButton
              $active={currentPage === pageNumber}
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              disabled={currentPage === pageNumber || currentPage > totalPages}
            >
              {pageNumber}
            </PaginationButton>
          ))}
          <PaginationButton
            onClick={handleNextPage}
            disabled={currentPage === totalPages || currentPage > totalPages}
          >
            <ArrowRight size={24} />
          </PaginationButton>
        </LoadMoreContainer>
      </TransactionsContainer>
    </div>
  )
}
