/* eslint-disable max-lines */
import { FORM_ERROR } from 'final-form'
import arrayMutators from 'final-form-arrays'
import createDecorator from 'final-form-focus'
import Cookies from 'js-cookie'
import { useEffect, useState, useMemo, VFC, SetStateAction, Dispatch, useRef } from 'react'
import { Form } from 'react-final-form'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

import {
  UserpanelEnterWithCheckListRequestRenovationTypeEnum,
  UserpanelEnterWithCheckListRequestRoomTypeEnum,
} from '@/api'
import { config, FORM, SITE, SLUG } from '@/config'
import { PagesEntity } from '@/modules/pages'
import { getSaleApplication, login } from '@/modules/userpanel'
import { WidgetFields } from '@/modules/widgets'

import { analyticEvents } from './analytic-events'
import { checklistSettings } from './checklist-settings'
import { ApartmentForm, ApartmentFormValues } from './components/apartment-form'
import { ConfirmationForm, ConfirmationFormValues } from './components/confirmation-form'
import { InfoOutput } from './components/info-output'
import { RegistrationForm, RegistrationFormValues } from './components/registration-form'
import { getStoredData, setStoredData, clearStoredData } from './lib/local-storage'
import { IAddressFormData, Stage } from './sell-request-form.types'

export * from './sell-request-form.types'

export interface SellRequestFormProps {
  addressData?: IAddressFormData
  bodyVersion?: boolean
  fields: WidgetFields
  legalWidgetPresent?: boolean
  localStorageKey: string
  onCancel: (addressData: IAddressFormData | null) => void
  onChangeStage?: (stage: Stage) => void
  onSuccess?: () => void
  pages: PagesEntity
  pageSlug: string
  setIsScroll?: Dispatch<SetStateAction<boolean>>
}

const { ERROR_UNDEFINED_MESSAGE, UNKNOWN_ERROR } = FORM

const listInput = [
  {
    name: 'address',
    focus: () => {
      const suggest =
        document.querySelectorAll('input[aria-autocomplete=list]')[1] ||
        document.querySelector('input[autocomplete=off]')
      return (suggest as HTMLElement).focus()
    },
  },
  {
    name: 'objectType',
    focus: () => (document.querySelector('input[name=objectType]') as HTMLElement).focus(),
  },
  {
    name: 'area',
    focus: () => (document.querySelector('input[name=area]') as HTMLElement).focus(),
  },
  {
    name: 'floor',
    focus: () => (document.querySelector('input[name=floor]') as HTMLElement).focus(),
  },
  {
    name: 'roomType',
    focus: () => (document.querySelector('#roomType-0') as HTMLElement).focus(),
  },
  {
    name: 'isInOperation',
    focus: () => (document.querySelector('input[name=isInOperation]') as HTMLElement).focus(),
  },
  {
    name: 'renovation',
    focus: () => (document.querySelector('input[name=renovation]') as HTMLElement).focus(),
  },
  {
    name: 'price',
    focus: () => (document.querySelector('input[name=price]') as HTMLElement).focus(),
  },
  {
    name: 'isMortgage',
    focus: () => (document.querySelector('input[name=isMortgage]') as HTMLElement).focus(),
  },
  {
    name: 'releaseYear',
    focus: () => (document.querySelector('input[name=releaseYear]') as HTMLElement).focus(),
  },
]

