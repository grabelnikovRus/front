import { VFC } from 'react'

import { WidgetFields, isTextField } from '@/modules/widgets'
import { Button } from '@/uikit'

import styles from './banner-modal.module.scss'

export interface BannerModalProps {
  fields: WidgetFields
  onConfirm: () => void
}

export const BannerModal: VFC<BannerModalProps> = ({ fields, onConfirm }) => {
  const { title, description, textButton } = fields

  const titleWidget = isTextField(title) ? title.value : ''
  const descriptionWidget = isTextField(description) ? description.value : ''
  const textButtonWidget = isTextField(textButton) ? textButton.value : ''

  return (
    <div className={styles.banner_modal}>
      <div
        dangerouslySetInnerHTML={{ __html: descriptionWidget }}
        className={styles.banner_modal_description}
      />
      <h1
        dangerouslySetInnerHTML={{ __html: titleWidget }}
        className={styles.banner_modal_title}
      />
      <Button externalStyles={styles.banner_modal_btn} onClick={onConfirm}>
        {textButtonWidget}
      </Button>
    </div>
  )
}
