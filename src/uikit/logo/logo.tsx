import cn from 'classnames'
import Link from 'next/link'
import { VFC } from 'react'

import { SvgLogo } from '@/uikit/svg'

import styles from './logo.module.scss'

export interface LogoProps {
  theme?: 'dark' | 'light'
}

export const Logo: VFC<LogoProps> = ({ theme = 'dark' }) => (
  <Link href="/">
    <a
      className={cn(styles.logo, {
        [styles.logo___dark]: theme === 'dark',
        [styles.logo___light]: theme === 'light',
      })}
    >
      <SvgLogo />
    </a>
  </Link>
)