export const SellRequestForm: VFC<SellRequestFormProps> = (props) => {
  const { fields, setIsScroll, onChangeStage } = props
  const [addressData, setAddressData] = useState<IAddressFormData>(
    props.addressData || { address: '' },
  )
  const [aptData, setAptData] = useState<ApartmentFormValues>()
  const [regData, setRegData] = useState<RegistrationFormValues>()
  const [stage, setStage] = useState<Stage>('apartment')
  const ref = useRef(null)
  const { executeRecaptcha } = useGoogleReCaptcha()
  useEffect(() => {
    onChangeStage?.(stage)
  }, [stage, onChangeStage])
  const changeStage = (newStage: Stage) => {
    setStage(newStage)
  }
  const onConfirmationSuccess = (token?: string, userId?: number) => {
    Cookies.set('token', String(token), {
      domain: config.domain,
      expires: SITE.COOKIES_EXPIRES,
      sameSite: 'lax',
    })
    Cookies.set('userId', String(userId), {
      domain: config.domain,
      expires: SITE.COOKIES_EXPIRES,
      sameSite: 'lax',
    })
    clearStoredData(props.localStorageKey)
    props.onSuccess?.()
  }
  const setAddressDataAndStoreIt = (data: IAddressFormData): void => {
    setAddressData(data)
    const storedData = getStoredData(props.localStorageKey)
    setStoredData(props.localStorageKey, { ...storedData, address: data })
  }
  const setAptDataAndStoreIt = (data: ApartmentFormValues) => {
    setAptData(data)
    const storedData = getStoredData(props.localStorageKey)
    setStoredData(props.localStorageKey, { ...storedData, apt: data })
  }

  const focusOnError = useMemo(() => createDecorator<ApartmentFormValues>(() => listInput), [])

  useEffect(() => {
    if (window.innerWidth < 767 || (window.innerWidth < 991 && window.innerHeight < 414)) {
      document.body.classList.add('scroll-disabled')
    }
    const storedData = getStoredData(props.localStorageKey)
    setStoredData(props.localStorageKey, { ...storedData, address: props.addressData })
    if (storedData.apt) {
      setAptData({ ...storedData.apt, address: props.addressData?.address || '' })
    }
    return () => {
      document.body.classList.remove('scroll-disabled')
    }
  }, [props.localStorageKey, props.addressData])

  const [, setInitialValues] = useState({})

  useEffect(() => {
    const values = Object.keys(checklistSettings).reduce<{
      [key: string]: string | number | string[] | null | boolean
    }>((acc, key) => {
      const value = checklistSettings[key as keyof typeof checklistSettings]?.initial

      if (value) {
        acc[key] = value
      }

      return acc
    }, {})

    setInitialValues(values)
  }, [])

  const handleSubmit = (values: ApartmentFormValues) => {
    const isNotRenovation =
      Array.isArray(values.peculiarities) &&
      (values.peculiarities.length >= 2 || values.peculiarities.includes('fire'))
    if (isNotRenovation) values.renovationType = ['none']
    setAddressDataAndStoreIt({ address: '' + (values?.address ?? '') })
    setAptDataAndStoreIt(values)
    setAptData(values)
    changeStage('apt-check')
  }

  const sendChecklist = async (aptData: ApartmentFormValues, regData: RegistrationFormValues) => {
    const recaptchaToken = config.isDev
      ? config.devRecaptchaToken
      : (await executeRecaptcha?.('register')) ?? null
    const room: keyof typeof UserpanelEnterWithCheckListRequestRoomTypeEnum = `NUMBER_${aptData.roomType[0]}`
    const isInOperation = aptData.isInOperation[0] === 'true'
    const hasRenovation =
      aptData.renovationType?.[0] === 'fresh' || aptData.renovationType?.[0] === 'cosmetic'
    const isOwnership = isInOperation
      ? aptData.isOwnership
        ? JSON.parse(aptData.isOwnership[0])
        : null
      : null
    let isTransferAcceptanceCertificate

    if (isInOperation) {
      if (isOwnership) {
        isTransferAcceptanceCertificate = null
      } else {
        isTransferAcceptanceCertificate = aptData.isTransferAcceptanceCertificate
          ? JSON.parse(aptData.isTransferAcceptanceCertificate[0])
          : null
      }
    } else {
      isTransferAcceptanceCertificate = null
    }

    const params = {
      address: addressData.address,
      area: aptData.area,
      floor: aptData.floor,
      gaId: Cookies.get('_ga') || null,
      name: regData.name,
      phone: regData.phone.replace(/\D/g, ''),
      price: aptData.price,
      renovationType: isInOperation
        ? (aptData
            .renovationType[0] as unknown as UserpanelEnterWithCheckListRequestRenovationTypeEnum)
        : UserpanelEnterWithCheckListRequestRenovationTypeEnum.None,
      renovationYear: isInOperation && hasRenovation ? aptData.renovationYear ?? null : null,
      objectType: aptData.objectType[0],
      roomType: UserpanelEnterWithCheckListRequestRoomTypeEnum[room],
      needExchange: props.pageSlug !== SLUG.EXCHANGE,
      recaptchaToken: config.isDev ? config.devRecaptchaToken : recaptchaToken,
      isInOperation,
      isOwnership,
      isTransferAcceptanceCertificate,
      isMortgage: aptData.isMortgage[0] === 'true',
      peculiarities: aptData.peculiarities,
      releaseQuarter: aptData.releaseQuarter && Number(aptData.releaseQuarter),
      releaseYear: aptData.releaseYear,
      developer: Array.isArray(aptData.developer) ? aptData.developer[0] : undefined,
      source: config.domain,
      allowMarketing: regData.allowMarketing || undefined,
    }

    const res = await getSaleApplication(params)
    if (res?.errors?.length) {
      // @ts-ignore todo: fix error
      return { [FORM_ERROR]: res.errors[0].message }
    }
    if (!res?.body?.status) {
      return { [FORM_ERROR]: ERROR_UNDEFINED_MESSAGE }
    }
  }

  const handleConfirmationSubmit = async (values: ConfirmationFormValues) => {
    if (!regData) return
    const recaptchaToken = config.isDev
      ? config.devRecaptchaToken
      : await executeRecaptcha?.('signin')
    const { body } = await login({
      phone: regData.phone.replace(/\D/g, ''),
      smsCode: values.code.join(''),
      source: config.domain,
      recaptchaToken: recaptchaToken ?? null,
    })
    if (!body) {
      return
    }
    if (!body.status) {
      analyticEvents.errorSmsCode()
      return { code: UNKNOWN_ERROR }
    }
    analyticEvents.sendSmsCode()
    onConfirmationSuccess(body.token, body.userId)
  }

  const onClickSmsRepeat = async () => {
    if (!aptData || !regData) {
      return { [FORM_ERROR]: ERROR_UNDEFINED_MESSAGE }
    }
    return sendChecklist(aptData, regData)
  }

  const handleRegistrationSubmit = async (values: RegistrationFormValues) => {
    setRegData(values)
    if (!aptData) {
      return { [FORM_ERROR]: ERROR_UNDEFINED_MESSAGE }
    }
    const errors = await sendChecklist(aptData, values)
    if (errors !== undefined) return errors
    changeStage('sms-confirm')
  }

  useEffect(() => {
    if (setIsScroll) {
      stage === 'apt-check' && setIsScroll(true)
      setTimeout(() => setIsScroll(false), 200)
    }
  }, [setIsScroll, stage])

  return (
    <div ref={ref}>
      {(stage === 'apartment' || stage === 'conditions') && (
        <Form<ApartmentFormValues>
          initialValues={aptData ?? { address: addressData.address, releaseQuarter: '1' }}
          onSubmit={handleSubmit}
          mutators={{ ...arrayMutators }}
          //@ts-ignore bug in final-form types declaration, fixed in  v4.20.3
          decorators={[focusOnError]}
        >
          {(props) => <ApartmentForm {...props} settings={checklistSettings} fields={fields} />}
        </Form>
      )}
      {stage === 'apt-check' && aptData !== undefined && (
        <InfoOutput
          fields={fields}
          aptData={aptData}
          onBack={() => {
            changeStage('apartment')
            analyticEvents.backSecondStep()
          }}
          onNext={() => {
            changeStage('register')
            analyticEvents.nextSecondStep()
          }}
          settings={checklistSettings}
        />
      )}
      {stage === 'register' && (
        <Form<RegistrationFormValues>
          initialValues={{
            allowMarketing: checklistSettings.allowMarketing.initial,
            privacyPolicy: checklistSettings.privacyPolicy.initial,
          }}
          onSubmit={handleRegistrationSubmit}
        >
          {(props) => (
            <RegistrationForm
              {...props}
              settings={checklistSettings}
              onBack={() => {
                changeStage('apt-check')
              }}
            />
          )}
        </Form>
      )}
      {stage === 'sms-confirm' && (
        <Form<ConfirmationFormValues>
          initialValues={{
            code: ['', '', '', ''],
          }}
          onSubmit={handleConfirmationSubmit}
        >
          {(props) => (
            <ConfirmationForm
              {...props}
              phone={regData?.phone ?? ''}
              onBack={() => {
                changeStage('register')
              }}
              onSmsRepeat={onClickSmsRepeat}
            />
          )}
        </Form>
      )}
    </div>
  )
}
