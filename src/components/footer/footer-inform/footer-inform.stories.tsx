import { Story, Meta } from '@storybook/react'

import { FooterInform, FooterInfromProps } from './footer-inform'

export default {
  title: 'component/Footer inform',
  component: FooterInform,
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#ffffff' }],
    },
  },
} as Meta

const Template: Story<FooterInfromProps> = (args) => <FooterInform {...args} />

export const Default = Template.bind({})
Default.args = {
  fields: {
    cards: {
      stack: [
        {
          title: {
            value: 'Рефинансирование',
            widgetType: 'text',
          },
          description: {
            value: 'Снизим платёж, увеличим сумму, объединим кредиты',
            widgetType: 'text',
          },
          btnLink: {
            value: 'Refinance.kvarta.ru',
            widgetType: 'text',
          },
          btnTitle: {
            value: 'Подробнее',
            widgetType: 'text',
          },
        },
        {
          title: {
            value: 'Застройщикам',
            widgetType: 'text',
          },
          description: {
            value: 'Настроим онлайн продажи недвижимости',
            widgetType: 'text',
          },
          btnLink: {
            value: 'B2b.kvarta.ru',
            widgetType: 'text',
          },
          btnTitle: {
            value: 'Подробнее',
            widgetType: 'text',
          },
        },
      ],
      widgetType: 'stack',
    },
  },
}

export const OneElement = Template.bind({})
OneElement.args = {
  fields: {
    cards: {
      stack: [
        {
          title: {
            value: 'Застройщикам',
            widgetType: 'text',
          },
          description: {
            value: 'настроим онлайн продажи недвижимости',
            widgetType: 'text',
          },
          btnLink: {
            value: 'Refinance.kvarta.ru',
            widgetType: 'text',
          },
          btnTitle: {
            value: 'Подробнее',
            widgetType: 'text',
          },
        },
      ],
      widgetType: 'stack',
    },
  },
}
