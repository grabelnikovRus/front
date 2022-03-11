import { Story, Meta } from '@storybook/react'

import { Features, FeaturesProps } from './features'

export default {
  title: 'widget/SellListItemOfParameters',
  component: Features,
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#ffffff' }],
    },
  },
} as Meta

const Template: Story<FeaturesProps> = (args) => <Features {...args} />

export const SellList = Template.bind({})
SellList.args = {
  fields: {
    heading: {
      value: 'Работаем с квартирами',
      widgetType: 'text',
    },
    features: {
      stack: [
        {
          icon: {
            value: 'wallet',
            widgetType: 'text',
          },
          title: {
            value: 'Цена',
            widgetType: 'text',
          },
          description: {
            value: 'до 25 млн руб',
            widgetType: 'text',
          },
        },
        {
          icon: {
            value: 'location',
            widgetType: 'text',
          },
          title: {
            value: 'Локация',
            widgetType: 'text',
          },
          description: {
            value: 'Москва и Мо',
            widgetType: 'text',
          },
        },
        {
          icon: {
            value: 'upDownButton',
            widgetType: 'text',
          },
          title: {
            value: 'Этажность',
            widgetType: 'text',
          },
          description: {
            value: 'от 5 этажей',
            widgetType: 'text',
          },
        },
        {
          icon: {
            value: 'calendar',
            widgetType: 'text',
          },
          title: {
            value: 'Год постройки',
            widgetType: 'text',
          },
          description: {
            value: 'от 1901 г',
            widgetType: 'text',
          },
        },
      ],
      widgetType: 'stack',
    },
  },
}
