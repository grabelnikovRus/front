import { Story, Meta } from '@storybook/react'

import { Container } from '@/uikit'

import { BannerApartment, BannerApartmentProps } from './banner-apartment'

export default {
  title: 'widget/Banner Apartment',
  component: BannerApartment,
} as Meta

const Template: Story<BannerApartmentProps> = (args) => (
  <Container>
    <BannerApartment {...args} />
  </Container>
)

export const Banner = Template.bind({})
Banner.args = {
  fields: {
    title: {
      value: 'Обменяйте старую квартиру на эту с помощью услуги Обмен МАХ',
      widgetType: 'text',
    },
    description: {
      value:
        'Купим вашу квартиру по рыночной цене, продадим эту квартиру в ипотеку 7,5% или со скидкой 3%',
      widgetType: 'text',
    },
    textButton: {
      value: 'Оценить свою квартиру',
      widgetType: 'text',
    },
  },
}
