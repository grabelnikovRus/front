import { Story, Meta } from '@storybook/react'

import { LegalPurity, LegalPurityProps } from './legal-purity'

export default {
  title: 'widget/Legal purity',
  component: LegalPurity,
  parameters: { backgrounds: { default: 'dark' } },
} as Meta

const Template: Story<LegalPurityProps> = (args) => <LegalPurity {...args} />

export const Default = Template.bind({})
Default.args = {
  fields: {
    link: {
      value: '/guarantee',
      widgetType: 'text',
    },
    button: {
      value: 'Подробнее',
      widgetType: 'text',
    },
    features: {
      stack: [
        {
          icon: {
            value: 'clock',
            widgetType: 'text',
          },
          title: {
            value: 'Ипотека от 4.4%',
            widgetType: 'text',
          },
        },
        {
          icon: {
            value: 'key',
            widgetType: 'text',
          },
          title: {
            value: 'Собственность ПИК-Брокер',
            widgetType: 'text',
          },
        },
        {
          icon: {
            value: 'sofa',
            widgetType: 'text',
          },
          title: {
            value: 'Никто не живёт',
            widgetType: 'text',
          },
        },
        {
          icon: {
            value: 'person',
            widgetType: 'text',
          },
          title: {
            value: 'Никто не прописан',
            widgetType: 'text',
          },
        },
      ],
      widgetType: 'stack',
    },
  },
}
