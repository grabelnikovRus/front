import { Story, Meta } from '@storybook/react'

import { apartment } from '@/modules/apartment/apartment.mock'

import { ApartmentHistory, ApartmentHistoryProps } from './apartment-history'

export default {
  title: 'component/ApartmentPage/History',
  component: ApartmentHistory,
} as Meta

const Template: Story<ApartmentHistoryProps> = (args) => (
  <ApartmentHistory amoHistory={args.amoHistory} housingType={args.housingType} />
)

export const Info = Template.bind({})
Info.args = apartment
