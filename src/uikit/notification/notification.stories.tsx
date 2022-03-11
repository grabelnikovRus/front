import { Meta, Story } from '@storybook/react'
import { VFC } from 'react'
import { useToggle } from 'react-use'

import { BannerModalProps } from '@/widgets/banner-modal/banner-modal'
import { BannerModalStory } from '@/widgets/banner-modal/banner-modal.stories'

import { Notification, NotificationProps } from './notification'

export default {
  title: 'uikit/Notification',
  component: Notification,
} as Meta

const Template: Story<NotificationProps> = (args) => {
  const [isOpen, toggleIsOpen] = useToggle(true)

  return (
    <>
      <button onClick={toggleIsOpen}>open</button>
      <Notification {...args} isOpen={isOpen} onClose={toggleIsOpen} />
    </>
  )
}

const Description: VFC = () => (
  <div>
    Вы записаны на просмотр <br />
    <strong>8 июля в 20:00</strong>
  </div>
)

export const Default = Template.bind({})
Default.args = {
  mode: 'SUCCESS',
  image: 'https://via.placeholder.com/240x285.png',
  title: 'Заявка успешно отправлена',
}

export const Error = Template.bind({})
Error.args = {
  mode: 'ERROR',
  image: 'https://via.placeholder.com/240x285.png',
  title: 'Что-то пошло не так',
  description: `Произошла ошибка, попробуйте повторить позже`,
  closeButtonText: 'Ясно',
}

export const CustomDescription = Template.bind({})
CustomDescription.args = {
  mode: 'SUCCESS',
  image: 'https://via.placeholder.com/240x285.png',
  title: 'Готово',
  description: Description,
}

const element = <BannerModalStory {...(BannerModalStory.args as BannerModalProps)} />

export const Banner = Template.bind({})
Banner.args = {
  mode: 'SUCCESS',
  image: 'https://via.placeholder.com/240x285.png',
  title: 'Готово',
  description: 'Менеджер скоро свяжется с вами и назначит дату и время просмотра',
  banner: element,
}
