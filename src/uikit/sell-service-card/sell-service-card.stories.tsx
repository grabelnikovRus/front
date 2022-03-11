import { Story, Meta } from '@storybook/react'

import { SellServiceCard, SellServiceCardProps } from './sell-service-card'

export default {
  title: 'uikit/SellServiceCard',
  component: SellServiceCard,
  decorators: [
    (Story) => (
      <div style={{ width: '258px' }}>
        <Story />
      </div>
    ),
  ],
} as Meta

const Template: Story<SellServiceCardProps> = (args) => <SellServiceCard {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Сопровождение сделки',
  icon: 'escort',
}
