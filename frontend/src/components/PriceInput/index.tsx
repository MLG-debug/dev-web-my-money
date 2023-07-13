import { Control, Controller } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

type ValueInputProps = {
  control: Control<any>
  name: string
}

export const PriceInput = ({ control, name, ...rest }: ValueInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <NumericFormat
          {...field}
          thousandSeparator="."
          decimalSeparator=","
          prefix="R$ "
          allowNegative={false}
          decimalScale={2}
          fixedDecimalScale={true}
          // isNumericString={false}
          allowLeadingZeros={false}
          // format="#,##0.00"
          placeholder="R$ 0,00"
          getInputRef={field.ref}
          onValueChange={(values) => {
            field.onChange(values.value)
          }}
        />
      )}
    />
  )
}
