import { Story, Meta } from '@storybook/react'

import { apartment } from '@/modules/apartment/apartment.mock'

import { ApartmentOptions, ApartmentOptionsProps } from './apartment-options'

export default {
  title: 'component/ApartmentPage/Options',
  component: ApartmentOptions,
} as Meta

const Template: Story<ApartmentOptionsProps> = (args) => <ApartmentOptions {...args} />

export const Default = Template.bind({})
Default.args = {
  apartment,
}
