import { Dialog, Transition } from '@headlessui/react'
import { Fragment, MutableRefObject, ReactNode, useRef, useState, VFC } from 'react'

import styles from './modal.module.scss'

interface RenderButtonProps {
  isOpen: boolean
  openModal: () => void
}

interface RenderProps {
  ref: MutableRefObject<null>
  closeModal: () => void
}

export interface ModalProps {
  title: string
  renderButton: (props: RenderButtonProps) => ReactNode
  renderHeader: (props: RenderProps) => ReactNode
  children: ((props: RenderProps) => ReactNode) | ReactNode
}

export const Modal: VFC<ModalProps> = ({ title, renderHeader, renderButton, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  return (
    <>
      {renderButton({ isOpen, openModal })}

      <Transition
        show={isOpen}
        as={Fragment}
        enterFrom={styles.modal___closed}
        enterTo={styles.modal___open}
        leaveFrom={styles.modal___open}
        leaveTo={styles.modal___closed}
      >
        <Dialog className={styles.modal} onClose={closeModal} initialFocus={ref}>
          <Dialog.Overlay className={styles.modal_overlay} />

          <div className={styles.modal_container}>
            <div className={styles.modal_header}>{renderHeader({ ref, closeModal })}</div>
            <div className={styles.modal_body}>
              <Dialog.Title as="h3" className={styles.modal_title}>
                {title}
              </Dialog.Title>
              <div className={styles.modal_content}>
                {typeof children === 'function' ? children({ ref, closeModal }) : children}
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
