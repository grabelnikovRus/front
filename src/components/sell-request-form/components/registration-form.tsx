import cn from 'classnames'
import { VFC } from 'react'
import { FormRenderProps } from 'react-final-form'

import { Field } from '@/lib/forms/field'
import { Button, Checkbox, InputBox } from '@/uikit'
import { InputText } from '@/uikit/filter/input-text/input-text'

import styles from './registration-form.module.scss'

import { analyticEvents } from '../analytic-events'
import { checklistSettings } from '../checklist-settings'

export interface RegistrationFormValues {
  name: string
  phone: string
  allowMarketing: boolean | null
  privacyPolicy: boolean | null
}

export type RegistrationFormProps = FormRenderProps<RegistrationFormValues> & {
  settings: typeof checklistSettings
  onBack: () => void
}

export const RegistrationForm: VFC<RegistrationFormProps> = ({
  handleSubmit,
  submitError,
  submitting,
  settings,
  invalid,
  onBack,
  errors,
}) => (
  <div className={styles.registration_form}>
    <h2 className={cn(styles.registration_form_header)}>Регистрация</h2>
    <form className={styles.registration_form_form} method="dialog" onSubmit={handleSubmit}>
      <div className={styles.registration_form_grid}>
        <Field
          name="name"
          validation={settings.name.validation}
          render={({ input, meta }) => (
            <InputBox
              htmlFor="name"
              label={settings.name.title}
              theme="opaque"
              error={meta.submitFailed && (meta.error || meta.submitError)}
            >
              <InputText
                {...input}
                placeholder={settings.name.placeholder ?? ''}
                id="name"
                type="text"
                onBlur={analyticEvents.name}
              />
            </InputBox>
          )}
        />
        <Field
          name="phone"
          validation={settings.phone.validation}
          mask="phone"
          render={({ input, meta }) => (
            <InputBox
              htmlFor="phone"
              label={settings.phone.title}
              theme="opaque"
              error={meta.submitFailed && (meta.error || meta.submitError)}
            >
              <InputText
                {...input}
                placeholder={settings.phone.placeholder ?? ''}
                id="phone"
                type="tel"
                onBlur={analyticEvents.phone}
              />
            </InputBox>
          )}
        />
      </div>
      <div>
        <Field
          name="allowMarketing"
          type={settings.allowMarketing.type}
          validation={settings.allowMarketing.validation}
          render={({ input }) => (
            <Checkbox
              {...input}
              label={
                <>
                  <a href="/mailing-list" target="_blank">
                    Хочу
                  </a>{' '}
                  получать новости, информацию по сделке и специальные акции от Кварта
                </>
              }
            />
          )}
        />
        <Field
          name="privacyPolicy"
          type={settings.privacyPolicy.type}
          validation={settings.privacyPolicy.validation}
          render={({ input }) => (
            <Checkbox
              {...input}
              label={
                <>
                  Я принимаю условия{' '}
                  <a href="/privacy-policy" target="_blank">
                    Политики обработки и защиты персональных данных
                  </a>
                  , даю{' '}
                  <a href="/personal-data" target="_blank">
                    согласие
                  </a>{' '}
                  на обработку персональных данных
                </>
              }
            />
          )}
        />
      </div>
      {submitError !== undefined && (
        <div className={styles.failed_block}>
          <p className={styles.failed_block_title}>Что-то пошло не так</p>
          <p className={styles.failed_block_text}>{submitError}</p>
        </div>
      )}
      <div className={styles.registration_form_buttons}>
        <Button
          mode="back"
          onClick={() => {
            onBack()
            analyticEvents.backThirdStep()
          }}
          type="button"
        >
          Назад
        </Button>
        <Button
          type="submit"
          disabled={submitting || invalid || (submitError && Object.keys(submitError).length > 0)}
          onClick={() => analyticEvents.nextThirdStep(errors)}
        >
          Далее
        </Button>
      </div>
    </form>
  </div>
)
