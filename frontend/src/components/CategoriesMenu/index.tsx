import { useState } from 'react'
import { DropdownMenu, MenuItem } from './styles'
import { List } from 'phosphor-react'
import {
  Category,
  TransactionsContext,
} from '../../contexts/TransactionsContext'
import { api } from '../../lib/axios'
import { useContextSelector } from 'use-context-selector'

export const CategoriesMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState<Category[]>([])

  const fetchTransactionsByCategory = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactionsByCategory
    },
  )

  const handleButtonClick = async () => {
    setIsOpen(!isOpen)
    const { data } = await api.get('/categories')
    setItems(data)
  }

  const handleMenuClose = () => {
    setIsOpen(false)
  }

  const handleSelectCategory = async (id: string) => {
    await fetchTransactionsByCategory({ categoryId: id, page: 1 })
  }

  return (
    <div>
      <button type="submit" onClick={handleButtonClick}>
        <List size={20} />
      </button>
      <DropdownMenu $isOpen={isOpen} onMouseLeave={handleMenuClose}>
        {items.map((item) => (
          <MenuItem onClick={() => handleSelectCategory(item.id)} key={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </DropdownMenu>
    </div>
  )
}
