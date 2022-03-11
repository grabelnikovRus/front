import Link from 'next/link'
import { VFC } from 'react'

import { WidgetFields, isTextField } from '@/modules/widgets'

import styles from './banner-catalog.module.scss'

export interface BannerCatalogProps {
  fields: WidgetFields
}

export const BannerCatalog: VFC<BannerCatalogProps> = ({ fields }) => {
  const { title, subtitle, description, textButton, href } = fields

  const titleWidget = isTextField(title) ? title.value : ''
  const subtitleWidget = isTextField(subtitle) ? subtitle.value : ''
  const descriptionWidget = isTextField(description) ? description.value : ''
  const textButtonWidget = isTextField(textButton) ? textButton.value : ''
  const hrefWidget = isTextField(href) ? href.value : ''

  return (
    <div className={styles.banner}>
      <div className={styles.banner_wrapper_first}>
        <h1 dangerouslySetInnerHTML={{ __html: titleWidget }} className={styles.banner_title} />
        <h5
          dangerouslySetInnerHTML={{ __html: subtitleWidget }}
          className={styles.banner_subtitle}
        />
      </div>
      <div className={styles.banner_wrapper_second}>
        <span
          dangerouslySetInnerHTML={{ __html: descriptionWidget }}
          className={styles.banner_description}
        />
        <Link href={hrefWidget}>
          <a className={styles.banner_btn}>{textButtonWidget}</a>
        </Link>
      </div>
    </div>
  )
}
