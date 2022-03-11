import { Story, Meta } from '@storybook/react'

import { ApartmentEntity } from '@/modules/apartment'
import { apartment } from '@/modules/apartment/apartment.mock'

import { ApartmentMapSwitch } from './apartment-map-switch'

export default {
  title: 'component/ApartmentPage/MapSwitch',
  component: ApartmentMapSwitch,
} as Meta

const Template: Story<ApartmentEntity['address']> = (args) => <ApartmentMapSwitch {...args} />

export const Default = Template.bind({})
Default.args = apartment.address

export const WidthoutPanorama = Template.bind({})
WidthoutPanorama.args = {
  formatted: 'Москва, улица Архитектора Щусева 3',
  point: {
    latitude: 0,
    longitude: 0,
  },
}
