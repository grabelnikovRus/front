import cn from 'classnames'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState, VFC } from 'react'
import { FormRenderProps } from 'react-final-form'

import { Field } from '@/lib/forms'
import { formatPhone } from '@/lib/forms/mask'
import { trackEvent } from '@/lib/tracking'
import { useMediaSmallScreen } from '@/lib/use-media'
import { getProfile, ProfileEntity } from '@/modules/userpanel'
import { Button, Checkbox, InputBox } from '@/uikit'
import { InputText } from '@/uikit/filter/input-text/input-text'

import styles from './lead-apartment-form.module.scss'

import { leadApartmentSettings as settings } from '../lead-apartment-settings'

export interface LeadApartmentFormValues {
  name: string
  phone: string
  allowMarketing: boolean | null
  privacyPolicy: boolean | null
}

type LeadApartmentFormProps = FormRenderProps<LeadApartmentFormValues>

export const LeadApartmentForm: VFC<LeadApartmentFormProps> = ({
  form,
  handleSubmit,
  submitting,
  touched,
  invalid,
  submitError,
}) => {
  const [userInfo, setUserInfo] = useState<ProfileEntity>({ name: '', phone: '' })
  const { pathname } = useRouter()
  const isApartment = pathname === '/apartment/[id]'

  const isSmallScreen = useMediaSmallScreen()
  const checkboxTheme = useMemo(() => (isSmallScreen ? 'dark' : undefined), [isSmallScreen])

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      getProfile(token).then(({ name, phone }) => {
        setUserInfo({ name: name ?? '', phone: phone ? formatPhone(phone) : '' })
        form.change('name', name ?? '')
        form.change('phone', phone ? formatPhone(phone) : '')
      })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <form
      className={cn(styles.form, {
        [styles.form___apartment]: isApartment,
      })}
      method="dialog"
      onSubmit={handleSubmit}
    >
      <div className={styles.form_inner}>
        <Field
          name="name"
          validation={settings.name.validation}
          render={({ input, meta }) => (
            <InputBox
              htmlFor="name"
              label={settings.name.title}
              theme="colored"
              error={meta.submitFailed && (meta.error || meta.submitError)}
            >
              <InputText
                {...input}
                autoCapitalize="words"
                autoComplete="name"
                id="name"
                type="text"
                name={input.name}
                onInput={input.onChange}
                onBlur={() =>
                  trackEvent({
                    category: 'Funnel Viewing Flats',
                    name: 'Filled in the Name in the screen Sign up for Viewing',
                    label: 'Name in the screen Sign up for Viewing',
                  })
                }
                placeholder={settings.name.placeholder ?? ''}
                results={5}
                value={meta.visited && meta.modified ? input.value : (userInfo?.name as string)}
              />
            </InputBox>
          )}
        />
        <Field
          name="phone"
          mask="phone"
          validation={settings.phone.validation}
          render={({ input, meta }) => (
            <InputBox
              htmlFor="phone"
              label={settings.phone.title}
              theme="colored"
              error={meta.touched && (meta.error || meta.submitError)}
            >
              <InputText
                {...input}
                autoComplete="tel"
                inputMode="tel"
                name={input.name}
                onInput={input.onChange}
                onBlur={() =>
                  trackEvent({
                    category: 'Funnel Viewing Flats',
                    name: 'Filled in the Phone in the screen Sign up for Viewing',
                    label: 'Phone in the screen Sign up for Viewing',
                  })
                }
                placeholder={settings.phone.placeholder ?? ''}
                results={5}
                type="tel"
                value={meta.visited && meta.modified ? input.value : (userInfo?.phone as string)}
                id="phone"
              />
            </InputBox>
          )}
        />
        <div>
          <Field
            name="allowMarketing"
            type={settings.allowMarketing.type}
            validation={settings.allowMarketing.validation}
            render={({ input }) => (
              <Checkbox
                {...input}
                theme={checkboxTheme}
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
                theme={checkboxTheme}
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
        <Button
          type="submit"
          size="full"
          disabled={submitting || invalid}
          externalStyles={styles.form_submit}
          onClick={() =>
            trackEvent({
              category: 'Funnel Viewing Flats',
              name: 'Clicked Sign up in the Sign up for Viewing screen',
              label: 'Sign up in the Sign up for Viewing screen',
            })
          }
        >
          {submitting ? 'Подождите…' : 'Записаться на просмотр'}
        </Button>
      </div>
      {touched && <span className={styles.form_error}>{submitError}</span>}
    </form>
  )
}
