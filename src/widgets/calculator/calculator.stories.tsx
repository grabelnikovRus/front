import { Story, Meta } from '@storybook/react'

import { Calculator, CalculatorProps } from './calculator'

export default {
  title: 'widget/Calculator',
  component: Calculator,
} as Meta

const Template: Story<CalculatorProps> = (args) => <Calculator {...args} />

export const Default = Template.bind({})
Default.args = {
  apartmentId: 1,
  price: 1000000,
  userHasActiveDeals: true,
  fields: {
    text: {
      value: 'Предложение действует 4 дня до выхода на сделку после бронирования квартиры',
      widgetType: 'text',
    },
    textLink: {
      value: 'Подробнее',
      widgetType: 'text',
    },
    link: {
      value: 'https://kvarta.ru/',
      widgetType: 'text',
    },
  },
}
