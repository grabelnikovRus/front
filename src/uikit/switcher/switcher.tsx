import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, VFC, useEffect } from 'react'

import { Button } from '@/uikit/button/button'

import styles from './switcher.module.scss'

interface SwitcherButton {
  mode: 'button'
  callback: () => void
  text: string
  slug: string
}

interface SwitcherLink {
  mode: 'link'
  callback?: () => void
  path: string
  text: string
  slug: string
}

export interface SwitcherProps {
  theme?: 'neutral' | 'blue' | 'coloured'
  size?: 'small'
  buttons: Array<SwitcherButton | SwitcherLink>
  activeValue?: string
}

export const Switcher: VFC<SwitcherProps> = ({ theme = 'blue', buttons, size, activeValue }) => {
  const { asPath } = useRouter()
  const [activeButton, setActiveButton] = useState(buttons[0].slug)

  const switcherClassName = cn(styles.switcher, {
    [styles.switcher___neutral]: theme === 'neutral',
    [styles.switcher___blue]: theme === 'blue',
    [styles.switcher___coloured]: theme === 'coloured',
    [styles.switcher___small]: size === 'small',
  })

  useEffect(() => {
    if (!activeValue && !activeValue?.length) return

    setActiveButton(activeValue)
  }, [activeValue])

  return (
    <div className={switcherClassName}>
      {buttons.map((button) =>
        button.mode === 'link' ? (
          <Link key={button.slug} href={button.path}>
            <a
              data-testid={button.slug}
              className={cn(styles.switcher_link, {
                [styles[`switcher_link___active`]]: asPath.split('?')[0] === button.path,
              })}
              onClick={() => {
                button.callback?.()
              }}
            >
              {button.text}
            </a>
          </Link>
        ) : (
          <Button
            key={button.slug}
            externalStyles={cn(styles.switcher_btn, {
              [styles[`switcher_btn___active`]]: activeButton === button.slug,
            })}
            onClick={() => {
              button.callback()
              setActiveButton(button.slug)
            }}
          >
            {button.text}
          </Button>
        ),
      )}
    </div>
  )
}
