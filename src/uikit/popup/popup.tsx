import cn from 'classnames'
import { ReactNode, Ref, useRef, useState, VFC } from 'react'

import { useMediaSmallScreen } from '@/lib/use-media'
import { BottomSheet } from '@/uikit/bottom-sheet/bottom-sheet'
import { Button } from '@/uikit/button/button'

import { PopupDesktop } from './components/popup-desktop'
import styles from './popup.module.scss'

interface RenderButtonProps {
  isOpen: boolean
  innerRef: Ref<HTMLButtonElement>
  togglePopup: () => void
}

export interface PopupProps {
  body?: ReactNode
  title?: ReactNode
  buttonText?: string
  className?: string
  renderIcon?: (props: { className: string }) => ReactNode
  renderButton: (props: RenderButtonProps) => ReactNode
}

export const Popup: VFC<PopupProps> = ({
  title,
  body,
  className,
  renderIcon,
  buttonText,
  renderButton,
}) => {
  const isSmallScreen = useMediaSmallScreen()
  const popupRef = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null)

  const togglePopup = () => {
    setIsOpen((state) => !state)
  }

  const PopupComponent = isSmallScreen ? BottomSheet : PopupDesktop

  return (
    <div ref={popupRef} className={styles.popup}>
      {renderButton({ isOpen, togglePopup, innerRef: setReferenceElement })}
      <PopupComponent isOpen={isOpen} onClose={togglePopup} initialFocus={popupRef}>
        <PopupComponent.Container
          isOpen={isOpen}
          onClose={togglePopup}
          rootRef={popupRef}
          referenceElement={referenceElement}
          className={cn(styles.popup_content, className)}
        >
          <div className={styles.popup_header}>
            {renderIcon?.({ className: styles.popup_icon })}
            <PopupComponent.Title className={styles.popup_title}>{title}</PopupComponent.Title>
          </div>
          <PopupComponent.Description className={styles.popup_body}>
            {body}
          </PopupComponent.Description>
          {buttonText !== undefined && (
            <Button externalStyles={styles.popup_button} onClick={togglePopup}>
              {buttonText}
            </Button>
          )}
        </PopupComponent.Container>
      </PopupComponent>
    </div>
  )
}
