import { Story, Meta } from '@storybook/react'

import { SuggestToponym, SuggestToponymProps } from './suggest-toponym'

export default {
  title: 'component/Suggest Toponym',
  component: SuggestToponym,
  decorators: [
    (Story) => (
      <div style={{ width: '272px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: { onSelect: { action: 'clicked' } },
} as Meta

const Template: Story<SuggestToponymProps> = (args) => <SuggestToponym {...args} />

export const Default = Template.bind({})
Default.args = {
  addressData: {
    address: '',
  },
  city: {
    name: 'Москва',
    bbox: {
      bbox1_latitude: 56.030469,
      bbox1_longitude: 36.67416,
      bbox2_latitude: 55.07298,
      bbox2_longitude: 38.047451,
    },
  },
}

export const Address = Template.bind({})
Address.args = {
  addressData: {
    address: 'Москва',
  },
  city: {
    name: 'Москва',
    bbox: {
      bbox1_latitude: 56.030469,
      bbox1_longitude: 36.67416,
      bbox2_latitude: 55.07298,
      bbox2_longitude: 38.047451,
    },
  },
}
