import { Story, Meta } from '@storybook/react'
import { useState } from 'react'

import { InputCode, InputCodeProps } from './input-code'

export default {
  title: 'uikit/Input Code',
  component: InputCode,
  argTypes: { onChange: { action: 'clicked' } },
} as Meta

const Template: Story<InputCodeProps> = (args) => {
  const [value, setValue] = useState(['', '', '', ''])
  return (
    <div style={{ width: 355, padding: '24px' }}>
      <InputCode {...args} value={value} onChange={setValue} />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  phoneNumber: '792354682014',
}

export const WithError = Template.bind({})
WithError.args = {
  phoneNumber: '792354682014',
  error: 'Ошибка: Неверный код',
}

export const Dark = Template.bind({})
Dark.args = {
  label: 'Код из СМС',
  phoneNumber: '792354682014',
  theme: 'dark',
}
Dark.parameters = { backgrounds: { default: 'dark' } }

export const DarkWidthError = Template.bind({})
DarkWidthError.args = {
  label: 'Код из СМС',
  phoneNumber: '792354682014',
  error: 'Ошибка: Неверный код',
  theme: 'dark',
}
DarkWidthError.parameters = { backgrounds: { default: 'dark' } }
