import { Story, Meta } from '@storybook/react'

import { SignUpViewing, SignUpViewingProps } from './sign-up-viewing'

export default {
  title: 'component/Sign Up Viewing',
  component: SignUpViewing,
} as Meta

const Template: Story<SignUpViewingProps> = (args) => <SignUpViewing {...args} />

export const Default = Template.bind({})
Default.args = {
  amoId: 1,
}
