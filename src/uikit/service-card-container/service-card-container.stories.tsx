/* eslint-disable no-use-before-define */
import { Story, Meta } from '@storybook/react'

import { SellServiceCard } from '@/uikit'

import { ServiceCardContainer, ServiceCardContainerProps } from './service-card-container'

import styles from '../../../config/storybook/storybook-container.module.scss'

export default {
  title: 'uikit/ServiceCardContainer',
  component: ServiceCardContainer,
  decorators: [
    (Story) => (
      <div className={styles.container}>
        <Story />
      </div>
    ),
  ],
} as Meta

const cardListSell = [
  {
    title: 'Сопровождение сделки',
    icon: 'escort',
  },
  {
    title: 'Оценка \n квартиры',
    icon: 'valueApartment',
  },
  {
    title: 'Переезд \n и клининг',
    icon: 'bag',
  },
  {
    title: 'Трейд-ин на новостройку',
    icon: 'arrows',
  },
]

const Template: Story<ServiceCardContainerProps> = (args) => (
  <ServiceCardContainer {...Colum4.args}>
    {cardListSell.map(({ title, icon }) => (
      <SellServiceCard key={title} title={title} icon={icon} />
    ))}
  </ServiceCardContainer>
)

export const Colum4 = Template.bind({})
Colum4.args = {
  col: 4,
}
