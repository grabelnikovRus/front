import { Story, Meta } from '@storybook/react'
import { YMaps } from 'react-yandex-maps'

import { config } from '@/config'

import { ApartmentPanorama, ApartmentPanoramaProps } from './apartment-panorama'

export default {
  title: 'component/ApartmentPage/Panorama',
  component: ApartmentPanorama,
} as Meta

const Template: Story<ApartmentPanoramaProps> = (args) => (
  <div id="player" style={{ height: 500, boxSizing: 'content-box' }}>
    <YMaps query={{ apikey: config.ymapsApiKey, load: 'package.full' }}>
      <ApartmentPanorama {...args} />
    </YMaps>
  </div>
)

export const Default = Template.bind({})
Default.args = {
  coordinates: [55.733685, 37.588264],
  isShowPanorama: true,
}
