import { Story, Meta } from '@storybook/react'

import { apartment } from '@/modules/apartment/apartment.mock'

import { CopyButton, CopyButtonProps } from './copy-button'

export default {
  title: 'uikit/Copy Button',
  component: CopyButton,
  decorators: [
    (Story) => (
      <div style={{ width: 355, padding: '24px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#ccc' }],
    },
  },
} as Meta

const Template: Story<CopyButtonProps> = (args) => <CopyButton {...args} />

export const Default = Template.bind({})
Default.args = {
  link: '/apartment/78787',
  text: apartment.housingComplex?.name || 'Квартира',
}
