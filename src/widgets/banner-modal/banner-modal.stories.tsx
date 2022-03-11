import { Story, Meta } from '@storybook/react'

import { BannerModal, BannerModalProps } from './banner-modal'

export default {
  title: 'widget/Banner Modal',
  component: BannerModal,
} as Meta

const Template: Story<BannerModalProps> = (args) => <BannerModal {...args} />
export const BannerModalStory = Template.bind({})
BannerModalStory.args = {
  fields: {
    title: {
      value: 'Ипотека 6% или скидка 4%',
      widgetType: 'text',
    },
    description: {
      value: 'Продайте свою квартиру и покупка этой будет еще выгоднее с услугой Обмен Max',
      widgetType: 'text',
    },
    textButton: {
      value: 'Оставить заявку',
      widgetType: 'text',
    },
  },
}
