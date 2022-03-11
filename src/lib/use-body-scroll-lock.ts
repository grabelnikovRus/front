import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { RefObject } from 'react'

import { useBrowserDetector } from '@/lib/use-browser-detector'
import { useIsomorphicLayoutEffect } from '@/lib/use-isomorphic-layout-effect'

export const useBodyScrollLock = <Element extends HTMLElement>(
  isLocked: boolean,
  targetElement: RefObject<Element>,
): void => {
  const browser = useBrowserDetector()

  useIsomorphicLayoutEffect(() => {
    if (targetElement.current === null) {
      return
    }

    const body = document.body

    if (isLocked) {
      if (browser?.os === 'iOS') {
        body.classList.add('disabled_body')
        return
      }

      disableBodyScroll(targetElement.current)
    } else {
      if (browser?.os === 'iOS') {
        body.classList.remove('disabled_body')
        return
      }

      enableBodyScroll(targetElement.current)
    }
  }, [isLocked, targetElement, browser])

  useIsomorphicLayoutEffect(
    () => () => {
      if (targetElement.current === null) {
        return
      }

      if (browser?.os === 'iOS') {
        const body = document.body

        body.classList.remove('disabled_body')
        return
      }

      enableBodyScroll(targetElement.current)
    },
    [targetElement, browser],
  )
}
