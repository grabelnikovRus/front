import cn from 'classnames'
import { HTMLAttributes, VFC } from 'react'

import styles from './dotted-row.module.scss'

export const DottedRow: VFC<HTMLAttributes<HTMLSpanElement>> = ({ className }) => (
  <span className={cn(styles.dot, className)} />
)
