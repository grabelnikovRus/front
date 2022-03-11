import { Story, Meta } from '@storybook/react'

import { InputNumber } from '@/uikit/filter/input-number/input-number'

import { InputBoxRow, InputBoxRowProps } from './input-box-row'

export default {
  title: 'Uikit/Input Box Row',
  component: InputBoxRow,
  decorators: [
    (Story) => (
      <div style={{ width: 355, padding: '24px' }}>
        <Story />
      </div>
    ),
  ],
} as Meta

const Template: Story<InputBoxRowProps> = (args) => (
  <InputBoxRow {...args}>
    <InputNumber
      id="area-min"
      name="area-min"
      format={{
        decimalSeparator: ',',
      }}
      textHead="От"
      onChange={() => null}
    />
    <InputNumber
      id="area-max"
      name="area-max"
      format={{
        decimalSeparator: ',',
      }}
      textHead="До"
      onChange={() => null}
    />
  </InputBoxRow>
)

export const Opaque = Template.bind({})
Opaque.args = {
  htmlFor: 'area-min',
  label: 'Общая площадь',
  unit: 'м²',
  theme: 'opaque',
}
Opaque.parameters = { backgrounds: { default: 'light' } }

export const Transparent = Template.bind({})
Transparent.args = {
  htmlFor: 'area-min',
  label: 'Общая площадь',
  unit: 'м²',
  theme: 'transparent',
}
Transparent.parameters = { backgrounds: { default: 'black' } }

export const ErrorOpaque = Template.bind({})
ErrorOpaque.args = {
  htmlFor: 'area-min',
  label: 'Общая площадь',
  unit: 'м²',
  error: 'Укажите площадь от 0 до 150 м²',
  theme: 'opaque',
}
ErrorOpaque.parameters = { backgrounds: { default: 'light' } }
