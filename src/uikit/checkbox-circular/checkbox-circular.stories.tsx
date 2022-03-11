import { Story, Meta } from '@storybook/react'

import { CheckboxCircular, CheckboxCircularProps } from './checkbox-circular'

export default {
  title: 'uikit/Checkbox Circular',
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

export const Checked = Template.bind({})
Checked.args = {
  name: '0',
  checked: true,
  label: 'Студия',
}

export const UnChecked = Template.bind({})
UnChecked.args = {
  name: '1',
  checked: false,
  label: '1',
}

export const fullEmptySpaceStyle = Template.bind({})
fullEmptySpaceStyle.args = {
  name: '1',
  checked: false,
  label: '1',
  mode: 'full_empty_space',
}

export const fullStyle = Template.bind({})
fullStyle.args = {
  name: '1',
  checked: false,
  label: '1',
  mode: 'full',
}

export const widthIcon = Template.bind({})
widthIcon.args = {
  name: '1',
  checked: true,
  label: 'Без ремонта',
  mode: 'full',
  icon: 'noCian',
}

export const interactiveTrue = Template.bind({})
interactiveTrue.args = {
  name: '0',
  checked: true,
  label: 'Да',
  theme: 'indicatorButton',
}

export const interactiveFalse = Template.bind({})
interactiveFalse.args = {
  name: '0',
  checked: false,
  label: 'Нет',
  theme: 'indicatorButton',
}
