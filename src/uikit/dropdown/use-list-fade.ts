import { CSSProperties, RefObject, useEffect, useRef, useState } from 'react'
import { useScroll } from 'react-use'

export const useListFade = (
  fadeHeight: number,
  isOpen: boolean,
): [RefObject<HTMLUListElement>, CSSProperties] => {
  const [scrollHeight, setScrollHeight] = useState(0)
  const [topPosition, setTopPosition] = useState(-fadeHeight)
  const [bottomPosition, setBottomPosition] = useState(0)

  const listFade = useRef<HTMLUListElement>(null)

  const { y } = useScroll(listFade)

  useEffect(() => {
    if (listFade.current) {
      setScrollHeight(listFade.current.scrollHeight - listFade.current.clientHeight)
    }
  }, [setScrollHeight, isOpen])

  useEffect(() => {
    if (!listFade.current) {
      return
    }

    let top = 0
    let bottom = 0
    if (y === 0) {
      top = -fadeHeight
      bottom = scrollHeight <= listFade.current.clientHeight ? -fadeHeight : 0
    } else {
      const left = scrollHeight - y
      if (left <= fadeHeight) {
        bottom = 0 - (fadeHeight - left)
      }
      if (y <= fadeHeight) {
        top = -fadeHeight + y
      }
    }
    setBottomPosition(bottom)
    setTopPosition(top)
  }, [y, scrollHeight, fadeHeight])

  return [
    listFade,
    {
      '--bottom-fade-position': `${bottomPosition}px`,
      '--top-fade-position': `${topPosition}px`,
    } as CSSProperties,
  ]
}
