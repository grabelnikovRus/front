import { Story, Meta } from '@storybook/react'

import { ApartmentEntity } from '@/modules/apartment'
import { apartment } from '@/modules/apartment/apartment.mock'

import { ApartmentInfo } from './apartment-info'

export default {
  title: 'component/ApartmentPage/Info',
  component: ApartmentInfo,
} as Meta

const Template: Story<ApartmentEntity> = (args) => <ApartmentInfo {...args} indexPlan={1} />

export const Info = Template.bind({})
Info.args = apartment
