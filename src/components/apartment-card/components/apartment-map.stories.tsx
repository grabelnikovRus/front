import { Story, Meta } from '@storybook/react'
import { YMaps } from 'react-yandex-maps'

import { config } from '@/config'
import { ApartmentEntity } from '@/modules/apartment'
import { apartment } from '@/modules/apartment/apartment.mock'

import { ApartmentMap } from './apartment-map'

export default {
  title: 'component/ApartmentPage/Map',
  component: ApartmentMap,
} as Meta

const Template: Story<ApartmentEntity['address']> = (ags) => (
  <YMaps query={{ apikey: config.ymapsApiKey, load: 'package.full' }}>
    <ApartmentMap address={ags} />
  </YMaps>
)

export const Default = Template.bind({})
Default.args = apartment.address
