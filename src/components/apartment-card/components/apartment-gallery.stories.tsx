import { Story, Meta } from '@storybook/react'

import { Container } from '@/uikit'

import { ApartmentGallery, ApartmentGalleryProps } from './apatrment-gallery'

import { apartment } from '../../../modules/apartment/apartment.mock'

export default {
  title: 'component/ApartmentPage/Gallery',
  component: ApartmentGallery,
} as Meta

const Template: Story<ApartmentGalleryProps> = (args) => (
  <Container>
    <ApartmentGallery {...args} />
  </Container>
)

export const Default = Template.bind({})
Default.args = {
  isSmallerFivePhoto: false,
  images: apartment.images,
  housingComplex: apartment.housingComplex,
  amoId: apartment.amoId,
}

export const FewPhoto = Template.bind({})
FewPhoto.args = {
  isSmallerFivePhoto: true,
  images: apartment.images,
  housingComplex: apartment.housingComplex,
  amoId: apartment.amoId,
}
