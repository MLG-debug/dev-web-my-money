import * as Dialog from '@radix-ui/react-dialog'
import {
  CloseButton,
  Content,
  Overlay,
  PriceAndDateContainer,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import { X, ArrowCircleUp, ArrowCircleDown } from 'phosphor-react'
import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form'

import { DatePickerButton } from '../DatePickerButton'
import { PriceInput } from '../PriceInput'
import { SelectCategoryInput } from '../SelectCategoryInput'
import { toast } from 'react-toastify'
import { useContextSelector } from 'use-context-selector'
import {
  // Category,
  TransactionsContext,
} from '../../contexts/TransactionsContext'
import { AxiosError } from 'axios'

export const newTransactionFormSchema = z.object({
  description: z.string(),
  date: z.string(),
  // category: z.object({
  //   id: z.string(),
  //   name: z.string(),
  // }),
  categoryId: z.any(),
  price: z.string(),
  type: z.enum(['INCOME', 'OUTCOME']),
})

export type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export const NewTransactionModal = () => {
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction
    },
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
    reset,
  } = useForm<NewTransactionFormInputs>()

  const handleCreateNewTransaction = async ({
    description,
    price,
    type,
    categoryId,
    date,
  }: NewTransactionFormInputs) => {
    try {
      if (categoryId === undefined)
        return toast.error('Selecione uma categoria.')
      if (type === undefined)
        return toast.error('Selecione um tipo de transação.')
      if (description === '') return toast.error('Insira uma descrição.')
      if (price === '') return toast.error('Insira um preço.')
      if (date === undefined) return toast.error('Insira uma data.')

      const cleanedValue = price.replace('R$', '').replace('.', '')
      const floatValue = parseFloat(cleanedValue.replace(',', '.'))

      await createTransaction({
        date,
        description,
        price: floatValue,
        type,
        categoryId: categoryId.id,
      })

      toast.success('Transação criada com sucesso.')

      reset()
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      } else {
        toast.error('Houve um erro ao criar a transação.')
      }
    }
  }

  // const handleCategoryChange = (category: Category | null) => {
  //   setValue('categoryId', category?.id || null)
  // }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            {...register('description')}
          />
          <PriceAndDateContainer>
            {/* <input
              type="text"
              placeholder="Preço (R$)"
              onChange={handleInputChange}
              value={value}
              // {...register('price', { valueAsNumber: true })}
            /> */}
            <PriceInput control={control} name="price" />
            <DatePickerButton control={control} name="date" />
          </PriceAndDateContainer>
          {/* <input
            type="text"
            placeholder="Categoria"
            {...register('category')}
          /> */}

          <SelectCategoryInput
            // onCategoryChange={}
            control={control}
            name="categoryId"
          />

          <Controller
            control={control}
            name="type"
            render={(props) => (
              <TransactionType
                onValueChange={props.field.onChange}
                value={props.field.value}
              >
                <TransactionTypeButton variant="INCOME" value="INCOME">
                  <ArrowCircleUp size={24} />
                  Entrada
                </TransactionTypeButton>
                <TransactionTypeButton variant="OUTCOME" value="OUTCOME">
                  <ArrowCircleDown size={24} />
                  Saída
                </TransactionTypeButton>
              </TransactionType>
            )}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
