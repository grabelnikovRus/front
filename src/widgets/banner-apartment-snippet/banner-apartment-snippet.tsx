import { VFC } from 'react'

import { useLayoutSellRequest } from '@/components/layout/use-layout-sell-request.hook'
import { WidgetFields, isTextField } from '@/modules/widgets'
import { Button, SvgArrowRight } from '@/uikit'

import styles from './banner-apartment-snippet.module.scss'

export interface BannerApartmentSnippetProps {
  fields: WidgetFields
  onAnalyticEvent?: () => void
}

export const BannerApartmentSnippet: VFC<BannerApartmentSnippetProps> = ({
  fields,
  onAnalyticEvent,
}) => {
  const { title } = fields

  const titleWidget = isTextField(title) ? title.value : ''

  const { openSellRequest } = useLayoutSellRequest()

  return (
    <Button
      className={styles.banner_apartment_snippet}
      onClick={() => {
        openSellRequest()
        onAnalyticEvent?.()
      }}
    >
      <div
        dangerouslySetInnerHTML={{ __html: titleWidget }}
        className={styles.banner_apartment_snippet_title}
      />
      <div className={styles.banner_apartment_snippet_btn}>
        <SvgArrowRight />
      </div>
    </Button>
  )
}
