import { Story, Meta } from '@storybook/react'

import { EntryForm, EntryFormProps } from './entry-form'

export default {
  title: 'widget/Entry Form',
  component: EntryForm,
} as Meta

const Template: Story<EntryFormProps> = (args) => <EntryForm {...args} />

export const Entry = Template.bind({})
Entry.args = {
  isExchangeMax: true,
  pageSlug: 'dd',
  fields: {
    address_placeholder: {
      widgetType: 'text',
      value: 'Введите адрес',
    },
    description: {
      widgetType: 'text',
      value:
        'Купим вашу квартиру на 4% дороже рынка, продадим квартиру от ПИК-Брокер в ипотеку 6% или со скидкой 6%',
    },
    features: {
      widgetType: 'stack',
      stack: [
        {
          title: {
            widgetType: 'text',
            value: 'Дороже рынка на 4%',
          },
        },
        {
          title: {
            widgetType: 'text',
            value: 'Ипотека 6%',
          },
        },
        {
          title: {
            widgetType: 'text',
            value: 'Или скидка 6%',
          },
        },
        {
          title: {
            widgetType: 'text',
            value: 'Один визит в офис',
          },
        },
      ],
    },
    subtitle: {
      widgetType: 'text',
      value: 'Обмен MAX – возможность выгодно и просто обменять недвижимость',
    },
    textBtn: {
      widgetType: 'text',
      value: 'Войти в кабинет',
    },
    title: {
      widgetType: 'text',
      value: 'Обмен MAX',
    },
  },
}
