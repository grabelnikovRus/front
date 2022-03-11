import { Story, Meta } from '@storybook/react'

import { InputText, InputTextProps } from './input-text'

export default {
  title: 'uikit/Filter/Input text',
  component: InputText,
  argTypes: { onChange: { action: 'clicked' } },
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
      values: [{ name: 'default', value: '#ffffff' }],
    },
  },
} as Meta

const Template: Story<InputTextProps> = (args) => <InputText {...args} />

export const Name = Template.bind({})
Name.args = {
  placeholder: 'Ваше имя?',
}

export const Password = Template.bind({})
Password.args = {
  placeholder: 'password',
  type: 'password',
  inputMode: 'none',
}
