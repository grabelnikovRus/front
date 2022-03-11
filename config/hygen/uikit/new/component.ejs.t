---
to: src/uikit/<%= name %>/<%= name %>.tsx
---
import { ReactNode, VFC } from 'react'

import styles from './<%= name %>.module.scss'

export interface <%= h.changeCase.pascal(name) %>Props {
  children: ReactNode
}

export const <%= h.changeCase.pascal(name) %>: VFC<<%= h.changeCase.pascal(name) %>Props> = ({ children }) => {
  return <div className={styles.<%= h.changeCase.camel(name) %>}>{children}</div>
}
