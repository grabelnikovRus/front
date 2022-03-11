import Link from 'next/link'
import { VFC, ReactNode } from 'react'

import styles from '../slider-images.module.scss'

interface LinkSliderProps {
  link: string
  children: ReactNode
  onAnalyticEvent?: () => void
}

interface ButtonSliderProps {
  onClick: () => void
  children: ReactNode
}

export type WrapperSliderProps = Partial<LinkSliderProps> | Partial<ButtonSliderProps>

const LinkSlider: VFC<LinkSliderProps> = ({ link, children, onAnalyticEvent }) => (
  <Link href={link}>
    <a target="_blank" onClick={onAnalyticEvent}>
      {children}
    </a>
  </Link>
)

const ButtonSlider: VFC<ButtonSliderProps> = ({ onClick, children }) => (
  <div onClick={onClick} className={styles.wrapper}>
    {children}
  </div>
)

const isLink = (props: WrapperSliderProps): props is LinkSliderProps =>
  'link' in props && props.link !== undefined

const isButton = (props: WrapperSliderProps): props is ButtonSliderProps => 'onClick' in props

export const WrapperSlider: VFC<WrapperSliderProps> = (props) => {
  if (isLink(props)) return <LinkSlider {...props} />
  if (isButton(props)) return <ButtonSlider {...props} />
  return null
}
