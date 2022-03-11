import { Story, Meta } from '@storybook/react'

import { InputNumber } from '@/uikit/filter/input-number/input-number'

import { InputBox, InputBoxProps } from './input-box'

export default {
  title: 'Uikit/Input Box',
  component: InputBox,
  decorators: [
    (Story) => (
      <div style={{ width: 355, padding: '24px' }}>
        <Story />
      </div>
    ),
  ],
} as Meta

const Template: Story<InputBoxProps> = (args) => <InputBox {...args} />

export const Transparent = Template.bind({})
Transparent.args = {
  htmlFor: 'phone',
  label: 'Телефон',
  children: (
    <InputNumber
      id="phone"
      name="phone"
      placeholder="+7 (---)--- -- --"
      format={{
        format: '+7 (###) ###-##-##',
      }}
      onChange={() => null}
      onFocus={() => null}
      onBlur={() => null}
    />
  ),
  theme: 'transparent',
}
Transparent.parameters = { backgrounds: { default: 'dark' } }

export const Opaque = Template.bind({})
Opaque.args = {
  htmlFor: 'price',
  label: 'Цена',
  unit: '₽',
  children: (
    <InputNumber
      id="price"
      name="price"
      placeholder="3 000 000"
      textHead="От"
      format={{
        decimalSeparator: ',',
        thousandSeparator: ' ',
      }}
      onChange={() => null}
      onFocus={() => null}
      onBlur={() => null}
    />
  ),
  theme: 'opaque',
}
Opaque.parameters = { backgrounds: { default: 'light' } }

export const ErrorTransparent = Template.bind({})
ErrorTransparent.args = {
  htmlFor: 'phone',
  label: 'Телефон',
  children: (
    <InputNumber
      id="phone"
      name="phone"
      placeholder="+7 (---)--- -- --"
      format={{
        format: '+7 (###) ###-##-##',
      }}
      onChange={() => null}
      onFocus={() => null}
      onBlur={() => null}
    />
  ),
  error: 'Используйте формат: +7(000) 000-00-00.',
  theme: 'transparent',
}
ErrorTransparent.parameters = { backgrounds: { default: 'dark' } }

export const ErrorOpaque = Template.bind({})
ErrorOpaque.args = {
  htmlFor: 'price',
  label: 'Цена',
  unit: '₽',
  children: (
    <InputNumber
      id="price"
      name="price"
      placeholder="3 000 000"
      format={{
        decimalSeparator: ',',
        thousandSeparator: ' ',
      }}
      onChange={() => null}
      onFocus={() => null}
      onBlur={() => null}
    />
  ),
  error: 'Введите цену от 3 до 100 млн рублей',
  theme: 'opaque',
}
ErrorOpaque.parameters = { backgrounds: { default: 'light' } }
