import { Story, Meta } from '@storybook/react'

import { Container, ContainerProps } from './container'

export default {
  title: 'uikit/Container',
  component: Container,
} as Meta

const Template: Story<ContainerProps> = (args) => (
  <Container {...args}>
    <div style={{ height: '500px' }} />
  </Container>
)

export const Default = Template.bind({})
Default.args = {
  theme: 'default',
}

export const MobileFullWidth = Template.bind({})
MobileFullWidth.args = {
  containerType: 'mobile-full',
  theme: 'default',
}

export const Border = Template.bind({})
Border.args = {
  border: 'all',
  theme: 'light',
}
