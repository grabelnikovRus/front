import { Story, Meta } from '@storybook/react'

import { Faq, FaqProps } from './faq'

import styles from '../../../config/storybook/storybook-container.module.scss'

export default {
  title: 'widget/FaqList',
  component: Faq,
  decorators: [
    (Story) => (
      <div className={styles.container_faq}>
        <Story />
      </div>
    ),
  ],
  argTypes: { mode: ['sell', 'buy'] },
  parameters: {
    backgrounds: {
      default: 'default',
      values: [
        { name: 'default', value: '#ffffff' },
        { name: 'gray', value: '#cccccc' },
      ],
    },
  },
} as Meta

const Template: Story<FaqProps> = (args) => <Faq {...args} />

export const FaqSell = Template.bind({})
FaqSell.args = {
  fields: {
    heading: {
      value: 'Вопрос - ответ',
      widgetType: 'text',
    },
    questions: {
      widgetType: 'stack',
      stack: [
        {
          answer: {
            widgetType: 'text',
            value:
              'Пришлите нам  весь пакет запрашиваемых документов на электронную почту или их фотографии в мессенджер, например WhatsApp. Мы проверим их в рабочее время: c 10:00 до 19:00, кроме выходных и праздничных дней. Вся проверка займет не более 2 часов.',
          },
          question: {
            value: 'Как узнать, подходит ли моя квартира для продажи?',
            widgetType: 'text',
          },
        },
        {
          answer: {
            widgetType: 'text',
            value:
              'Оцениваем квартиры с помощью алгоритма: программа учитывает ситуацию на рынке, стоимость схожих квартир и ещё 20 параметров — всё, чтобы предложить вам честную цену.',
          },
          question: {
            value: 'Сколько длится юридическая проверка?',
            widgetType: 'text',
          },
        },
        {
          answer: {
            widgetType: 'text',
            value:
              'Оцениваем квартиру, проверяем документы, заключаем договор, регистрируем право собственности — вам остаётся только забрать деньги в банке.',
          },
          question: {
            value: 'Как оцениваете квартиры?',
            widgetType: 'text',
          },
        },
      ],
    },
  },
}
