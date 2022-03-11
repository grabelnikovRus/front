import { Story, Meta } from '@storybook/react'

import { useMediaSmallScreen } from '@/lib/use-media'
import { Button } from '@/uikit'

import { Popover, PopoverProps } from './popover'

export default {
  title: 'uikit/Popover',
  component: Popover,
} as Meta

const Template: Story<PopoverProps> = (args) => (
  <div
    style={{
      position: 'fixed',
      top: '20%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
  >
    <Popover {...args}>
      <div style={{ gap: 16, display: 'flex', flexFlow: 'column' }}>
        <Button mode="secondary">Отправить код ещё раз</Button>
        <Button mode="back">Изменить номер телефона</Button>
      </div>
    </Popover>
  </div>
)

const PopoverHeader: PopoverProps['renderHeader'] = ({ closeModal }) => {
  const isSmallScreen = useMediaSmallScreen()
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {isSmallScreen && <div>logo</div>}
      <button onClick={closeModal}>Х</button>
    </div>
  )
}

const PopoverButton: PopoverProps['renderButton'] = ({ isOpen, openModal, buttonRef }) => (
  <Button innerRef={buttonRef} onClick={openModal}>
    {isOpen ? 'Закрыть' : 'Открыть'}
  </Button>
)

export const Default = Template.bind({})
Default.args = {
  title: 'Вход в кабинет',
  renderHeader: PopoverHeader,
  renderButton: PopoverButton,
}
