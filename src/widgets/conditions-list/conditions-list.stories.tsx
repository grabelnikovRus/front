import { Story, Meta } from '@storybook/react'

import { WidgetFields } from '@/modules/widgets'

import { ConditionsList, ConditionsListProps } from './conditions-list'

export default {
  title: 'widget/Conditions List',
  component: ConditionsList,
} as Meta

const objInfo: WidgetFields = {
  firstTitle: {
    value: 'ПИК-Брокер это:',
    widgetType: 'text',
  },
  firstList: {
    widgetType: 'stack',
    stack: [
      {
        icon: {
          widgetType: 'text',
          value: '',
        },
        title: {
          widgetType: 'text',
          value: 'Сделки от 7 дней',
        },
      },
      {
        icon: {
          widgetType: 'text',
          value: '',
        },
        title: {
          widgetType: 'text',
          value: 'Без комиссии',
        },
      },
      {
        icon: {
          widgetType: 'text',
          value: '',
        },
        title: {
          widgetType: 'text',
          value: 'Процессы онлайн',
        },
      },
      {
        icon: {
          widgetType: 'text',
          value: '',
        },
        title: {
          widgetType: 'text',
          value: '2 сделки в один день',
        },
      },
    ],
  },
  secondTitle: {
    value: 'Условия выкупа:',
    widgetType: 'text',
  },
  secondList: {
    widgetType: 'stack',
    stack: [
      {
        icon: {
          widgetType: 'text',
          value: 'diagram',
        },
        title: {
          widgetType: 'text',
          value: 'На 4% дороже рыночной стоимости',
        },
      },
      {
        icon: {
          widgetType: 'text',
          value: 'wallet',
        },
        title: {
          widgetType: 'text',
          value: 'Купим за собственные средства',
        },
      },
      {
        icon: {
          widgetType: 'text',
          value: 'clock',
        },
        title: {
          widgetType: 'text',
          value: 'Бесплатная оценка за 20 минут',
        },
      },
      {
        icon: {
          widgetType: 'text',
          value: 'search',
        },
        title: {
          widgetType: 'text',
          value: 'Юридическая проверка за 2 часа',
        },
      },
    ],
  },
  thirdTitle: {
    value: 'Условия продажи: ',
    widgetType: 'text',
  },
  thirdList: {
    widgetType: 'stack',
    stack: [
      {
        icon: {
          widgetType: 'text',
          value: 'house',
        },
        title: {
          widgetType: 'text',
          value: 'Все квартиры – собственность ПИК-Брокер',
        },
      },
      {
        icon: {
          widgetType: 'text',
          value: 'shield',
        },
        title: {
          widgetType: 'text',
          value: 'Каждая квартира проверена',
        },
      },
      {
        icon: {
          widgetType: 'text',
          value: 'percent',
        },
        title: {
          widgetType: 'text',
          value: 'Скидка 6%',
        },
      },
      {
        icon: {
          widgetType: 'text',
          value: 'clock',
        },
        title: {
          widgetType: 'text',
          value: 'Ипотека 6%',
        },
      },
      {
        icon: {
          widgetType: 'text',
          value: 'list',
        },
        title: {
          widgetType: 'text',
          value: 'Гарантийный сертификат',
        },
      },
      {
        icon: {
          widgetType: 'text',
          value: 'flower',
        },
        title: {
          widgetType: 'text',
          value: 'Поможем переехать',
        },
      },
    ],
  },
}

const Template: Story<ConditionsListProps> = (args) => <ConditionsList {...args} />

export const Conditions = Template.bind({})
Conditions.args = { fields: objInfo }
