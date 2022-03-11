import { Story, Meta } from '@storybook/react'

import { HowItWorks, HowItWorksProps } from './how-it-works'

export default {
  title: 'widget/HowItWorks',
  component: HowItWorks,
} as Meta

const Template: Story<HowItWorksProps> = (args) => <HowItWorks {...args} />

export const HowItWorksStory = Template.bind({})
HowItWorksStory.args = {
  fields: {
    description: {
      widgetType: 'text',
      value:
        'Переведём всю стоимость квартиры на аккредитив в день сделки. Заберите их в банке сразу после перехода права собственности',
    },
    features: {
      widgetType: 'stack',
      stack: [
        {
          description: {
            widgetType: 'text',
            value:
              'Оставьте заявку, мы рассчитаем стоимость квартиры и предложим вам честную цену',
          },
          title: {
            widgetType: 'text',
            value: 'Выбор квартиры',
          },
          icon: { widgetType: 'text', value: 'hand-pen' },
        },
        {
          description: {
            widgetType: 'text',
            value: 'Проведём юридическую проверку за 2 часа',
          },
          title: {
            widgetType: 'text',
            value: 'Проверим документы',
          },
          icon: { widgetType: 'text', value: 'hand-victory' },
        },
        {
          description: {
            widgetType: 'text',
            value: 'Зафиксируем цену и порядок действий',
          },
          title: {
            widgetType: 'text',
            value: 'Согласуем цену и условия',
          },
          icon: { widgetType: 'text', value: 'envelope' },
        },
        {
          description: {
            widgetType: 'text',
            value: 'Поможем собрать документы и проконсультируем по всем вопросам',
          },
          title: {
            widgetType: 'text',
            value: 'Подпишем договор',
          },
          icon: { widgetType: 'text', value: 'rocket' },
        },
        {
          description: {
            widgetType: 'text',
            value: 'Откроем в банке аккредитив на всю стоимость квартиры',
          },
          title: {
            widgetType: 'text',
            value: 'Переведём деньги',
          },
          icon: { widgetType: 'text', value: 'mountain' },
        },
        {
          description: {
            widgetType: 'text',
            value:
              'Сами направим и заберём документы из Росреестра. Раскройте аккредитив и получите деньги',
          },
          title: {
            widgetType: 'text',
            value: 'Зарегистрируем право собственности',
          },
          icon: { widgetType: 'text', value: 'hand-money' },
        },
        {
          description: {
            widgetType: 'text',
            value:
              'Зарегистрируйтесь на нашем сайте, чтобы мы могли создать для вас личный кабинет',
          },
          title: { widgetType: 'text', value: 'Заполните' },
          icon: { widgetType: 'text', value: 'hand-ok' },
        },
      ],
    },
    icon: {
      widgetType: 'text',
      value: '😉',
    },
    title: {
      widgetType: 'text',
      value: 'Деньги — сразу',
    },
    uptitle: {
      widgetType: 'text',
      value: 'Как это работает?',
    },
  },
}
