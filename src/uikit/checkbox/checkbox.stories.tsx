import { Meta, Story } from '@storybook/react'

import { Checkbox, CheckboxProps } from './checkbox'

export default {
  title: 'uikit/Checkbox Simple',
  component: Checkbox,
  decorators: [
    (Story) => (
      <div style={{ padding: '24px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [
        { name: 'default', value: '#ffffff' },
        { name: 'dark', value: '#11142D' },
      ],
    },
  },
} as Meta

const Template: Story<CheckboxProps> = (args) => (
  <div>
    <Checkbox {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  label: (
    <>
      <a href="/mailing-list" target="_blank">
        Хочу
      </a>{' '}
      получать новости, информацию по сделке и специальные акции от Кварта
    </>
  ),
  name: 'allowMarketing',
  defaultValue: 'false',
}
