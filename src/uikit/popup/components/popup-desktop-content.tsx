import cn from 'classnames'
import { forwardRef, ReactNode, RefObject, useState } from 'react'
import { usePopper } from 'react-popper'
import { useClickAway, useKey } from 'react-use'

import styles from './popup-desktop.module.scss'

export interface PopupDesktopContainerProps {
  className: string
  rootRef: RefObject<HTMLDivElement>
  referenceElement: HTMLButtonElement | null
  onClose: () => void
  children: ReactNode
}

type PopperOptions = Parameters<typeof usePopper>[2]

const popperOptions: PopperOptions = {
  placement: 'bottom',
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 8],
      },
    },
    {
      name: 'flip',
      options: {
        flipVariations: false,
      },
    },
    {
      name: 'preventOverflow',
      options: {
        altBoundary: true,
        padding: 8,
      },
    },
  ],
}

export const PopupDesktopContent = forwardRef<HTMLDivElement, PopupDesktopContainerProps>(
  function PopupContainerDesktop(
    { className, rootRef, referenceElement, onClose, children },
    containerRef,
  ) {
    useClickAway(rootRef, onClose)
    useKey('Escape', onClose)

    const [popperElement, setPopperElement] = useState<HTMLDivElement>()

    const { styles: popperStyles, attributes } = usePopper(
      referenceElement,
      popperElement,
      popperOptions,
    )

    const setRef = (instance: HTMLDivElement) => {
      if (typeof containerRef === 'object' && containerRef !== null) {
        containerRef.current = instance
      }
      setPopperElement(instance)
    }

    return (
      <div
        {...attributes.popper}
        className={cn(styles.popup_desktop, className)}
        style={popperStyles.popper}
        ref={setRef}
      >
        <div className={styles.popup_desktop_wrapper}>{children}</div>
      </div>
    )
  },
)
