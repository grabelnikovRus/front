import { Story, Meta } from '@storybook/react'

import { SvgClose } from '@/uikit'

import { ButtonIcon, ButtonIconProps } from './button-icon'

export default {
  title: 'uikit/ButtonIcon',
  component: ButtonIcon,
  parameters: {
    backgrounds: {
      values: [
        { name: 'sell', value: '#43B5E9' },
        { name: 'buy', value: '#8CCC98' },
        { name: 'light', value: '#F8F8F8' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
  argTypes: { onChange: { action: 'clicked' } },
} as Meta

const Template: Story<ButtonIconProps> = (args) => (
  <div style={{ padding: 20 }}>
    <ButtonIcon {...args}>{args.children}</ButtonIcon>
  </div>
)

export const Transparent = Template.bind({})
Transparent.args = {
  children: <SvgClose />,
}
Transparent.parameters = {
  backgrounds: { default: 'dark' },
}

export const Opaque = Template.bind({})
Opaque.args = {
  mode: 'opaque',
  children: <SvgClose />,
}
Opaque.parameters = {
  backgrounds: { default: 'light' },
}
