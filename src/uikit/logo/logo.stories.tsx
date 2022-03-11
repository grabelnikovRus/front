import { Story, Meta } from '@storybook/react'

import { Logo, LogoProps } from './logo'

export default {
  title: 'Uikit/Logo',
  component: Logo,
} as Meta

const Template: Story<LogoProps> = (args) => (
  <div style={{ padding: 100 }}>
    <Logo {...args} />
  </div>
)

export const Dark = Template.bind({})
Dark.args = {
  theme: 'dark',
}

export const Light = Template.bind({})
Light.args = {
  theme: 'light',
}
