import cn from 'classnames'
import { useCallback, useEffect, useMemo, useRef, useState, VFC } from 'react'

import { getBrightnessColor } from '@/lib/brightness'
import { isStackField, WidgetFields, isTextField } from '@/modules/widgets'

import styles from './how-it-works.module.scss'

export interface HowItWorksProps {
  fields: WidgetFields
}

const START_SCREEN_TOP = 0.6
const FINISH_SCREEN_TOP = -0.2

type InlineStyles = {
  [key: string]: {
    background: string
    opacity: number
    scale: number
    isOpen: boolean
    prevActive: boolean
    marginBottom: number | string
    color: string
    indexBorder: string
    borderRadius: string
  }
}

export const HowItWorks: VFC<HowItWorksProps> = ({ fields: { features, title } }) => {
  const scrollComponent = useRef<HTMLUListElement>(null)
  const list = useMemo(() => (isStackField(features) ? features.stack : []), [features])
  const titleComponent = isTextField(title) ? title.value : null
  const STEP_SHADE_COLOR = 40
  const STEP_SHADE_BACKGROUND = 4
  const STEP_MARGIN_BOTTOM = useRef(11)
  const STEP_SCALE = useRef(0.06)
  const MARGIN_BOTTOM = useRef(16)

  useEffect(() => {
    if (window.innerWidth < 375) {
      MARGIN_BOTTOM.current = 8
      STEP_MARGIN_BOTTOM.current = 9
    }
    if (window.innerWidth > 768) {
      STEP_SCALE.current = 0.03
    }
  }, [])

  const objInlineStyles = useMemo(
    () => ({
      background: '#fff',
      opacity: 0.5,
      scale: 1,
      isOpen: false,
      marginBottom: MARGIN_BOTTOM.current,
      prevActive: false,
      color: '#11142d',
      indexBorder: '1px solid #d4d5d9',
      borderRadius: '32px',
    }),
    [],
  )

  const [inlineStyles, setInlineStyles] = useState<InlineStyles>(
    list.reduce<InlineStyles>(
      (acc, el, i) => ({
        ...acc,
        [i]: objInlineStyles,
      }),
      {},
    ),
  )

  const activatePoint = useCallback(
    (index: number) => {
      const rewritingStyles = list.reduce(
        (acc, el, i) => ({
          ...acc,
          [i]: { ...objInlineStyles, marginBottom: MARGIN_BOTTOM.current },
        }),
        {},
      )
      const newStyles: InlineStyles = {
        ...rewritingStyles,
        [index]: { ...objInlineStyles, isOpen: true, marginBottom: MARGIN_BOTTOM.current },
      }
      let countItem = list.length - (list.length - index)
      Object.keys(newStyles).forEach((el) => {
        if (countItem > 0) {
          newStyles[el].background = getBrightnessColor(
            '#f2fafc',
            countItem * STEP_SHADE_BACKGROUND,
          )
          newStyles[el].color = getBrightnessColor('#11142d', countItem * STEP_SHADE_COLOR)
          newStyles[el].indexBorder = `1px solid ${getBrightnessColor(
            '#11142d',
            countItem * STEP_SHADE_COLOR,
          )}`
          newStyles[el].scale -= countItem * STEP_SCALE.current
          newStyles[el].marginBottom = -countItem * STEP_MARGIN_BOTTOM.current
          newStyles[el].prevActive = true
          newStyles[el].opacity = 1
          newStyles[el].borderRadius = '32px 32px 0 0'
        }
        if (countItem === 0) {
          newStyles[el].background = '#f2fafc'
          newStyles[el].opacity = 1
        }
        countItem--
      })
      setInlineStyles(newStyles)
    },
    [list, objInlineStyles],
  )

  const scrollFunction = useCallback(() => {
    const { current } = scrollComponent
    if (current?.lastChild) {
      const pointsCount = list.length
      const screenTopStep = (START_SCREEN_TOP - FINISH_SCREEN_TOP) / pointsCount
      for (let i = pointsCount - 1; i > -1; i--) {
        const screenTop = window.innerHeight * (START_SCREEN_TOP - i * screenTopStep)
        if (current.getBoundingClientRect().top < screenTop) {
          activatePoint(i)
          break
        }
      }
    }
  }, [activatePoint, list])

  useEffect(() => {
    scrollFunction()
    window.addEventListener('resize', scrollFunction, false)
    window.addEventListener('scroll', scrollFunction, false)
    return () => {
      window.removeEventListener('resize', scrollFunction)
      window.removeEventListener('scroll', scrollFunction)
    }
  }, [list, scrollFunction])

  return (
    <section className={styles.how_it_works}>
      {title && <h2 className={styles.how_it_works_uptitle}>{titleComponent}</h2>}
      <ul className={styles.list} ref={scrollComponent}>
        {list.map(({ description, title, icon }, i) => (
          <li
            key={isTextField(title) ? title.value : i}
            className={cn(styles.list_item, {
              [styles['list_item--active']]: inlineStyles[i].isOpen,
              [styles['list_item--border']]: inlineStyles[i].prevActive,
            })}
            onClick={() => activatePoint(i)}
            style={{
              zIndex: i,
              opacity: `${inlineStyles[i].opacity}`,
              marginBottom: `${inlineStyles[i].marginBottom}px`,
              backgroundColor: `${inlineStyles[i].background}`,
              transform: `scale(${inlineStyles[i].scale})`,
              color: `${inlineStyles[i].color}`,
              borderRadius: `${inlineStyles[i].borderRadius}`,
            }}
          >
            <span
              className={styles.list_index}
              style={{ border: `${inlineStyles[i].indexBorder}` }}
            >
              {i + 1}
            </span>
            <div
              className={cn(styles.list_item_container, {
                [styles['list_item_container--open']]: inlineStyles[i]?.isOpen,
              })}
            >
              {isTextField(title) && <h6 className={styles.list_title}>{title.value}</h6>}
              <div className={styles.list_wrapper}>
                <div className={styles.list_box}>
                  {isTextField(description) && inlineStyles[i]?.isOpen && (
                    <>{description.value}</>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
