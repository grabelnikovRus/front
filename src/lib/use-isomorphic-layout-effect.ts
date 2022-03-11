import { useLayoutEffect, useEffect } from 'react'

import { config } from '@/config'

export const useIsomorphicLayoutEffect = config.isSSR ? useEffect : useLayoutEffect
