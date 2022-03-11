import cn from 'classnames'
import Link from 'next/link'
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  Ref,
  VFC,
  MouseEvent,
  HTMLAttributes,
} from 'react'

import styles from './button-base.module.scss'

interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  onClick?: () => void
  href: string
  innerRef?: Ref<HTMLAnchorElement>
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  href?: never
  innerRef?: Ref<HTMLButtonElement>
}

interface SpanProps extends HTMLAttributes<HTMLSpanElement> {
  onClick?: never
  href?: never
  innerRef?: Ref<HTMLSpanElement>
}

export type ButtonBaseProps = AnchorProps | ButtonProps | SpanProps

const isAnchor = (props: ButtonBaseProps): props is AnchorProps =>
  'href' in props && props.href !== undefined

const isButton = (props: ButtonBaseProps): props is ButtonProps =>
  'onClick' in props || 'type' in props

const AnchorButton: VFC<AnchorProps> = ({ className, href, innerRef, children, ...props }) => {
  const buttonClassName = cn(styles.button_base, className)
  return (
    <Link href={href}>
      <a {...props} className={buttonClassName} ref={innerRef}>
        {children}
      </a>
    </Link>
  )
}

const ButtonButton: VFC<ButtonProps> = ({ className, children, innerRef, ...props }) => {
  const buttonClassName = cn(styles.button_base, className)
  return (
    <button {...props} className={buttonClassName} ref={innerRef}>
      {children}
    </button>
  )
}

const SpanButton: VFC<SpanProps> = ({ children, className, innerRef, ...props }) => {
  const buttonClassName = cn(styles.button_base, styles.button_base___span, className)
  return (
    <span {...props} className={buttonClassName} ref={innerRef}>
      {children}
    </span>
  )
}

export const ButtonBase: VFC<ButtonBaseProps> = (props) => {
  if (isAnchor(props)) {
    return <AnchorButton {...props} />
  }

  if (isButton(props)) {
    return <ButtonButton {...props} />
  }

  return <SpanButton {...props} />
}
