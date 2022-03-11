import { Transition } from '@headlessui/react'
import { Fragment, ReactNode, VFC } from 'react'

import { PopupDesktopContent, PopupDesktopContainerProps } from './popup-desktop-content'
import styles from './popup-desktop.module.scss'

interface PopupDesktopProps {
  isOpen: boolean
  children: ReactNode
}

interface Title {
  className?: string
  children: ReactNode
}

interface Description {
  className?: string
  children: ReactNode
}

const Title: VFC<Title> = ({ className, children }) => <h3 className={className}>{children}</h3>

const Description: VFC<Description> = ({ className, children }) => (
  <div className={className}>{children}</div>
)

export const PopupDesktop: VFC<PopupDesktopProps> & {
  Container: VFC<PopupDesktopContainerProps>
  Title: VFC<Title>
  Description: VFC<Description>
} = ({ isOpen, children }) => (
  <Transition
    show={isOpen}
    as={Fragment}
    enterFrom={styles.popup_desktop___closed}
    enterTo={styles.popup_desktop___open}
    leaveFrom={styles.popup_desktop___open}
    leaveTo={styles.popup_desktop___closed}
  >
    {children}
  </Transition>
)

PopupDesktop.Container = PopupDesktopContent
PopupDesktop.Title = Title
PopupDesktop.Description = Description
