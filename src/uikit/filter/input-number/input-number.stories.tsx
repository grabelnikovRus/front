import { Story, Meta } from '@storybook/react'

import { InputNumber, InputNumberProps } from './input-number'

export default {
  title: 'uikit/Filter/Input number',
  component: InputNumber,
  argTypes: { onChange: { action: 'clicked' } },
  decorators: [
    (Story) => (
      <div style={{ width: 355, padding: '24px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#ffffff' }],
    },
  },
} as Meta

const Template: Story<InputNumberProps> = (args) => <InputNumber {...args} />

export const Area = Template.bind({})
Area.args = {
  textHead: 'От',
  textTail: 'м²',
  placeholder: '0',
  format: { decimalSeparator: ',' },
}

export const Money = Template.bind({})
Money.args = {
  placeholder: '3 000 000',
  format: {
    decimalSeparator: ',',
    thousandSeparator: ' ',
  },
}

export const Phone = Template.bind({})
Phone.args = {
  placeholder: '+7 (---)--- -- --',
  format: {
    format: '+7 (###) ###-##-##',
  },
}
