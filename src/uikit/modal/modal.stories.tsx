import { Story, Meta } from '@storybook/react'

import { useMediaSmallScreen } from '@/lib/use-media'
import { SvgClose, ButtonIcon, Button } from '@/uikit'

import { Modal, ModalProps } from './modal'

export default {
  title: 'uikit/Modal',
  component: Modal,
} as Meta

const Template: Story<ModalProps> = (args) => (
  <div
    style={{
      position: 'fixed',
      top: '20%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
  >
    <Modal {...args}>
      <form style={{ gap: 16, display: 'flex', flexFlow: 'column' }}>
        <Button type="submit">Записаться на просмотр</Button>
      </form>
    </Modal>
  </div>
)

const ModalHeader: ModalProps['renderHeader'] = ({ closeModal }) => {
  const isSmallScreen = useMediaSmallScreen()
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {isSmallScreen && <div>logo</div>}
      <ButtonIcon mode={isSmallScreen ? 'transparent' : 'opaque'} onClick={closeModal}>
        <SvgClose />
      </ButtonIcon>
    </div>
  )
}

const ModalButton: ModalProps['renderButton'] = ({ openModal }) => (
  <Button onClick={openModal}>Записаться</Button>
)

export const Default = Template.bind({})
Default.args = {
  title: 'Записаться на просмотр',
  renderHeader: ModalHeader,
  renderButton: ModalButton,
}
