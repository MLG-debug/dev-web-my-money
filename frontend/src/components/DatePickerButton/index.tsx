import React from 'react'
import { CalendarInput } from './styles'
import { Control, useController } from 'react-hook-form'

type ValueInputProps = {
  control: Control<any>
  name: string
}

export const DatePickerButton = ({ control, name }: ValueInputProps) => {
  // const [selectedDate, setSelectedDate] = useState('')

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  const {
    field: { ref, value, onChange },
  } = useController({
    name,
    control,
    defaultValue: '',
  })

  // const handleButtonClick = () => {
  //   // Lógica para tratar a data selecionada
  //   console.log('Data selecionada:', selectedDate)
  // }

  return (
    <div>
      <CalendarInput
        type="date"
        placeholder="Selecione uma data"
        value={value}
        onChange={handleDateChange}
        ref={ref}
      />
    </div>
  )
}
