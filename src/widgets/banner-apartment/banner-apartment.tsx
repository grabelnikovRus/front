import { VFC } from 'react'

import { useLayoutSellRequest } from '@/components/layout/use-layout-sell-request.hook'
import { WidgetFields, isTextField } from '@/modules/widgets'
import { Button } from '@/uikit'

import styles from './banner-apartment.module.scss'

export interface BannerApartmentProps {
  fields: WidgetFields
  onAnalyticEvent?: () => void
}

export const BannerApartment: VFC<BannerApartmentProps> = ({ fields, onAnalyticEvent }) => {
  const { title, description, textButton } = fields

  const titleWidget = isTextField(title) ? title.value : ''
  const descriptionWidget = isTextField(description) ? description.value : ''
  const textButtonWidget = isTextField(textButton) ? textButton.value : ''

  const { openSellRequest } = useLayoutSellRequest()

  return (
    <div className={styles.banner}>
      <h1 dangerouslySetInnerHTML={{ __html: titleWidget }} className={styles.banner_title} />
      <div
        dangerouslySetInnerHTML={{ __html: descriptionWidget }}
        className={styles.banner_description}
      />
      <Button
        externalStyles={styles.banner_btn}
        onClick={() => {
          openSellRequest()
          onAnalyticEvent?.()
        }}
      >
        {textButtonWidget}
      </Button>
    </div>
  )
}
