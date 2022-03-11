import { FocusTrap } from '@headlessui/react'
import cn from 'classnames'
import { forwardRef, ReactNode, TouchEvent, useState } from 'react'

import { useMenuMobile } from '@/components/menu-mobile/use-menu-mobile.hook'
import { useBodyScrollLock } from '@/lib/use-body-scroll-lock'

import styles from './bottom-sheet.module.scss'

export interface BottomSheetContainerProps {
  isOpen: boolean
  className?: string
  classNameWrapper?: string
  onClose: () => void
  children: ReactNode
}

const blurActiveElement = () => {
  const element = document.activeElement
  if (element instanceof HTMLInputElement) {
    element.blur()
  }
}

export const BottomSheetContent = forwardRef<HTMLDivElement, BottomSheetContainerProps>(
  function PopupContainerMobile(
    { className, classNameWrapper, isOpen, onClose, children },
    contentRef,
  ) {
    if (typeof contentRef !== 'object' || contentRef === null) {
      throw Error(`Unexpected ref type in BottomSheetContent: ${typeof contentRef}`)
    }

    useBodyScrollLock(isOpen, contentRef)

    const [delta, setDelta] = useState(0)
    const [initialHeight, setInitialHeight] = useState(0)

    const handleTouchStart = () => {
      const { current } = contentRef
      if (current === null) return

      blurActiveElement()

      if (current) {
        setInitialHeight(current.clientHeight)
        current.style.height = `${current.clientHeight}px`
        current.style.transition = '0s'
        current.style.maxHeight = 'none'
      }
    }

    const { isOpenFilterCatalog } = useMenuMobile()

    const handleTouchMove = (event: TouchEvent<HTMLButtonElement>) => {
      const { current } = contentRef
      if (current === null) return

      const { touches } = event
      const windowHeight = window.innerHeight
      const newHeight = windowHeight - touches[0].clientY
      const newDelta = newHeight - initialHeight

      if (delta > 0) {
        current.style.height = `${newHeight}px`
        current.style.removeProperty('bottom')
      } else {
        current.style.bottom = `${delta}px`
        current.style.height = `${initialHeight}px`
      }
      setDelta(newDelta)
    }

    const handleTouchEnd = () => {
      const { current } = contentRef
      if (current === null) return

      current.style.removeProperty('transition')
      current.style.removeProperty('maxHeight')
      if (delta < -100) {
        onClose()
      } else {
        current.style.removeProperty('bottom')
        current.style.height = `${initialHeight}px`
      }
    }

    return (
      <FocusTrap initialFocus={contentRef}>
        <div
          className={cn(styles.bottom_sheet_content, className, {
            [styles.bottom_sheet___filter_catalog]: isOpenFilterCatalog,
          })}
          ref={contentRef}
        >
          <button
            className={styles.bottom_sheet_close}
            type="button"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
          <div className={cn(styles.bottom_sheet_content_wrapper, classNameWrapper)}>
            {children}
          </div>
        </div>
      </FocusTrap>
    )
  },
)
