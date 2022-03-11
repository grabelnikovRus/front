import { VFC } from 'react'

import { WidgetFields, isStackField, isTextField } from '@/modules/widgets'

import { getIcon } from './get-icon'
import styles from './list-info.module.scss'

export interface ListInfoProps {
  fields: WidgetFields
}

export const ListInfo: VFC<ListInfoProps> = ({ fields }) => {
  const { features } = fields
  const list = isStackField(features) ? features.stack : []
  return (
    <section className={styles.list}>
      {list.map((el, ind) => {
        const iconItem = isTextField(el.icon) ? el.icon.value : null
        const text = isTextField(el.title) ? el.title.value : ''
        return (
          <div className={styles.list_item} key={iconItem || ind}>
            <span className={styles.list_icon}>{getIcon(iconItem)}</span>
            <span className={styles.list_text} dangerouslySetInnerHTML={{ __html: text }} />
          </div>
        )
      })}
    </section>
  )
}
