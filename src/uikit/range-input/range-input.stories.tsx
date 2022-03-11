import { Story, Meta } from '@storybook/react'

import { RangeInput, RangeInputProps } from './range-input'

export default {
  title: 'uikit/Range Input',
  component: RangeInput,
} as Meta

const Template: Story<RangeInputProps> = (args) => (
  <div style={{ width: 320 }}>
    <RangeInput {...args} />
  </div>
)

const value = 3000000

export const Default = Template.bind({})
Default.args = {
  name: 'contribution',
  label: 'Первоначальный взнос',
  value: String(value),
  firstText: '670 тыс',
  secondText: '1,6 млн',
}
