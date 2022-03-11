import Link from 'next/link'
import { VFC } from 'react'

import { WidgetFields, isTextField } from '@/modules/widgets'

import styles from './exchange-max.module.scss'

export interface ExchangeMaxProps {
  fields: WidgetFields
  onAnalyticEvent?: () => void
}

export const ExchangeMax: VFC<ExchangeMaxProps> = ({ fields, onAnalyticEvent }) => {
  const { title, subTitle, description, button } = fields

  const titleWidget = isTextField(title) ? title.value : ''
  const subTitleWidget = isTextField(subTitle) ? subTitle.value : ''
  const descriptionWidget = isTextField(description) ? description.value : ''
  const titleButton = isTextField(button) ? button.value : ''

  return (
    <section className={styles.exchange}>
      <div className={styles.exchange_wrapper}>
        <h5 className={styles.exchange_title}>{titleWidget}</h5>
        <h6 className={styles.exchange_sub_title}>{subTitleWidget}</h6>
      </div>
      <div className={styles.exchange_description}>
        <h6 className={styles.exchange_text}>{descriptionWidget}</h6>
        <Link href="/">
          <a className={styles.exchange_link} onClick={onAnalyticEvent}>
            {titleButton}
          </a>
        </Link>
      </div>
    </section>
  )
}
