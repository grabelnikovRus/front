import { Story, Meta } from '@storybook/react'

import { WidgetFields } from '@/modules/widgets'

import { ListInfo, ListInfoProps } from './list-info'

export default {
  title: 'widget/List Info',
  component: ListInfo,
} as Meta

const objInfo: WidgetFields = {
  features: {
    stack: [
      {
        icon: {
          value: 'clock',
          widgetType: 'text',
        },
        title: {
          value: 'Ипотека 7,5% или скидка 2%',
          widgetType: 'text',
        },
      },
      {
        icon: {
          value: 'home',
          widgetType: 'text',
        },
        title: {
          value: 'Собственность Кварта',
          widgetType: 'text',
        },
      },
      {
        icon: {
          value: 'shield',
          widgetType: 'text',
        },
        title: {
          value: 'Юридическая чистота',
          widgetType: 'text',
        },
      },
      {
        icon: {
          value: 'percent',
          widgetType: 'text',
        },
        title: {
          value: 'Без комиссии',
          widgetType: 'text',
        },
      },
    ],
    widgetType: 'stack',
  },
}

const Template: Story<ListInfoProps> = (args) => <ListInfo {...args} />

export const List = Template.bind({})
List.args = {
  fields: objInfo,
}
