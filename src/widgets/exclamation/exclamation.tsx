import { VFC } from 'react'

import { isTextField, WidgetFields } from '@/modules/widgets'

import styles from './exclamation.module.scss'

export interface ExclamationProps {
  fields: WidgetFields
}

export const Exclamation: VFC<ExclamationProps> = ({ fields }) => {
  const text = isTextField(fields.text) ? fields.text.value : undefined

  return <div className={styles.exclamation}>{text}</div>
}
