import cn from 'classnames'
import { VFC, HTMLAttributes, useState } from 'react'

import { share } from '@/lib/share'

import styles from './copy-button.module.scss'

import { SvgCopy } from '../svg'

export interface CopyButtonProps extends HTMLAttributes<HTMLButtonElement> {
  text: string
  link: string
  onClick?: () => void
}

export const CopyButton: VFC<CopyButtonProps> = ({
  className,
  text,
  link,
  onClick,
  ...props
}) => {
  const [isActiveCopy, setIsActiveCopy] = useState(false)

  const onClickCopy = () => {
    setIsActiveCopy(true)
    share(text, link)
    setTimeout(() => setIsActiveCopy(false), 2500)
  }

  return (
    <button
      className={cn(styles.copy, className, {
        [styles.copy___active]: isActiveCopy,
      })}
      onClick={() => {
        onClickCopy()
        onClick?.()
      }}
      {...props}
    >
      {!isActiveCopy && <SvgCopy />}
    </button>
  )
}
