import { FloppyDisk, Plus } from 'phosphor-react'
import { Input, SaveButton, Tooltip } from './styles'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { api } from '../../lib/axios'
import { toast } from 'react-toastify'
import axios from 'axios'

export const AddCategoryButton = () => {
  const { handleSubmit, register, resetField } = useForm()
  const [showTooltip, setShowTooltip] = useState(false)

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post('/categories', {
        name: data.categoryName,
      })
      if (response.status === 201) {
        setShowTooltip(false)
        toast.success('Categoria criada com sucesso.')
        resetField('categoryName')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || 'Erro ao criar categoria.')
      } else {
        toast.error('Erro ao criar categoria.')
      }
    }
  }

  const handleClickTooltip = () => {
    setShowTooltip(!showTooltip)
  }

  return (
    <div>
      <button type="button" onClick={handleClickTooltip}>
        <Plus size={22} />
      </button>
      <Tooltip $show={showTooltip}>
        <Input
          type="text"
          placeholder="Nome da categoria"
          {...register('categoryName', { required: true })}
        />
        <SaveButton onClick={handleSubmit(onSubmit)}>
          <FloppyDisk size={22} />
        </SaveButton>
      </Tooltip>
    </div>
  )
}
