import { VFC } from 'react'

import { isTextField, isStackField, WidgetFields } from '@/modules/widgets'
import { ServiceCardContainer, SellServiceCard } from '@/uikit'

import styles from './pages-features.module.scss'

export interface SPagesFeaturesProps {
  fields: WidgetFields
}

export const PagesFeatures: VFC<SPagesFeaturesProps> = ({ fields }) => {
  const title = isTextField(fields.heading) ? fields.heading.value : undefined
  const description = isTextField(fields.description) ? fields.description.value : undefined
  const list = isStackField(fields.features) ? fields.features.stack : []

  return (
    <div className={styles.pages_features}>
      <div className={styles.pages_features_text_container}>
        <div className={styles.pages_features_description}>{description}</div>
        <h2 className={styles.pages_features_title}>{title}</h2>
      </div>
      <ServiceCardContainer col={4}>
        {list.map((item) => {
          const title = isTextField(item.title) ? item.title.value : undefined
          const icon = isTextField(item.icon) ? item.icon.value : undefined
          if (title && icon) {
            return <SellServiceCard key={title} title={title} icon={icon} />
          }
          return null
        })}
      </ServiceCardContainer>
    </div>
  )
}
