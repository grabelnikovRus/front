import cn from 'classnames'
import { useRouter } from 'next/router'
import { useState, VFC } from 'react'
import { Field, FormRenderProps } from 'react-final-form'
import { useInterval } from 'react-use'

import { FORM } from '@/config/constants'
import { trackEvent } from '@/lib/tracking'
import { useMediaSmallScreen } from '@/lib/use-media'
import { Button, InputCode, SvgPreloaderSlider } from '@/uikit'

import styles from './sms-form.module.scss'

export interface SmsFormValues {
  id: number
  smsCode: string[]
}

const {
  LEAD: { SMS_INTERVAL, SMS_TIMEOUT },
} = FORM

type SmsFormProps = FormRenderProps<SmsFormValues> & {
  phone: string
  onSmsRepeat: () => void
}

export const SmsForm: VFC<SmsFormProps> = ({
  handleSubmit,
  submitting,
  phone,
  onSmsRepeat,
  form,
}) => {
  const [smsTimeout, setSmsTimeout] = useState<number>(SMS_TIMEOUT)

  const { pathname } = useRouter()

  const isCatalog = pathname === '/catalog' || pathname === '/catalog-map'
  const isSmallScreen = useMediaSmallScreen()
  const isLight = isCatalog && isSmallScreen

  const handleSmsRepeatClick = () => {
    setSmsTimeout(SMS_TIMEOUT)
    onSmsRepeat()
    form.reset()
    trackEvent({
      category: 'Funnel Viewing Flats',
      name: 'Clicked Send Code again on the Enter Code screen',
      label: 'Send Code again on the Enter Code screen',
    })
  }

  useInterval(() => {
    setSmsTimeout((timeout) => timeout - SMS_INTERVAL)
  }, SMS_INTERVAL)

  return (
    <div className={styles.sms_form}>
      <h2 className={cn(styles.sms_form_header, { [styles.sms_form_header___light]: isLight })}>
        Введите код из СМС
      </h2>
      <form className={styles.form} method="dialog" onSubmit={handleSubmit}>
        <Field
          name="smsCode"
          parse={(value) => value}
          render={({ input, meta }) => (
            <InputCode
              {...input}
              onChange={(values) => {
                input.onChange(values)
                if (values.every((s) => s !== '')) {
                  handleSubmit()
                }
              }}
              theme={isLight ? 'dark' : 'light'}
              phoneNumber={phone}
              error={meta.touched ? meta.error || meta.submitError : undefined}
            />
          )}
        />
        <div className={styles.sms_form_repeat}>
          {smsTimeout > 0 ? (
            <div className={styles.sms_form_timer}>
              Повторная отправка через {smsTimeout / SMS_INTERVAL} сек.
            </div>
          ) : (
            <Button mode="back" onClick={handleSmsRepeatClick} type="button">
              Отправить код ещё раз
            </Button>
          )}
        </div>
      </form>
      {submitting && (
        <div className={styles.sms_form_spinner}>
          <SvgPreloaderSlider />
        </div>
      )}
    </div>
  )
}
