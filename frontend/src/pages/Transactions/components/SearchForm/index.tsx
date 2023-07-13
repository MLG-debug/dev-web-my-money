import { useForm } from 'react-hook-form'
import { SearchFormContainer } from './styles'
import { MagnifyingGlass, Plus } from 'phosphor-react'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'
import { memo } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionModal } from '../../../../components/NewTransactionModal'
import { CategoriesMenu } from '../../../../components/CategoriesMenu'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export const SearchFormComponent = () => {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    },
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  const handleSearchTransactions = async (data: SearchFormInputs) => {
    await fetchTransactions({
      page: 1,
      query: data.query,
    })
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
      </button>

      <CategoriesMenu />

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button>
            <Plus size={20} />
            Nova transação
          </button>
        </Dialog.Trigger>
        <NewTransactionModal />
      </Dialog.Root>
    </SearchFormContainer>
  )
}

export const SearchForm = memo(SearchFormComponent)
