import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ReactNode, RefObject, VFC } from 'react'

import { BottomSheetContent, BottomSheetContainerProps } from './bottom-sheet-content'
import styles from './bottom-sheet.module.scss'

export interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  afterClose?: () => void
  initialFocus?: RefObject<HTMLElement>
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

export const BottomSheet: VFC<BottomSheetProps> & {
  Container: VFC<BottomSheetContainerProps>
  Title: VFC<Title>
  Description: VFC<Description>
} = ({ isOpen, onClose, afterClose, initialFocus, children }) => (
  <Transition show={isOpen} as={Fragment} afterLeave={afterClose}>
    <Dialog className={styles.bottom_sheet} onClose={onClose} initialFocus={initialFocus}>
      <Transition.Child
        as={Fragment}
        enterFrom={styles.bottom_sheet_overlay___closed}
        enterTo={styles.bottom_sheet_overlay___open}
        leaveFrom={styles.bottom_sheet_overlay___open}
        leaveTo={styles.bottom_sheet_overlay___closed}
      >
        <Dialog.Overlay className={styles.bottom_sheet_overlay} />
      </Transition.Child>
      <Transition.Child
        as={Fragment}
        enterFrom={styles.bottom_sheet_content___closed}
        enterTo={styles.bottom_sheet_content___open}
        leaveFrom={styles.bottom_sheet_content___open}
        leaveTo={styles.bottom_sheet_content___closed}
      >
        {children}
      </Transition.Child>
    </Dialog>
  </Transition>
)

BottomSheet.Container = BottomSheetContent
BottomSheet.Title = Title
BottomSheet.Description = Description
