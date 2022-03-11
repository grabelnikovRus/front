import { Story, Meta } from '@storybook/react'

import { BannerApartmentSnippet, BannerApartmentSnippetProps } from './banner-apartment-snippet'

export default {
  title: 'widget/Banner Apartment Snippet',
  component: BannerApartmentSnippet,
} as Meta

const Template: Story<BannerApartmentSnippetProps> = (args) => (
  <BannerApartmentSnippet {...args} />
)
export const Banner = Template.bind({})
Banner.args = {
  fields: {
    title: {
      value: 'Скидка 6% или ипотека 6% при продаже квартиры',
      widgetType: 'text',
    },
  },
}
