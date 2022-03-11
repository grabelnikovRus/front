import { Story, Meta } from '@storybook/react'

import { CheckboxCircular, CheckboxCircularProps } from './checkbox-circular'

export default {
  title: 'uikit/Filter/Checkbox Circular',
  component: CheckboxCircular,
  argTypes: {
    icon: {
      options: [null, 'noCian', 'cosmeticCian', 'designCian', 'euroCian'],
      control: { type: 'select' },
    },
    onChange: { action: 'clicked' },
  },
} as Meta

const Template: Story<CheckboxCircularProps> = (args) => (
  <div className="pik_broker">
    <CheckboxCircular {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  name: '0',
  label: 'Студия',
}

export const classic = Template.bind({})
classic.args = {
  name: '1',
  checked: true,
  label: 'Следы от затопления',
  theme: 'classic',
}
