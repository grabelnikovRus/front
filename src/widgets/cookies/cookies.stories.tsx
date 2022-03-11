import { Story, Meta } from '@storybook/react'

import { CookiesPopup, CookiesPopupProps } from '@/widgets'

export default {
  title: 'widget/CookiesPopup',
  component: CookiesPopup,
} as Meta

const Template: Story<CookiesPopupProps> = (args) => <CookiesPopup {...args} />

export const CookiesStory = Template.bind({})
CookiesStory.args = {
  fields: {
    button_name: {
      widgetType: 'text',
      value: 'Согласен',
    },
    text: {
      widgetType: 'text',
      value:
        'ПИК-Брокер использует файлы cookie для работы и совершенствования сервиса. Подробнее об этом можно узнать на странице <a draggable="false" href="${cookiesLegalPage}">информации о файлах cookie</a>',
    },
  },
}
