import { Story, Meta } from '@storybook/react'

import { ModalSimple, ModalSimpleProps } from './modal-simple'

export default {
  title: 'uikit/Modal Simple',
  component: ModalSimple,
} as Meta

const Template: Story<ModalSimpleProps> = (args) => (
  <ModalSimple {...args}>
    <div>Modal content</div>
  </ModalSimple>
)

export const Default = Template.bind({})
Default.args = {
  isOpen: true,
}
