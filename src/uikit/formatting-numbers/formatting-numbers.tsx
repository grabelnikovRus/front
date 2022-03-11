import { VFC } from 'react'
import NumberFormat from 'react-number-format'

export interface FormattingNumbersProps {
  mode: 'phone' | 'money' | 'area'
  value?: string | number
}

export const FormattingNumbers: VFC<FormattingNumbersProps> = ({ mode = 'phone', value }) => {
  if (mode === 'money') {
    return (
      <NumberFormat
        value={value}
        thousandSeparator=" "
        decimalScale={0}
        suffix=" ₽"
        displayType="text"
      />
    )
  }

  if (mode === 'area') {
    return <NumberFormat value={value} suffix=" м²" decimalScale={0} displayType="text" />
  }

  return <NumberFormat value={value} format="# ### ### ## ##" displayType="text" />
}
