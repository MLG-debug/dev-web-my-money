import { CaretDown } from 'phosphor-react'
import { DropdownMenu, MenuItem } from '../CategoriesMenu/styles'
import { SelectCategoryContainer } from './styles'
import React, { useState } from 'react'
import { api } from '../../lib/axios'
import { Category } from '../../contexts/TransactionsContext'
import { Control, Controller } from 'react-hook-form'
import { AddCategoryButton } from '../AddCategoryButton'

type ValueInputProps = {
  control: Control<any>
  // onCategoryChange: (category: Category | null) => void
  name: string
}

export const SelectCategoryInput = ({
  control,
  name,
  // onCategoryChange,
  ...rest
}: ValueInputProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState<Category[]>([])

  const handleButtonClick = async () => {
    setIsOpen(!isOpen)
    // Simule uma chamada à API para obter as categorias
    const response = await api.get('/categories')
    const items = response.data
    // Atualize o estado das categorias com a resposta da API
    setItems(items)
  }

  const handleMenuClose = () => {
    setIsOpen(false)
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <SelectCategoryContainer>
          <button onClick={handleButtonClick}>
            {field.value?.name || 'Selecione uma categoria'}
            <CaretDown size={22} />
          </button>

          <DropdownMenu $isOpen={isOpen} onMouseLeave={handleMenuClose}>
            {items.map((item) => (
              <MenuItem
                onClick={() => {
                  field.onChange({ id: item.id, name: item.name })
                  // onCategoryChange(item)
                  handleMenuClose()
                }}
                key={item.id}
                value={item.id}
              >
                {item.name}
              </MenuItem>
            ))}
          </DropdownMenu>

          <AddCategoryButton />
        </SelectCategoryContainer>
      )}
    />
  )
}
