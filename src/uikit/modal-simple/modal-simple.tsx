import { Dialog, Transition } from '@headlessui/react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { Fragment, ReactNode, forwardRef, useRef, useEffect, useCallback, RefObject } from 'react'

import { useBrowserDetector } from '@/lib/use-browser-detector'
import { Button, SvgClose } from '@/uikit'

import styles from './modal-simple.module.scss'

export interface ModalSimpleProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  theme?: 'none' | 'fullScreen'
  focusRef?: RefObject<HTMLElement>
}

export const ModalSimple = forwardRef<HTMLDivElement, ModalSimpleProps>(
  ({ isOpen, onClose, children, theme = 'none', focusRef }, ref) => {
    const browser = useBrowserDetector()
    const { pathname } = useRouter()
    const completeButtonRef = useRef(null)

    const onPopState = useCallback(() => {
      onClose()
      window.history.forward()
    }, [onClose])

    useEffect(() => {
      if (['/catalog', '/catalog-map'].includes(pathname) && isOpen) {
        window.addEventListener('popstate', onPopState)
      }
      return () => window.removeEventListener('popstate', onPopState)
    }, [isOpen, onPopState, pathname])

    return (
      <Transition
        show={isOpen}
        as={Fragment}
        enterFrom={styles.modal___closed}
        enterTo={styles.modal___open}
        leaveFrom={styles.modal___open}
        leaveTo={styles.modal___closed}
      >
        <Dialog
          className={styles.modal}
          onClose={() => false}
          initialFocus={focusRef || completeButtonRef}
        >
          <Dialog.Overlay className={styles.modal_overlay} />
          {theme === 'none' && (
            <div className={styles.modal_container} ref={ref}>
              <div
                className={cn(styles.modal_body, {
                  [styles.modal_body___ios]: browser?.os === 'iOS',
                })}
              >
                <Button
                  innerRef={completeButtonRef}
                  externalStyles={styles.modal_close}
                  onClick={onClose}
                >
                  <SvgClose />
                </Button>
                <div className={styles.modal_content}>{children}</div>
              </div>
            </div>
          )}
          {theme === 'fullScreen' && children}
        </Dialog>
      </Transition>
    )
  },
)

ModalSimple.displayName = 'ModalSimple'
