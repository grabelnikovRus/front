import { Story, Meta } from '@storybook/react'

import { LeadApartment, LeadApartmentProps } from './lead-apartment'

export default {
  title: 'component/LeadApartment',
  component: LeadApartment,
} as Meta

const Template: Story<LeadApartmentProps> = (args) => <LeadApartment {...args} />

export const ApartmentCardStory = Template.bind({})
ApartmentCardStory.args = {
  amoId: 153868,
}
