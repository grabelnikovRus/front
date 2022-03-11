import { Story, Meta } from '@storybook/react'

import { ExchangeMax, ExchangeMaxProps } from './exchange-max'

export default {
  title: 'widget/ExchangeMax',
  component: ExchangeMax,
} as Meta

const Template: Story<ExchangeMaxProps> = (args) => (
  <div style={{ paddingTop: '40px' }}>
    <ExchangeMax {...args} />
  </div>
)

export const SliderOptions = Template.bind({})
SliderOptions.args = {
  fields: {
    title: {
      value: 'Обмен MAX',
      widgetType: 'text',
    },
    subTitle: {
      value: 'Обмен MAX – возможность выгодно и просто обменять недвижимость',
      widgetType: 'text',
    },
    description: {
      value:
        'Купим вашу квартиру на 4% дороже рынка, продадим квартиру  от Кварта в ипотеку 6%  или со скидкой 4%',
      widgetType: 'text',
    },
    button: {
      value: 'Выбрать квартиру',
      widgetType: 'text',
    },
  },
}
