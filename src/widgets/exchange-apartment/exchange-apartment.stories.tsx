import { Story, Meta } from '@storybook/react'

import { ExchangeApartment, ExchangeApartmentProps } from './exchange-apartment'

export default {
  title: 'widget/ExchangeApartment',
  component: ExchangeApartment,
} as Meta

const Template: Story<ExchangeApartmentProps> = (args) => <ExchangeApartment {...args} />

export const SliderOptions = Template.bind({})
SliderOptions.args = {
  fields: {
    mainTitle: { value: 'Обменяйте квартиру на выгодных условиях', widgetType: 'text' },
    subTitle: { value: 'Квартиры в новостройках от надежных застройщиков', widgetType: 'text' },
    firstTitle: { value: 'ПИК', widgetType: 'text' },
    secondTitle: { value: 'А101', widgetType: 'text' },
    thirdTitle: { value: 'Level Group', widgetType: 'text' },
    firstList: {
      stack: [
        {
          icon: {
            value: 'reversal',
            widgetType: 'text',
          },
          description: {
            value: 'Выгода до 1% на трейд-ин',
            widgetType: 'text',
          },
        },
        {
          icon: {
            value: 'wallet',
            widgetType: 'text',
          },
          description: {
            value: 'Квартиры от 3,7 млн рублей',
            widgetType: 'text',
          },
        },
        {
          icon: {
            value: 'key',
            widgetType: 'text',
          },
          description: {
            value: 'Более 80 жилых комплексов',
            widgetType: 'text',
          },
        },
        {
          icon: {
            value: 'clock',
            widgetType: 'text',
          },
          description: {
            value: 'Субсидированная ипотека',
            widgetType: 'text',
          },
        },
      ],
      widgetType: 'stack',
    },
    secondList: {
      stack: [
        {
          icon: {
            value: 'reversal',
            widgetType: 'text',
          },
          description: {
            value: 'Выгода до 1% на трейд-ин',
            widgetType: 'text',
          },
        },
        {
          icon: {
            value: 'wallet',
            widgetType: 'text',
          },
          description: {
            value: 'Квартиры от 3,7 млн рублей',
            widgetType: 'text',
          },
        },
        {
          icon: {
            value: 'key',
            widgetType: 'text',
          },
          description: {
            value: 'Более 80 жилых комплексов',
            widgetType: 'text',
          },
        },
        {
          icon: {
            value: 'clock',
            widgetType: 'text',
          },
          description: {
            value: 'Субсидированная ипотека',
            widgetType: 'text',
          },
        },
      ],
      widgetType: 'stack',
    },
    thirdList: {
      stack: [
        {
          icon: {
            value: 'reversal',
            widgetType: 'text',
          },
          description: {
            value: 'Выгода до 1% на трейд-ин',
            widgetType: 'text',
          },
        },
        {
          icon: {
            value: 'wallet',
            widgetType: 'text',
          },
          description: {
            value: 'Квартиры от 3,7 млн рублей',
            widgetType: 'text',
          },
        },
        {
          icon: {
            value: 'key',
            widgetType: 'text',
          },
          description: {
            value: 'Более 80 жилых комплексов',
            widgetType: 'text',
          },
        },
        {
          icon: {
            value: 'clock',
            widgetType: 'text',
          },
          description: {
            value: 'Субсидированная ипотека',
            widgetType: 'text',
          },
        },
      ],
      widgetType: 'stack',
    },
  },
}
