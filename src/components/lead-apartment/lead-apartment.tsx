import { FORM_ERROR, FormApi } from 'final-form'
import Cookies from 'js-cookie'
import { useState, useMemo, VFC } from 'react'
import { Form } from 'react-final-form'

import { useLayoutSellRequest } from '@/components/layout/use-layout-sell-request.hook'
import { config } from '@/config'
import { FORM } from '@/config/constants'
import { normalizeApiErrors } from '@/lib/form'
import { Notify } from '@/lib/notify/notify'
import { getNotificationImage } from '@/lib/notify/notify-container'
import { trackEvent } from '@/lib/tracking'
import { createLead, LeadRequest, verifyLead } from '@/modules/lead'
import { WidgetFields } from '@/modules/widgets'
import { Notification } from '@/uikit'
import { BannerModal } from '@/widgets/banner-modal/banner-modal'

import { LeadApartmentForm, LeadApartmentFormValues } from './components/lead-apartment-form'
import { SmsForm, SmsFormValues } from './components/sms-form'
import { leadApartmentSettings } from './lead-apartment-settings'

export interface LeadApartmentProps {
  amoId: number
  onStepChange?: (step: 'lead' | 'verify') => void
  onSuccess?: () => void
  bannerModal?: WidgetFields
}

interface LeadData {
  id?: number
  message: string
  phone: string
}

const { UNKNOWN_ERROR, ERROR_UNDEFINED_MESSAGE } = FORM

const HIDDEN_DELAY = 500

export const LeadApartment: VFC<LeadApartmentProps> = ({
  amoId,
  onStepChange,
  onSuccess,
  bannerModal,
}) => {
  const [step, setStep] = useState<'lead' | 'verify'>('lead')
  const [lead, setLead] = useState<LeadRequest | null>(null)
  const [leadData, setLeadData] = useState<LeadData | null>(null)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isOpenSellRequest, setOpenSellRequest] = useState(false)
  const [notification, setNotification] = useState<Notify | null>(null)

  const { openSellRequest } = useLayoutSellRequest()

  const showNotification = (notification: Notify) => {
    setIsNotificationOpen(true)
    setNotification(notification)
  }

  const afterNotificationClose = (notification: Notify) => {
    setNotification(null)
    if (notification.type === 'SUCCESS') {
      onSuccess?.()
    }
    if (isOpenSellRequest) {
      setTimeout(openSellRequest, HIDDEN_DELAY)
    }
  }

  const handleSubmitErrors = (errors: unknown) => {
    if (!Array.isArray(errors)) {
      showNotification({
        type: 'ERROR',
        message: 'Что-то пошло не так',
        description: ERROR_UNDEFINED_MESSAGE,
      })

      return { [FORM_ERROR]: UNKNOWN_ERROR }
    }

    return normalizeApiErrors(errors, FORM_ERROR)
  }

  const sendRequest = async (lead: LeadRequest) => {
    let errors
    let body

    try {
      ;({ body, errors } = await createLead(lead))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      errors = err
    }

    if (errors.length > 0) {
      return handleSubmitErrors(errors)
    }

    if (!body) {
      return
    }

    const { result, /* uuid, */ message, id } = body
    if (result) {
      setLeadData({ id, message, phone: lead.phone })
      setStep('verify')
      if (onStepChange) onStepChange('verify')
    }
  }

  const handleSubmit = async (values: LeadApartmentFormValues) => {
    const lead = {
      apartmentId: amoId.toString(),
      gaId: Cookies.get('_ga') || null,
      name: values.name,
      formType: 'apartment_review',
      phone: values.phone?.replace(/\D/g, ''),
      source: config.domain,
      allowMarketing: values.allowMarketing || undefined,
    }

    setLead(lead)
    return await sendRequest(lead)
  }

  const handleSmsRepeatClick = async () => {
    if (lead === null) return

    return await sendRequest(lead)
  }

  const handleSmsSubmit = async (values: SmsFormValues, form: FormApi<SmsFormValues>) => {
    const { errors } = await verifyLead({ id: values.id, smsCode: values.smsCode.join('') })
    if (errors.length > 0) {
      trackEvent({
        category: 'Funnel Viewing Flats',
        name: 'Entered an Invalid Code on the Enter Code screen',
        label: 'Invalid Code on the Enter Code screen',
      })
      return handleSubmitErrors(errors)
    }
    trackEvent({
      category: 'Funnel Viewing Flats',
      name: 'Entered the Code from SMS on the Enter Code screen Conversions',
      label: 'Code from SMS on the Enter Code screen Conversions',
    })
    showNotification({
      type: 'SUCCESS',
      message: 'Готово',
      description: `Вы записались на просмотр квартиры.\n
    Наш менеджер вам перезвонит.`,
    })
    form.reset()
    setStep('lead')
    if (onStepChange) onStepChange('lead')
  }

  const Banner = useMemo(() => {
    if (!bannerModal) return null

    return (
      <BannerModal
        fields={bannerModal}
        onConfirm={() => {
          setIsNotificationOpen(false)
          setOpenSellRequest(true)

          trackEvent({
            category: 'Funnel Viewing Flats',
            name: 'Clicked Submit Request',
            label: 'Submit Request',
          })
        }}
      />
    )
  }, [bannerModal])

  return (
    <>
      {step === 'lead' && (
        <Form<LeadApartmentFormValues>
          initialValues={{
            allowMarketing: leadApartmentSettings.allowMarketing.initial,
            privacyPolicy: leadApartmentSettings.privacyPolicy.initial,
          }}
          onSubmit={handleSubmit}
          component={LeadApartmentForm}
        />
      )}

      {step === 'verify' && leadData !== null && (
        <Form<SmsFormValues>
          initialValues={{ id: leadData.id, smsCode: ['', '', '', ''] }}
          onSubmit={handleSmsSubmit}
        >
          {(props) => (
            <SmsForm {...props} phone={leadData.phone} onSmsRepeat={handleSmsRepeatClick} />
          )}
        </Form>
      )}

      {notification !== null && (
        <Notification
          isOpen={isNotificationOpen}
          mode={notification.type}
          title={notification.message}
          description={notification.description}
          image={getNotificationImage(notification.type)}
          onClose={() => setIsNotificationOpen(false)}
          afterClose={() => afterNotificationClose(notification)}
          banner={Banner}
        />
      )}
    </>
  )
}
