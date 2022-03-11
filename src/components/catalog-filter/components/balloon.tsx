import cn from 'classnames'
import { useRouter } from 'next/router'
import { useState, useEffect, VFC, MouseEvent } from 'react'

import { Button } from '@/uikit'

import styles from './balloon.module.scss'

interface BalloonProps {
  text: string
  topFilter: number
  clickCoordinatesY: number
  submitting: boolean
  isVisibleBalloon: boolean
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

export const Balloon: VFC<BalloonProps> = ({
  topFilter,
  clickCoordinatesY,
  isVisibleBalloon,
  text,
  submitting,
  onClick,
}) => {
  const [balloonCoordinatesY, setBalloonCoordinatesY] = useState('0px')

  const { pathname } = useRouter()
  const isCatalogMap = pathname === '/catalog-map'

  useEffect(() => {
    setBalloonCoordinatesY(clickCoordinatesY - topFilter + 'px')
  }, [topFilter, clickCoordinatesY])

  if (isCatalogMap) return null

  return (
    <div
      className={cn(styles.container, {
        [styles.container___visible]: isVisibleBalloon,
      })}
      style={{ top: balloonCoordinatesY }}
    >
      <Button
        type="button"
        onClick={onClick}
        disabled={submitting}
        externalStyles={styles.container_balloon}
      >
        {text}
      </Button>
    </div>
  )
}
