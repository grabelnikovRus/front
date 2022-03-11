import cn from 'classnames'
import { FORM_ERROR } from 'final-form'
import { useState, VFC } from 'react'
import { Field, FormRenderProps } from 'react-final-form'
import { useInterval } from 'react-use'

import { FORM } from '@/config/constants'
import { Button, InputCode, SvgPreloaderSlider } from '@/uikit'

import styles from './confirmation-form.module.scss'

import { analyticEvents } from '../analytic-events'

export interface ConfirmationFormValues {
  id: number
  code: string[]
}

const {
  LEAD: { SMS_INTERVAL, SMS_TIMEOUT },
} = FORM

export type ConfirmationFormProps = FormRenderProps<ConfirmationFormValues> & {
  phone: string
  onSmsRepeat: () => Promise<void | Record<string, string>>
  onBack: () => void
}

export const ConfirmationForm: VFC<ConfirmationFormProps> = ({
  handleSubmit,
  submitting,
  phone,
  onSmsRepeat,
  onBack,
  form,
}) => {
  const [smsTimeout, setSmsTimeout] = useState<number>(SMS_TIMEOUT)
  const [smsRepeatError, setSmsRepeatError] = useState<string | undefined>(undefined)

  const handleSmsRepeatClick = async () => {
    analyticEvents.repeatSmsCode()
    setSmsTimeout(SMS_TIMEOUT)
    setSmsRepeatError(undefined)
    form.reset()
    const result = await onSmsRepeat()
    if (result !== undefined) {
      setSmsRepeatError(result[FORM_ERROR])
    }
  }

  useInterval(() => {
    setSmsTimeout((timeout) => timeout - SMS_INTERVAL)
  }, SMS_INTERVAL)

  return (
    <div className={styles.confirmation_form}>
      <h2 className={cn(styles.confirmation_form_header)}>Введите код из СМС</h2>
      <form className={styles.confirmation_form_form} method="dialog" onSubmit={handleSubmit}>
        <Field
          name="code"
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
              theme="lighter"
              phoneNumber={phone}
              error={meta.touched ? meta.error || meta.submitError : undefined}
            />
          )}
        />
        <div className={styles.confirmation_form_repeat}>
          {smsTimeout > 0 ? (
            <div className={styles.confirmation_form_timer}>
              Повторная отправка через {smsTimeout / SMS_INTERVAL} сек.
            </div>
          ) : (
            <Button mode="back" size="medium" onClick={handleSmsRepeatClick} type="reset">
              Отправить код ещё раз
            </Button>
          )}
        </div>
        <div className={styles.confirmation_form_back}>
          <Button
            mode="back"
            size="medium"
            onClick={() => {
              onBack()
              analyticEvents.backSmsCode()
            }}
            type="button"
          >
            Назад
          </Button>
        </div>
      </form>
      {submitting && (
        <div className={styles.confirmation_form_spinner}>
          <SvgPreloaderSlider />
        </div>
      )}
      {smsRepeatError !== undefined && (
        <div className={styles.failed_block}>
          <p className={styles.failed_block_title}>Что-то пошло не так</p>
          <p className={styles.failed_block_text}>{smsRepeatError}</p>
        </div>
      )}
    </div>
  )
}
