/* eslint-disable max-lines,@typescript-eslint/no-explicit-any,no-use-before-define */ // todo: RUS-122

import Fade from '@material-ui/core/Fade'
import Input from '@material-ui/core/Input'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import cn from 'classnames'
import Cookies from 'js-cookie'
import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
  VFC,
  MouseEvent,
  useCallback,
} from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

import { FORM, PAGE, SITE, config } from '@/config'
import { maskPhone } from '@/legacy/lib/form'
import { updateUser } from '@/lib/tracking'
import { PagesEntity } from '@/modules/pages'
import {
  signIn,
  SignInRequest,
  signUp,
  SignUpRequest,
  login,
  LoginRequest,
} from '@/modules/userpanel'
import { Button, SvgClose, SvgLk, Logo, Checkbox } from '@/uikit'

import { analyticEvents } from './login-analytic-events'
import classes from './login.module.scss'

interface FormSignin {
  'user-phone': HTMLInputElement
}
interface FormSignup {
  'user-name': HTMLInputElement
  'user-phone': HTMLInputElement
}
interface FormSms {
  'sms-code': HTMLInputElement
}

const {
  LEAD: {
    SMS_INTERVAL,
    SMS_TIMEOUT,
    USER_NAME_MAXLENGTH,
    USER_NAME_MAXLENGTH_MESSAGE,
    USER_NAME_MINLENGTH,
    USER_NAME_MINLENGTH_MESSAGE,
    USER_NAME_PATTERN,
    USER_NAME_PATTERN_MESSAGE,
    USER_NAME_REQUIRED,
    USER_NAME_REQUIRED_MESSAGE,
    USER_PHONE_MAXLENGTH,
    USER_PHONE_MAXLENGTH_MESSAGE,
    USER_PHONE_MINLENGTH,
    USER_PHONE_MINLENGTH_MESSAGE,
    USER_PHONE_PATTERN,
    USER_PHONE_PATTERN_MESSAGE,
    USER_PHONE_REQUIRED,
    USER_PHONE_REQUIRED_MESSAGE,
  },
} = FORM
const { COOKIES_EXPIRES } = SITE
const mapSigninRequest = (
  form: HTMLFormElement & EventTarget & FormSignin,
  recaptchaToken: string | null,
): SignInRequest => {
  const userPhone = form['user-phone'].value
  return {
    gaId: Cookies.get('_ga') || null,
    phone: userPhone.replace(/\D/g, ''),
    recaptchaToken: config.isDev ? config.devRecaptchaToken : recaptchaToken,
    source: config.domain,
  }
}
const mapSignupRequest = (
  form: HTMLFormElement & EventTarget & FormSignup,
  recaptchaToken: string | null,
): SignUpRequest => {
  const userName = form['user-name'].value
  const userPhone = form['user-phone'].value
  const allowMarketing = form['allowMarketing'].checked
  return {
    gaId: Cookies.get('_ga') || null,
    name: userName,
    phone: userPhone.replace(/\D/g, ''),
    recaptchaToken: config.isDev ? config.devRecaptchaToken : recaptchaToken,
    source: config.domain,
    allowMarketing,
  }
}
const mapLoginRequest = (
  form: HTMLFormElement & EventTarget & FormSms,
  userPhone: string,
  recaptchaToken: string | null,
): LoginRequest => {
  const smsCode = [form['sms-code-1'], form['sms-code-2'], form['sms-code-3'], form['sms-code-4']]
    .filter((el: HTMLInputElement) => el.value.length === 1)
    .map((el: HTMLInputElement) => el.value)
    .join('')
  return {
    phone: userPhone.replace(/\D/g, ''),
    smsCode,
    recaptchaToken: config.isDev ? config.devRecaptchaToken : recaptchaToken,
    source: config.domain,
  }
}
let smsTimeoutValue: number

export interface LoginProps {
  closeLocation: () => void
  legalWidgetPresent?: boolean
  open: boolean
  openLocation: () => void
  pageSlug: string
  pages: PagesEntity
  className?: string
}

