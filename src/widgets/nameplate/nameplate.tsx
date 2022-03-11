import cn from 'classnames'
import { VFC } from 'react'

import { WidgetFields, isTextField } from '@/modules/widgets'

import styles from './nameplate.module.scss'

export interface NameplateProps {
  fields: WidgetFields
  mode?: 'exchange' | 'tradein'
}

export const Nameplate: VFC<NameplateProps> = ({ fields, mode = 'exchange' }) => {
  const { description, clarification } = fields

  const title = isTextField(description) ? description.value : ''
  const subTitle = isTextField(clarification) ? clarification.value : ''

  return (
    <section
      className={cn(styles.nameplate, { [styles.nameplate___tradein]: mode === 'tradein' })}
    >
      <div className={styles.nameplate_wrapper}>
        <div
          className={styles.nameplate_description}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {mode === 'exchange' && (
          <div
            className={styles.nameplate_clarification}
            dangerouslySetInnerHTML={{ __html: subTitle }}
          />
        )}
      </div>
    </section>
  )
}
