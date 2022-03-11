import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ReactNode, RefObject, VFC } from 'react'

import {
  NotificationContainerDesktop,
  NotificationContainerDesktopProps,
} from './notification-container-desktop'

import styles from '../notification.module.scss'

interface Title {
  className?: string
  children: ReactNode
}

interface Description {
  className?: string
  children: ReactNode
}

interface NotificationDesktopProps {
  isOpen: boolean
  onClose: () => void
  afterClose: () => void
  initialFocus?: RefObject<HTMLElement>
  children: ReactNode
}

const Title: VFC<Title> = ({ className, children }) => (
  <Dialog.Title as="h3" className={className}>
    {children}
  </Dialog.Title>
)

const Description: VFC<Description> = ({ className, children }) => (
  <Dialog.Description as="div" className={className}>
    {children}
  </Dialog.Description>
)

export const NotificationDesktop: VFC<NotificationDesktopProps> & {
  Container: VFC<NotificationContainerDesktopProps>
  Title: VFC<Title>
  Description: VFC<Description>
} = ({ isOpen, onClose, afterClose, initialFocus, children }) => (
  <Transition appear show={isOpen} as={Fragment} afterLeave={afterClose}>
    <Dialog className={styles.notification} onClose={onClose} initialFocus={initialFocus}>
      <Transition.Child
        as={Fragment}
        enterFrom={styles.notification_overlay___closed}
        enterTo={styles.notification_overlay___open}
        leaveFrom={styles.notification_overlay___open}
        leaveTo={styles.notification_overlay___closed}
      >
        <Dialog.Overlay className={styles.notification_overlay} />
      </Transition.Child>

      <Transition.Child
        as={Fragment}
        enterFrom={styles.notification_container___closed}
        enterTo={styles.notification_container___open}
        leaveFrom={styles.notification_container___open}
        leaveTo={styles.notification_container___closed}
      >
        {children}
      </Transition.Child>
    </Dialog>
  </Transition>
)

NotificationDesktop.Container = NotificationContainerDesktop
NotificationDesktop.Title = Title
NotificationDesktop.Description = Description
