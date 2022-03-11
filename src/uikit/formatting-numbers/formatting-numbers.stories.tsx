import { Story, Meta } from '@storybook/react'

import { FormattingNumbers, FormattingNumbersProps } from './formatting-numbers'

export default {
  title: 'uikit/Formatting numbers',
  component: FormattingNumbers,
  argTypes: {
    mode: ['area', 'money', 'phone'],
  },
} as Meta

const Template: Story<FormattingNumbersProps> = (args) => <FormattingNumbers {...args} />

export const NumberPhone = Template.bind({})
NumberPhone.args = {
  value: '880022200640',
}

export const NumberMoney = Template.bind({})
NumberMoney.args = {
  value: 15000000.022,
  mode: 'money',
}

export const NumberArea = Template.bind({})
NumberArea.args = {
  value: 85.55,
  mode: 'area',
}
