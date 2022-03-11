import { Story, Meta } from '@storybook/react'

import { Nameplate, NameplateProps } from './nameplate'

export default {
  title: 'widget/Nameplate',
  component: Nameplate,
  parameters: { backgrounds: { default: 'dark' } },
} as Meta

const Template: Story<NameplateProps> = (args) => <Nameplate {...args} />

export const obj = {}

export const Default = Template.bind({})
Default.args = {
  fields: {
    description: {
      widgetType: 'text',
      value:
        'Обмен MAX – это услугапо обмену старой квартиры на недвижимость из каталога ПИК-Брокер',
    },
    clarification: {
      widgetType: 'text',
      value:
        'Продайте квартиру дороже рыночной стоимости на 4% и купите более подходящую в ипотеку под 6% годовых или со скидкой 6%',
    },
  },
}
