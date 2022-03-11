import { Story, Meta } from '@storybook/react'

import { apartments } from '@/modules/apartments-v1/apartments.mock'

import { ApartmentSnippet, ApartmentSnippetProps } from './apartment-snippet'

export default {
  title: 'component/Apartment Snippet',
  component: ApartmentSnippet,
} as Meta

const Template: Story<ApartmentSnippetProps> = (args) => <ApartmentSnippet {...args} />

const NarrowTemplate: Story<ApartmentSnippetProps> = (args) => (
  <div style={{ width: 390 }}>
    <ApartmentSnippet {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  apartment: apartments.apartments[0],
  contactPhoneNumber: '88005057401',
}

export const Narrow = NarrowTemplate.bind({})
Narrow.args = {
  apartment: apartments.apartments[0],
  contactPhoneNumber: '88005057401',
  placement: 'map',
}
