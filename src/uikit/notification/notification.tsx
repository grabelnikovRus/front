import cn from 'classnames'
import { ReactNode, useRef, VFC } from 'react'

import { useMediaSmallScreen } from '@/lib/use-media'
import { BottomSheet } from '@/uikit/bottom-sheet/bottom-sheet'
import { Button } from '@/uikit/button/button'

import { NotificationDesktop } from './components/notification-desktop'
import styles from './notification.module.scss'

export interface NotificationProps {
  mode: 'SUCCESS' | 'ERROR'
  isOpen: boolean
  image: string
  title: string
  description?: ReactNode
  banner?: ReactNode
  closeButtonText?: string
  onClose: () => void
  afterClose: () => void
}

export const Notification: VFC<NotificationProps> = ({
  mode,
  isOpen,
  image,
  title,
  description,
  banner,
  closeButtonText = 'Хорошо',
  onClose,
  afterClose,
}) => {
  const confirmButtonRef = useRef(null)
  const isSmallScreen = useMediaSmallScreen()

  const NotificationComponent = isSmallScreen ? BottomSheet : NotificationDesktop

  return (
    <NotificationComponent
      isOpen={isOpen}
      onClose={onClose}
      afterClose={afterClose}
      initialFocus={confirmButtonRef}
    >
      <NotificationComponent.Container
        isOpen={isOpen}
        onClose={onClose}
        className={styles.notification_container}
      >
        <div className={styles.notification_content}>
          <img className={styles.notification_image} src={image} alt="" />
          <NotificationComponent.Title
            className={cn(styles.notification_title, {
              [styles.notification_title___success]: mode === 'SUCCESS',
              [styles.notification_title___error]: mode === 'ERROR',
            })}
          >
            {title}
          </NotificationComponent.Title>
          <NotificationComponent.Description className={styles.notification_description}>
            {description}
            {banner && <div className={styles.notification_banner}>{banner}</div>}
          </NotificationComponent.Description>
          <Button
            externalStyles={cn(styles.notification_button, {
              [styles.notification_button___hide]: banner,
            })}
            size="large"
            onClick={onClose}
            innerRef={confirmButtonRef}
          >
            {closeButtonText}
          </Button>
        </div>
      </NotificationComponent.Container>
    </NotificationComponent>
  )
}
