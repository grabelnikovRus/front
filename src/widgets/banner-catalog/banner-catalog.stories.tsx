import { Story, Meta } from '@storybook/react'

import { BannerCatalog, BannerCatalogProps } from './banner-catalog'

export default {
  title: 'widget/Banner Catalog',
  component: BannerCatalog,
} as Meta

const Template: Story<BannerCatalogProps> = (args) => <BannerCatalog {...args} />
export const Banner = Template.bind({})
Banner.args = {
  fields: {
    title: {
      value: 'Купите выгодно',
      widgetType: 'text',
    },
    subtitle: {
      value: 'Гарантированная ставка по ипотеке 6,5% или скидка 3% на новую квартиру',
      widgetType: 'text',
    },
    description: {
      value: 'С услугой Обмен MAX еще выгоднее – купите квартиру в ипотеку 6% или со скидкой 4%',
      widgetType: 'text',
    },
    textButton: {
      value: 'Узнать подробнее',
      widgetType: 'text',
    },
    href: {
      value: '/',
      widgetType: 'text',
    },
  },
}
