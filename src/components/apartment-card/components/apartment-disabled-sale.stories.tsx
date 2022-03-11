import { Story, Meta } from '@storybook/react'

import { ApartmentDisabledSale } from './apartment-disabled-sale'

export default {
  title: 'component/ApartmentPage/Disabled Sale',
  component: ApartmentDisabledSale,
  parameters: { backgrounds: { default: 'light' } },
} as Meta

const Template: Story = () => <ApartmentDisabledSale />

export const Default = Template.bind({})
Default.args = {}