export const Login: VFC<LoginProps> = (props) => {
  const [formSigninClass, setFormSigninClass] = useState('')
  const [formSignupClass, setFormSignupClass] = useState(classes.d_none)
  const [formSmsClass, setFormSmsClass] = useState(classes.d_none)
  const [formCurrent, setFormCurrent] = useState('signin')
  const [modalOpened, setModalOpened] = useState(false)
  const [notificationPendingClass, setNotificationPendingClass] = useState(classes.d_none)
  const [notificationRejectedClass, setNotificationRejectedClass] = useState(classes.d_none)
  const [redirectClass, setRedirectClass] = useState(classes.d_none)
  const [smsCodeClass, setSmsCodeClass] = useState(classes.smsBlock)
  const [smsCodeError, setSmsCodeError] = useState('')
  const [smsIntervalId, setSmsIntervalId] = useState(NaN)
  const [smsRepeatAllowed, setSmsRepeatAllowed] = useState(false)
  const [smsTimeout, setSmsTimeout] = useState<number>(SMS_TIMEOUT)
  const [submitClass, setSubmitClass] = useState(classes.d_none)
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const [submitText, setSubmitText] = useState('Получить код')
  const [userNameClass, setUserNameClass] = useState('')
  const [userNameMessage, setUserNameMessage] = useState('')
  const [userPhoneSignin, setUserPhoneSignin] = useState('')
  const [userPhoneSigninClass, setUserPhoneSigninClass] = useState(classes.d_none)
  const [userPhoneSigninMessage, setUserPhoneSigninMessage] = useState('')
  const [userPhoneSignup, setUserPhoneSignup] = useState('')
  const [userPhoneSignupClass, setUserPhoneSignupClass] = useState('')
  const [userPhoneSignupMessage, setUserPhoneSignupMessage] = useState('')
  const [errorsMessage, setErrorsMessage] = useState([])
  const [coordinateX, setCoordinateX] = useState(0)
  const [stepsLogin, setStepsLogin] = useState('')
  const [checkPrivacyPolicy, setCheckPrivacyPolicy] = useState(true)
  const fieldSmsRef = useRef<HTMLInputElement>(null)
  const formSigninRef = useRef<HTMLFormElement & FormSignin>(null)
  const formSignupRef = useRef<HTMLFormElement & FormSignup>(null)
  const formSmsRef = useRef<HTMLFormElement & FormSms>(null)
  const { executeRecaptcha } = useGoogleReCaptcha()
  const getPageSlug = () => {
    if (props.legalWidgetPresent) {
      return PAGE.SLUG_LEGAL
    }

    return props.pageSlug
  }
  const onClickModalClose = () => {
    const timeoutId = window.setTimeout(() => {
      setFormSigninClass('')
      setFormSignupClass(classes.d_none)
      setFormSmsClass(classes.d_none)
      setNotificationRejectedClass(classes.d_none)
      window.clearTimeout(timeoutId)
    }, 250)

    setModalOpened(false)

    //// Commented because of trigering for many different events because of
    //// calling this function on document.addEventListener('mousedown', onMouseHandler)
    // if (formCurrent === 'signin') {
    //   trackEvent({
    //     category: 'Authorization',
    //     label: 'Сlose the form Login to the office in Authorization',
    //     name: 'Clicked the icon to close the form Login to the office',
    //   })

    //   return
    // }

    // trackEvent({
    //   category: 'Registration',
    //   label: 'Сlose icon in the registration form in Registration',
    //   name: 'Clicked on the close icon in the registration form',
    // })
  }
  const onClickModalOpen = (e: MouseEvent<HTMLButtonElement>) => {
    setCoordinateX(document.documentElement.clientWidth - e.clientX)
    props.closeLocation()
    setModalOpened(true)
    setFormCurrent('signin')
    analyticEvents.openModal()
  }
  const onClickSwitchSignin = () => {
    setFormSigninClass('')
    setFormSignupClass(classes.d_none)
    setStepsLogin('')
    setFormCurrent('signin')
    analyticEvents.switchSignin()
  }
  const onClickRedirect = () => {
    location.assign(`${config.userpanelUrl}/?slug=${getPageSlug()}`)
  }
  const onClickSmsRepeat = () => {
    setNotificationPendingClass(classes.preloaderBlock)
    if (formCurrent === 'signin') {
      if (formSigninRef.current) {
        //setFormSigninClass("");
        //setFormSignupClass("d-none");
        submitSignin(formSigninRef.current)
      }
      analyticEvents.smsRepeatAuth()
    } else {
      if (formSignupRef.current) {
        //setFormSigninClass("d-none");
        //setFormSignupClass("");
        submitSignup(formSignupRef.current)
      }
      analyticEvents.smsRepeatReg()
    }
    //setFormSmsClass("d-none");
  }
  const onClickToSignin = () => {
    formSmsRef.current?.reset()
    if (stepsLogin.includes('registrationForm')) {
      setFormSignupClass(classes.registrationForm)
    } else {
      setFormSigninClass('')
    }
    setFormSmsClass(classes.d_none)

    if (formCurrent === 'signin') {
      analyticEvents.changePhoneAuth()
      return
    }

    analyticEvents.changePhoneReg()
  }
  const onClickSwitchSignup = () => {
    setFormCurrent('signup')
    setFormSigninClass(classes.d_none)
    setFormSignupClass(classes.registrationForm)
    analyticEvents.switchSignup()
  }
  const onKeydownSmsCode = async (event: KeyboardEvent<HTMLDivElement>) => {
    const form: (HTMLFormElement & FormSms) | null = formSmsRef.current

    setSmsCodeClass(classes.smsBlock)
    setSmsCodeError('')
    if (form) {
      const field = event.target as HTMLInputElement
      const key = event.key
      const focusedFieldCount = Number(field.name.replace(/\D/g, ''))

      if (focusedFieldCount > 1 && key === 'Backspace') {
        if (field.value === '') form['sms-code-' + (focusedFieldCount - 1)].focus()
        else field.value = ''
      }
    }
  }
  const onInputSmsCode = async (event: FormEvent<HTMLInputElement>) => {
    const form: (HTMLFormElement & FormSms) | null = formSmsRef.current

    setSmsCodeClass(classes.smsBlock)
    setSmsCodeError('')
    if (form) {
      const field = event.target as HTMLInputElement
      const focusedFieldCount = Number(field.name.replace(/\D/g, ''))
      const value = field.value

      if (focusedFieldCount === 1 && value.length === 4) {
        form['sms-code-1'].value = value[0]
        form['sms-code-2'].value = value[1]
        form['sms-code-3'].value = value[2]
        form['sms-code-4'].value = value[3]
      } else field.value = value[0]

      const recaptchaToken = config.isDev
        ? config.devRecaptchaToken
        : await executeRecaptcha?.('signin')
      const req = mapLoginRequest(
        form,
        formCurrent === 'signin' ? userPhoneSignin : userPhoneSignup,
        recaptchaToken ?? null,
      )

      if (req['smsCode'].length === 4) {
        setNotificationPendingClass(classes.preloaderBlock)
        let errors
        let body

        try {
          ;({ body, errors } = await login(req))
        } catch (err: any) {
          errors = err
          setErrorsMessage(errors)
          setFormSmsClass(classes.d_none)
          setNotificationRejectedClass(classes.successBlock)
        }

        setNotificationPendingClass(classes.d_none)

        if (errors.length) {
          const errorSms = errors.find(
            (error: any) =>
              error.field === 'sms_code' ||
              // @todo Return error field from API always.
              error.field === null,
          )

          if (errorSms) {
            if (formCurrent === 'signin') {
              analyticEvents.errorSmsAuth()
            } else {
              analyticEvents.errorSmsReg()
            }
            setSmsCodeClass(`${classes.smsBlock} ${classes.error}`)
            setSmsCodeError(
              // @todo Return error message from API.
              {
                'The key "password" must be a string.': 'Значение не должно быть пустым',
              }[errorSms.message as 'The key "password" must be a string.'] || errorSms.message,
            )
          }
        } else {
          Cookies.set('token', String(body?.token), {
            domain: config.domain,
            expires: COOKIES_EXPIRES,
            sameSite: 'lax',
          })
          Cookies.set('userId', String(body?.userId), {
            domain: config.domain,
            expires: COOKIES_EXPIRES,
            sameSite: 'lax',
          })
          updateUser(Cookies.get('userId'))
          location.assign(`${config.userpanelUrl}/?slug=${getPageSlug()}`)

          if (formCurrent === 'signin') {
            analyticEvents.errorSmsAuth()
          } else {
            analyticEvents.entersCodeReg()
          }
        }
      } else {
        const focusedFieldCount = Number(field.name.replace(/\D/g, ''))

        if (
          (focusedFieldCount === 1 || focusedFieldCount === 2 || focusedFieldCount === 3) &&
          field.value
        ) {
          form['sms-code-' + (focusedFieldCount + 1)].focus()
        }
      }
    }
  }
  const onSubmitSignin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    analyticEvents.submitSignin()
    submitSignin(event.target as HTMLFormElement & EventTarget & FormSignin)
  }
  const onSubmitSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    analyticEvents.submitSignup()
    submitSignup(event.target as HTMLFormElement & EventTarget & FormSignup)
  }
  const submitSignin = async (form: HTMLFormElement & EventTarget & FormSignin) => {
    const userPhoneValue = form['user-phone'].value
    let userPhoneValid = true

    setSubmitDisabled(true)
    setSubmitText('Подождите…')
    setUserPhoneSignin(userPhoneValue)
    setUserPhoneSigninClass('')
    setUserPhoneSigninMessage('')
    if (!userPhoneValue && USER_PHONE_REQUIRED) {
      setUserPhoneSigninClass('error')
      setUserPhoneSigninMessage(USER_PHONE_REQUIRED_MESSAGE)
      userPhoneValid = false
    } else if (userPhoneValue.length > USER_PHONE_MAXLENGTH) {
      setUserPhoneSigninClass('error')
      setUserPhoneSigninMessage(USER_PHONE_MAXLENGTH_MESSAGE)
      userPhoneValid = false
    } else if (userPhoneValue.length < USER_PHONE_MINLENGTH) {
      setUserPhoneSigninClass('error')
      setUserPhoneSigninMessage(USER_PHONE_MINLENGTH_MESSAGE)
      userPhoneValid = false
    } else if (!RegExp(USER_PHONE_PATTERN).test(userPhoneValue)) {
      setUserPhoneSigninClass('error')
      setUserPhoneSigninMessage(USER_PHONE_PATTERN_MESSAGE)
      userPhoneValid = false
    }

    if (!userPhoneValid) {
      analyticEvents.errorPhoneAuth()
    }

    if (userPhoneValid) {
      const recaptchaToken = config.isDev
        ? config.devRecaptchaToken
        : await executeRecaptcha?.('signin')
      const req = mapSigninRequest(form, recaptchaToken ?? null)
      let errors

      try {
        ;({ errors } = await signIn(req))
      } catch (err: any) {
        errors = err
        setErrorsMessage(errors)
        setFormSigninClass(classes.d_none)
        setFormSignupClass(classes.d_none)
        setNotificationRejectedClass(classes.successBlock)
        setModalOpened(true)
      }

      setNotificationPendingClass(classes.d_none)

      if (errors.length) {
        const errorPhone = errors.find(
          (error: any) =>
            error.field === 'phone' ||
            // @todo Return error field from API always.
            error.field === null,
        )

        if (errorPhone) {
          setUserPhoneSigninClass('error')
          setUserPhoneSigninMessage(errorPhone.message)
          analyticEvents.userNotFoundError()
        }
      } else {
        setSmsTimeout(SMS_TIMEOUT)
        smsTimeoutValue = SMS_TIMEOUT
        window.clearInterval(smsIntervalId)
        setSmsIntervalId(
          window.setInterval(() => {
            if (smsTimeoutValue > 1) setSmsTimeout((smsTimeoutValue -= SMS_INTERVAL))
            else {
              setSmsRepeatAllowed(true)
              window.clearInterval(smsIntervalId)
            }
          }, SMS_INTERVAL),
        )
        setSmsCodeClass(classes.smsBlock)
        setSmsCodeError('')
        setSmsRepeatAllowed(false)
        setFormCurrent('signin')
        setFormSigninClass(classes.d_none)
        setFormSignupClass(classes.d_none)
        setFormSmsClass('')
        if (fieldSmsRef) fieldSmsRef.current?.focus()
      }
    }
    setSubmitDisabled(false)
    setSubmitText('Получить код')
  }
  const submitSignup = async (form: HTMLFormElement & EventTarget & FormSignup) => {
    const userNameValue = form['user-name'].value
    const userPhoneValue = form['user-phone'].value
    let userNameValid = true
    let userPhoneValid = true

    setSubmitDisabled(true)
    setSubmitText('Подождите…')
    setUserNameClass('')
    setUserNameMessage('')
    setUserPhoneSignup(form['user-phone'].value)
    setUserPhoneSignupClass('')
    setUserPhoneSignupMessage('')
    if (!userNameValue && USER_NAME_REQUIRED) {
      setUserNameClass('error')
      setUserNameMessage(USER_NAME_REQUIRED_MESSAGE)
      userNameValid = false
    } else if (userNameValue.length > USER_NAME_MAXLENGTH) {
      setUserNameClass('error')
      setUserNameMessage(USER_NAME_MAXLENGTH_MESSAGE)
      userNameValid = false
    } else if (userNameValue.length < USER_NAME_MINLENGTH) {
      setUserNameClass('error')
      setUserNameMessage(USER_NAME_MINLENGTH_MESSAGE)
      userNameValid = false
    } else if (!RegExp(USER_NAME_PATTERN).test(userNameValue)) {
      setUserNameClass('error')
      setUserNameMessage(USER_NAME_PATTERN_MESSAGE)
      userNameValid = false
    }
    if (!userPhoneValue && USER_PHONE_REQUIRED) {
      setUserPhoneSignupClass('error')
      setUserPhoneSignupMessage(USER_PHONE_REQUIRED_MESSAGE)
      userPhoneValid = false
    } else if (userPhoneValue.length > USER_PHONE_MAXLENGTH) {
      setUserPhoneSignupClass('error')
      setUserPhoneSignupMessage(USER_PHONE_MAXLENGTH_MESSAGE)
      userPhoneValid = false
    } else if (userPhoneValue.length < USER_PHONE_MINLENGTH) {
      setUserPhoneSignupClass('error')
      setUserPhoneSignupMessage(USER_PHONE_MINLENGTH_MESSAGE)
      userPhoneValid = false
    } else if (!RegExp(USER_PHONE_PATTERN).test(userPhoneValue)) {
      setUserPhoneSignupClass('error')
      setUserPhoneSignupMessage(USER_PHONE_PATTERN_MESSAGE)
      userPhoneValid = false
    }
    if (!userNameValid) {
      analyticEvents.errorNameReg()
    }
    if (!userPhoneValid) {
      analyticEvents.errorPhoneReg()
    }
    if (userNameValid && userPhoneValid) {
      const recaptchaToken = config.isDev
        ? config.devRecaptchaToken
        : await executeRecaptcha?.('signin')
      const req = mapSignupRequest(form, recaptchaToken ?? null)
      let errors

      try {
        ;({ errors } = await signUp(req))
      } catch (err: any) {
        errors = err
        setErrorsMessage(errors)
        setFormSigninClass(classes.d_none)
        setFormSignupClass(classes.d_none)
        setNotificationRejectedClass(classes.successBlock)
        setModalOpened(true)
      }

      setNotificationPendingClass(classes.d_none)

      if (errors.length) {
        const errorName = errors.find((error: any) => error.field === 'name')
        const errorPhone = errors.find(
          (error: any) =>
            error.field === 'phone' ||
            // @todo Return error field from API always.
            error.field === null,
        )

        if (errorName) {
          setUserNameClass('error')
          setUserNameMessage(errorName.message)
        }
        if (errorPhone) {
          if (errorPhone?.code && errorPhone.code === 2000) {
            analyticEvents.notRegUserError()
          }
          setUserPhoneSignupClass('error')
          setUserPhoneSignupMessage(errorPhone.message)
        }
      } else {
        setSmsTimeout(SMS_TIMEOUT)
        smsTimeoutValue = SMS_TIMEOUT
        window.clearInterval(smsIntervalId)
        setSmsIntervalId(
          window.setInterval(() => {
            if (smsTimeoutValue > 1) setSmsTimeout((smsTimeoutValue -= SMS_INTERVAL))
            else {
              setSmsRepeatAllowed(true)
              window.clearInterval(smsIntervalId)
            }
          }, SMS_INTERVAL),
        )
        setSmsCodeClass(classes.smsBlock)
        setSmsCodeError('')
        setSmsRepeatAllowed(false)
        setFormCurrent('signup')
        setFormSigninClass(classes.d_none)
        setFormSignupClass(classes.d_none)
        setFormSmsClass('')
        if (fieldSmsRef) fieldSmsRef.current?.focus()
      }
    }
    setSubmitDisabled(false)
    setSubmitText('Получить код')
  }

  const onMouseHandler = useCallback((event) => {
    if (!event) return

    const path = event.path || event.composedPath()

    if (!path) return

    const closes = path.map((el: HTMLElement) => el.classList?.contains('dont-close'))

    if (closes.findIndex((x: boolean | undefined) => x === true) === -1) {
      onClickModalClose()
    }
  }, [])

  useEffect(() => {
    if (!Cookies.get('token')) {
      setSubmitClass(cn(classes.button__blue, classes.button))
      setUserPhoneSigninClass('')
    } else setRedirectClass(cn(classes.button__blue, classes.button))
    document.addEventListener('mousedown', onMouseHandler)

    return () => document.removeEventListener('mousedown', onMouseHandler)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <button className={props.className} onClick={onClickModalOpen} data-testid="header__login">
        <SvgLk />
      </button>
      <Modal
        aria-describedby="transition-modal-description"
        aria-labelledby="transition-modal-title"
        closeAfterTransition
        hideBackdrop
        onClose={onClickModalClose}
        open={modalOpened}
        style={{ zIndex: 15 }}
      >
        <Fade in={modalOpened}>
          <div className={classes.loginWrap} style={{ right: coordinateX }}>
            <div className={'dont-close ' + classes.loginForm}>
              <div className={classes.mobileView}>
                <div className={classes.logo}>
                  <Logo theme="light" />
                </div>
                <button className={classes.closeBtn} onClick={onClickModalClose}>
                  <SvgClose />
                </button>
              </div>
              <form
                className={formSignupClass}
                method="dialog"
                onSubmit={onSubmitSignup}
                ref={formSignupRef}
              >
                <h3>Регистрация</h3>
                <label className={userNameClass}>
                  <span className={classes.label}>Ваше имя</span>
                  <div className="helperBlock">
                    <TextField
                      autoCapitalize="words"
                      autoComplete="name"
                      classes={{ root: 'loginInput ' + classes.loginInput }}
                      inputProps={{
                        maxLength: USER_NAME_MAXLENGTH,
                      }}
                      name="user-name"
                      placeholder="Как вас зовут?"
                      results={5}
                      title="Введите ваше имя."
                      onBlurCapture={analyticEvents.userNameReg}
                    />
                    <p className="formError">{userNameMessage}</p>
                  </div>
                </label>
                <label className={userPhoneSignupClass}>
                  <span className={classes.label}>Телефон</span>
                  <div className="helperBlock">
                    <Input
                      autoComplete="tel"
                      classes={{ root: 'loginInput ' + classes.loginInput }}
                      inputMode="tel"
                      name="user-phone"
                      placeholder="+7 (- - -) - - -   - -   - -"
                      ref={(el: HTMLDivElement) => {
                        if (el) maskPhone(el.firstChild as HTMLInputElement)
                      }}
                      results={5}
                      title="Введите номер телефона."
                      type="tel"
                      disableUnderline
                      onBlurCapture={analyticEvents.phoneReg}
                    />
                    <p className="formError">{userPhoneSignupMessage}</p>
                  </div>
                </label>
                <div className={classes.confirmText}>
                  <Checkbox
                    name="allowMarketing"
                    theme="dark"
                    label={
                      <>
                        <a href="/mailing-list" target="_blank">
                          Хочу
                        </a>{' '}
                        получать новости, информацию по сделке и специальные акции от Кварта
                      </>
                    }
                  />
                  <Checkbox
                    name="privacyPolicy"
                    theme="dark"
                    checked={checkPrivacyPolicy}
                    onChange={(event) => setCheckPrivacyPolicy(event.currentTarget.checked)}
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
                </div>
                <button
                  onClick={() => setStepsLogin(formSignupClass)}
                  className={cn(classes.button__blue, classes.button)}
                  disabled={submitDisabled || !checkPrivacyPolicy}
                >
                  {submitText}
                </button>
                <button
                  className={cn(classes.button, classes.button__dark)}
                  onClick={onClickSwitchSignin}
                  type="button"
                >
                  У меня уже есть аккаунт
                </button>
              </form>
              <form
                className={cn(formSigninClass, classes.dialog)}
                method="dialog"
                onSubmit={onSubmitSignin}
                ref={formSigninRef}
              >
                <h3>Вход в кабинет</h3>
                <label className={userPhoneSigninClass}>
                  <span className={classes.label}>Телефон</span>
                  <div className="helperBlock">
                    <Input
                      autoComplete="tel"
                      classes={{ root: 'loginInput ' + classes.loginInput }}
                      inputMode="tel"
                      name="user-phone"
                      placeholder="+7 (- - -) - - -   - -   - -"
                      ref={(el: HTMLDivElement) => {
                        if (el) maskPhone(el.firstChild as HTMLInputElement)
                      }}
                      results={5}
                      title="Введите номер телефона."
                      type="tel"
                      disableUnderline
                      onBlurCapture={analyticEvents.userPhoneAuth}
                    />
                    <p className="formError">{userPhoneSigninMessage}</p>
                  </div>
                </label>
                <Button
                  mode="secondary"
                  externalStyles={redirectClass}
                  onClick={onClickRedirect}
                  type="button"
                >
                  Войти в личный кабинет
                </Button>
                <button className={submitClass}>{submitText}</button>
                <button
                  className={cn(classes.button, classes.button__dark)}
                  onClick={onClickSwitchSignup}
                  type="button"
                >
                  Ещё нет аккаунта?
                </button>
              </form>
              <form className={formSmsClass} method="dialog" ref={formSmsRef}>
                <h3>Вход в кабинет</h3>
                <div className={smsCodeClass}>
                  <div className={classes.label}>
                    <p>Код из СМС</p>
                    <p>{formCurrent === 'signin' ? userPhoneSignin : userPhoneSignup}</p>
                  </div>
                  <div className={classes.smsFields}>
                    <TextField
                      classes={{ root: classes.smsInput }}
                      inputProps={{
                        max: '9',
                        min: '0',
                        required: true,
                        size: '1',
                        step: '1',
                      }}
                      inputRef={fieldSmsRef}
                      name="sms-code-1"
                      onInput={onInputSmsCode}
                      onKeyDown={onKeydownSmsCode}
                      placeholder="0"
                      type="number"
                    />
                    <TextField
                      classes={{ root: classes.smsInput }}
                      inputProps={{
                        max: '9',
                        min: '0',
                        required: true,
                        size: '1',
                        step: '1',
                      }}
                      name="sms-code-2"
                      onInput={onInputSmsCode}
                      onKeyDown={onKeydownSmsCode}
                      placeholder="0"
                      type="number"
                    />
                    <TextField
                      classes={{ root: classes.smsInput }}
                      inputProps={{
                        max: '9',
                        min: '0',
                        required: true,
                        size: '1',
                        step: '1',
                      }}
                      name="sms-code-3"
                      onInput={onInputSmsCode}
                      onKeyDown={onKeydownSmsCode}
                      placeholder="0"
                      type="number"
                    />
                    <TextField
                      classes={{ root: classes.smsInput }}
                      inputProps={{
                        max: '9',
                        min: '0',
                        required: true,
                        size: '1',
                        step: '1',
                      }}
                      name="sms-code-4"
                      onInput={onInputSmsCode}
                      onKeyDown={onKeydownSmsCode}
                      placeholder="0"
                      type="number"
                    />
                    <p className={classes.errorText}>{smsCodeError}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className={`${classes.button} ${classes.button__dark}`}
                  onClick={onClickToSignin}
                >
                  Изменить номер телефона
                </button>
                <p className={`${classes.timer} ${smsRepeatAllowed ? classes.d_none : ''}`}>
                  Повторная отправка через {smsTimeout / SMS_INTERVAL} сек.
                </p>
                <button
                  className={cn({
                    [classes.button]: smsRepeatAllowed,
                    [classes.button__blue]: smsRepeatAllowed,
                    [classes.d_none]: !smsRepeatAllowed,
                  })}
                  onClick={onClickSmsRepeat}
                  type="reset"
                >
                  Отправить код ещё раз
                </button>
              </form>
              {/* Pending notification. */}
              <div className={notificationPendingClass}>
                <img
                  alt="preloader"
                  draggable="false"
                  src="/images/new-design/icons/preloader.svg"
                />
              </div>
              <div className={notificationRejectedClass}>
                <p className={classes.successBlock_title}>Что-то пошло не так...</p>
                {errorsMessage?.map((error: { message: string; code: number }) => (
                  <div key={error.message + error.code} className={classes.successBlock_text}>
                    {error?.message}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  )
}
