import { VFC } from 'react'

import { isTextField, isStackField, WidgetFields } from '@/modules/widgets'
import { SvgCalendar, SvgUpDownButton, SvgWallet, SvgLocation } from '@/uikit'

import styles from './features.module.scss'

export interface FeaturesProps {
  fields: WidgetFields
}

export const Features: VFC<FeaturesProps> = ({ fields }) => {
  const groupTitle = isTextField(fields.heading) ? fields.heading.value : undefined
  const list = isStackField(fields.features) ? fields.features.stack : []
  return (
    <section className={styles.group_list}>
      {groupTitle && <h3 className={styles.group_list_header}>{groupTitle}</h3>}
      <div className={styles.list}>
        {list.map(({ title, icon, description }, index) => (
          <div key={isTextField(title) ? title.value : index} className={styles.list_item}>
            {isTextField(icon) && (
              <div className={styles.list_icon}>
                {icon.value === 'wallet' && <SvgWallet />}
                {icon.value === 'calendar' && <SvgCalendar />}
                {icon.value === 'upDownButton' && <SvgUpDownButton />}
                {icon.value === 'location' && <SvgLocation className={styles.location} />}
              </div>
            )}
            <div className={styles.list_info}>
              {isTextField(title) && <div className={styles.list_title}>{title.value}</div>}
              {isTextField(description) && (
                <div className={styles.list_description}>{description.value}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
