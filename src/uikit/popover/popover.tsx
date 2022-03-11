import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ReactNode, useState, VFC } from 'react'
import { usePopper } from 'react-popper'

import { useMediaSmallScreen } from '@/lib/use-media'

import styles from './popover.module.scss'

interface RenderButtonProps {
  isOpen: boolean
  openModal: () => void
  buttonRef: (element: HTMLButtonElement) => void
}

interface RenderHeaderProps {
  closeModal: () => void
}

export interface PopoverProps {
  title: string
  renderButton: (props: RenderButtonProps) => ReactNode
  renderHeader: (props: RenderHeaderProps) => ReactNode
  children: ReactNode
}

type PopperOptions = Parameters<typeof usePopper>[2]

const popperOptions: PopperOptions = {
  placement: 'bottom-end',
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [24, 16],
      },
    },
    {
      name: 'preventOverflow',
      options: {
        altAxis: true,
      },
    },
  ],
}

export const Popover: VFC<PopoverProps> = ({ title, renderHeader, renderButton, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement>()
  const [popperElement, setPopperElement] = useState<HTMLDivElement>()
  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    popperOptions,
  )

  const isSmallScreen = useMediaSmallScreen()

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  return (
    <>
      {renderButton({ isOpen, openModal, buttonRef: setReferenceElement })}

      <Transition
        show={isOpen}
        as={Fragment}
        enterFrom={styles.popover___closed}
        enterTo={styles.popover___open}
        leaveFrom={styles.popover___open}
        leaveTo={styles.popover___closed}
      >
        <Dialog className={styles.popover} onClose={closeModal}>
          <Dialog.Overlay className={styles.popover_overlay} />

          <div
            ref={setPopperElement as (element: HTMLDivElement) => void}
            className={styles.popover_container}
            style={isSmallScreen ? {} : popperStyles.popper}
            {...attributes.popper}
          >
            <div className={styles.popover_header}>{renderHeader({ closeModal })}</div>
            <div className={styles.popover_body}>
              <Dialog.Title as="h3" className={styles.popover_title}>
                {title}
              </Dialog.Title>
              <div className={styles.popover_content}>{children}</div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
