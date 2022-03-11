import { Story, Meta } from '@storybook/react'

import { ApartmentEntity } from '@/modules/apartment'
import { apartment } from '@/modules/apartment/apartment.mock'

import { ApartmentArea } from './apartment-area'

export default {
  title: 'component/ApartmentPage/Area',
  component: ApartmentArea,
  parameters: { backgrounds: { default: 'light' } },
} as Meta

const Template: Story<ApartmentEntity> = (args) => <ApartmentArea {...args} />

export const Default = Template.bind({})
Default.args = apartment
