import { Dialog, Transition } from '@headlessui/react'
import cn from 'classnames'
import { useRef, VFC, ReactNode, Children } from 'react'

import { Button, SvgClose, ButtonIcon } from '@/uikit'

import styles from './popup-history.module.scss'

interface PopupHistoryProps {
  children: ReactNode
  isMobileScreen: boolean
  isOpen: boolean
  onClose: () => void
}

export const PopupHistory: VFC<PopupHistoryProps> = ({
  children,
  isOpen,
  isMobileScreen,
  onClose,
}) => {
  const confirmButtonRef = useRef(null)

  const [info, ...history] = Children.toArray(children)

  return (
    <div className={styles.container}>
      <div
        className={cn(styles.info, {
          [styles.info___popup_open]: isOpen,
        })}
      >
        {info}
      </div>
      {isMobileScreen ? (
        <Dialog
          open={isOpen}
          as="div"
          className={styles.popup}
          onClose={() => null}
          initialFocus={confirmButtonRef}
        >
          <Dialog.Title className={styles.popup_header}>
            История квартиры{' '}
            <ButtonIcon
              onClick={onClose}
              innerRef={confirmButtonRef}
              className={styles.popup_close}
            >
              <SvgClose />
            </ButtonIcon>
          </Dialog.Title>
          <Dialog.Description className={styles.popup_body}>{children}</Dialog.Description>
        </Dialog>
      ) : (
        <Transition
          show={isOpen}
          as="div"
          enterFrom={styles.transition___closed}
          enterTo={styles.transition___open}
          leaveFrom={styles.transition___open}
          leaveTo={styles.transition___closed}
        >
          {history}
        </Transition>
      )}
      <Button onClick={onClose} className={styles.btn}>
        {isOpen ? 'Свернуть историю квартиры' : 'Смотреть полностью'}
      </Button>
    </div>
  )
}
