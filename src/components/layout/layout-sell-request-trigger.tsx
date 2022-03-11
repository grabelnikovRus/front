import Cookies from 'js-cookie'
import { useCallback, useEffect, useRef, useState, VFC } from 'react'

import { SellRequestForm } from '@/components/sell-request-form/sell-request-form'
import { config, STORAGE_KEY } from '@/config'
import { trackCustomEvent, trackEvent, updateUser, categoryForAnalytic } from '@/lib/tracking'
import { PagesEntity } from '@/modules/pages'
import { WidgetFields } from '@/modules/widgets'
import { ModalSimple } from '@/uikit/modal-simple/modal-simple'

import { useLayoutSellRequest } from './use-layout-sell-request.hook'

export interface Props {
  fields: WidgetFields
  pages: PagesEntity
  pageSlug: string
  legalWidgetPresent?: boolean
  isOpen: boolean
  onClose: () => void
}

export const LayoutSellRequestTrigger: VFC<Props> = (props) => {
  const [isScroll, setIsScroll] = useState(false)
  const [stage, setStage] = useState('apartment')
  const refContainer = useRef<HTMLDivElement>(null)

  const { isOpen, address, closeSellRequest } = useLayoutSellRequest()

  const redirectToLk = useCallback(() => {
    location.assign(`${config.userpanelUrl}/?slug=${props.pageSlug}`)
  }, [props.pageSlug])

  const handleSellRequestSuccess = () => {
    trackCustomEvent('smsСodeEntered')
    updateUser(Cookies.get('userId'))
    redirectToLk()
  }

  const handleStageChange = (stage: string) => {
    setStage(stage)
  }

  const onCloseModal = () => {
    closeSellRequest()

    switch (stage) {
      case 'apartment':
        trackEvent({
          category: categoryForAnalytic(location.pathname, 'Funnel '),
          name: 'Clicked on the Сlose Сhecklist icon',
          label: 'Сlose Сhecklist icon',
        })
        break
      case 'apt-check':
        trackEvent({
          category: categoryForAnalytic(location.pathname, 'Funnel '),
          name: 'Clicked on the Сlose icon on the screen Thats right',
          label: 'Сlose icon on the screen Thats right',
        })
        break
      case 'register':
        trackEvent({
          category: categoryForAnalytic(location.pathname, 'Funnel '),
          name: 'Clicked on the Close icon on the Registration screen',
          label: 'Close icon on the Registration screen',
        })
        break
      case 'sms-confirm':
        trackEvent({
          category: categoryForAnalytic(location.pathname, 'Funnel '),
          name: 'Clicked on the Close icon',
          label: 'Close icon',
        })
        break
      default:
        trackEvent({
          category: categoryForAnalytic(location.pathname, 'Funnel '),
          name: 'Clicked on the Сlose Сhecklist icon',
          label: 'Сlose Сhecklist icon',
        })
    }
  }

  useEffect(() => {
    if (props.isOpen && Cookies.get('token')) redirectToLk()
  }, [props.pageSlug, redirectToLk, props.isOpen])

  useEffect(() => {
    if (isScroll) refContainer?.current?.scrollTo(0, 0)
  }, [isScroll])

  return (
    <ModalSimple isOpen={isOpen} onClose={onCloseModal} ref={refContainer}>
      <SellRequestForm
        addressData={address}
        fields={props.fields}
        legalWidgetPresent={props.legalWidgetPresent}
        localStorageKey={STORAGE_KEY}
        onCancel={() => closeSellRequest()}
        onChangeStage={handleStageChange}
        onSuccess={handleSellRequestSuccess}
        pages={props.pages}
        pageSlug={props.pageSlug}
        setIsScroll={setIsScroll}
      />
    </ModalSimple>
  )
}
