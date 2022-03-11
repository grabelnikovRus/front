import { detect } from 'detect-browser'
import { useState } from 'react'
import { useIsomorphicLayoutEffect } from 'react-use'

type BrowserInfo = ReturnType<typeof detect>

export const useBrowserDetector = (): BrowserInfo => {
  const [browser, setBrowser] = useState<ReturnType<typeof detect> | null>(null)

  useIsomorphicLayoutEffect(() => {
    setBrowser(detect())
  }, [])

  return browser
}
