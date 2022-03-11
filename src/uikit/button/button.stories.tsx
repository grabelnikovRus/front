import { Story, Meta } from '@storybook/react'

import { Button, ButtonProps } from './button'

export default {
  title: 'uikit/Button',
  component: Button,
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  mode: 'primary',
  label: 'Показать 32 квартиры',
}

export const Secondary = Template.bind({})
Secondary.args = {
  mode: 'secondary',
  label: 'Смотреть на карте',
}

export const Back = Template.bind({})
Back.args = {
  mode: 'back',
  label: 'Назад',
}

export const Disabled = Template.bind({})
Disabled.args = {
  mode: 'primary',
  label: 'Написать нам',
  disabled: true,
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  label: 'Button',
}

export const Medium = Template.bind({})
Medium.args = {
  size: 'medium',
  label: 'Button',
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  label: 'Button',
}

export const Full = Template.bind({})
Full.args = {
  size: 'full',
  label: 'Button',
}
