import { Story, Meta } from '@storybook/react'

import { SuggestAddress, SuggestAddressProps } from './suggest-address'

export default {
  title: 'component/Suggest Address',
  component: SuggestAddress,
  decorators: [
    (Story) => (
      <div style={{ width: '272px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: { onSelect: { action: 'clicked' } },
} as Meta

const Template: Story<SuggestAddressProps> = (args) => <SuggestAddress {...args} />

export const Default = Template.bind({})
Default.args = {
  addressData: {
    address: '',
  },
  placeholder: 'Введите адрес',
}

export const Address = Template.bind({})
Address.args = {
  addressData: {
    address: 'Москва',
  },
  placeholder: 'Введите адрес',
}
