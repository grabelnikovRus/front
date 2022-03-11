/* eslint-disable max-lines,no-use-before-define */
import Dialog from '@material-ui/core/Dialog'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Slide from '@material-ui/core/Slide'
import SvgIcon from '@material-ui/core/SvgIcon'
import TextField from '@material-ui/core/TextField'
import { TransitionProps } from '@material-ui/core/transitions'
import cn from 'classnames'
import Cookies from 'js-cookie'
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  ReactElement,
  Ref,
  forwardRef,
  useRef,
  useState,
  VFC,
  useEffect,
} from 'react'

import { Widget } from '@/api'
import { FORM, config } from '@/config'
import { interpolate } from '@/legacy/lib/string'
import { formatPhone } from '@/lib/forms/mask'
import { trackEvent } from '@/lib/tracking'
import {
  createComplaint,
  ComplaintRequest,
  verifyComplaint,
  VerifyComplaintRequest,
} from '@/modules/complaint'
import { getProfile } from '@/modules/userpanel'
import { isTextField, WidgetFields } from '@/modules/widgets'
import { SvgClose, Button, Logo } from '@/uikit'

import styles from './complaint.module.scss'

interface FormComplaint {
  'message-text': HTMLInputElement
  'message-topic': HTMLInputElement
  'user-name': HTMLInputElement
  'user-phone': HTMLInputElement
}
interface FormSms {
  'sms-code': HTMLInputElement
}

type topic = {
  id: number
  is_default: string
  name: string
}

const {
  LEAD: { SMS_INTERVAL, SMS_TIMEOUT, USER_NAME_MAXLENGTH },
} = FORM
// eslint-disable-next-line react/display-name
const Transition = forwardRef(
  (props: TransitionProps & { children?: ReactElement }, ref: Ref<unknown>) => (
    <Slide direction="up" ref={ref} {...props} />
  ),
)
const mapComplaintRequest = (
  form: HTMLFormElement & EventTarget & FormComplaint,
): ComplaintRequest => {
  const messageText = form['message-text'].value
  const messageTopic = form['message-topic'].value
  const userName = form['user-name'].value
  const userPhone = form['user-phone'].value
  const req: ComplaintRequest = {
    authorName: userName,
    authorPhone: userPhone,
    content: messageText,
    theme: Number(messageTopic),
    source: config.domain,
  }

  return req
}
const mapComplaintSmsRequest = (
  form: HTMLFormElement & EventTarget & FormSms,
): VerifyComplaintRequest => {
  const smsCode = [form['sms-code-1'], form['sms-code-2'], form['sms-code-3'], form['sms-code-4']]
    .filter((el: HTMLInputElement) => el.value.length === 1)
    .map((el: HTMLInputElement) => el.value)
    .join('')
  const req: VerifyComplaintRequest = {
    id: requestId,
    smsCode,
  }

  return req
}
let requestId: number
let smsIntervalId: number
let smsTimeoutValue: number

export interface ComplaintProps {
  widget: Widget
  fields: WidgetFields
}

export const Complaint: VFC<ComplaintProps> = ({ fields, widget }) => {
  const [dialogOpened, setDialogOpened] = useState(false)
  const [formComplaintClass, setFormComplaintClass] = useState(styles.complaintForm)
  const [formSmsClass, setFormSmsClass] = useState('d-none')
  const [messageTextClass, setMessageTextClass] = useState('')
  const [messageTextError, setMessageTextError] = useState('')
  // @ts-ignore todo: refactor complaint component
  const topics = widget?.data.topics
  const [messageTopic, setMessageTopic] = useState(
    String(topics.find((topic: topic) => topic.is_default)?.id),
  )
  const [messageTopicClass, setMessageTopicClass] = useState('')
  const [messageTopicError, setMessageTopicError] = useState('')
  const [notificationFulfilledClass, setNotificationFulfilledClass] = useState('d-none')
  const [notificationPendingClass, setNotificationPendingClass] = useState('d-none')
  const [notificationRejectedClass, setNotificationRejectedClass] = useState('d-none')
  const [smsCodeClass, setSmsCodeClass] = useState(styles.smsContainer)
  const [smsCodeError, setSmsCodeError] = useState('')
  //[smsIntervalId, setSmsIntervalId] = useState(NaN),
  const [smsRepeatAllowed, setSmsRepeatAllowed] = useState(false)
  const [smsTimeout, setSmsTimeout] = useState<number>(SMS_TIMEOUT)
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const [submitText, setSubmitText] = useState(
    isTextField(fields.button) ? fields.button.value : 'Отправить обращение',
  )
  const [userName, setUserName] = useState('')
  const [userNameClass, setUserNameClass] = useState('')
  const [userNameError, setUserNameError] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userPhoneClass, setUserPhoneClass] = useState('')
  const [userPhoneError, setUserPhoneError] = useState('')
  const fieldSmsRef = useRef<HTMLInputElement>(null)
  const formComplaintRef = useRef<HTMLFormElement & FormComplaint>(null)
  const formSmsRef = useRef<HTMLFormElement & FormSms>(null)
  const menuProps = {
    anchorOrigin: {
      horizontal: 'center' as number | 'center' | 'left' | 'right',
      vertical: 'bottom' as number | 'bottom' | 'center' | 'top',
    },
    getContentAnchorEl: null,
    transformOrigin: {
      horizontal: 'center' as number | 'center' | 'left' | 'right',
      vertical: 'top' as number | 'bottom' | 'center' | 'top',
    },
  }
  const onClick = () => {
    setDialogOpened(true)
    trackEvent({
      category: 'Wrong',
      label: 'Did something go Wrong',
      name: 'Clicked the button Did something go Wrong?',
    })
  }
  const onClickSmsRepeat = () => {
    const form = formComplaintRef.current

    setNotificationPendingClass('preloaderBlock')
    if (form) {
      //form.reset();
      //setFormComplaintClass(styles.complaintForm);
      submitComplaint(form)
    }
    //setFormSmsClass("d-none");
  }
  const onClickToComplaint = () => {
    formSmsRef.current?.reset()
    setFormComplaintClass(styles.complaintForm)
    setFormSmsClass('d-none')
  }
  const onClose = () => {
    setDialogOpened(false)

    const timeoutId = window.setTimeout(() => {
      formComplaintRef.current?.reset()
      //setFormComplaintClass(styles.complaintForm);
      setFormSmsClass('d-none')
      window.clearTimeout(timeoutId)
    }, 250)
  }
  const onChange = (event: ChangeEvent<{ value: unknown }>) =>
    setMessageTopic(event.target.value as string)
  const onKeydownSmsCode = async (event: KeyboardEvent<HTMLDivElement>) => {
    const form: (HTMLFormElement & FormSms) | null = formSmsRef.current

    setSmsCodeClass(styles.smsContainer)
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

    setSmsCodeClass(styles.smsContainer)
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

      const req = mapComplaintSmsRequest(form)

      if (req['smsCode'].length === 4) {
        setNotificationPendingClass('preloaderBlock')
        let errors

        try {
          ;({ errors } = await verifyComplaint(req))
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          errors = err
          setFormSmsClass('d-none')
          setNotificationRejectedClass(styles.successBlock)
        }

        form['sms-code-1'].value = ''
        form['sms-code-2'].value = ''
        form['sms-code-3'].value = ''
        form['sms-code-4'].value = ''

        setNotificationPendingClass('d-none')

        if (errors.length) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const errorSms = errors.find((error: any) => error.field === 'sms_code')

          if (errorSms) {
            setSmsCodeClass(`${styles.smsContainer} ${styles.sms_error}`)
            setSmsCodeError(errorSms.message)
          }
        } else {
          setFormSmsClass('d-none')
          setNotificationFulfilledClass(styles.successBlock)
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
  const onReset = (event: FormEvent<HTMLFormElement>) => {
    event.persist()
    window.setTimeout(() => {
      setMessageTopic(String(topics.find((topic: topic) => topic.is_default)?.id))
      setNotificationFulfilledClass('d-none')
      setNotificationRejectedClass('d-none')
      setFormComplaintClass(styles.complaintForm)
    })
  }
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submitComplaint(event.target as HTMLFormElement & EventTarget & FormComplaint)
  }
  const submitComplaint = async (form: HTMLFormElement & EventTarget & FormComplaint) => {
    const userPhoneValue = form['user-phone'].value

    setMessageTextClass('')
    setMessageTextError('')
    setMessageTopicClass('')
    setMessageTopicError('')
    setNotificationFulfilledClass('d-none')
    setNotificationRejectedClass('d-none')
    //setFormComplaintClass(styles.complaintForm);
    setSubmitDisabled(true)
    setSubmitText('Подождите…')
    setUserNameClass('')
    setUserNameError('')
    setUserPhone(userPhoneValue)
    setUserPhoneClass('')
    setUserPhoneError('')

    const req = mapComplaintRequest(form)
    let errors
    let body
    try {
      ;({ body, errors } = await createComplaint(req))

      if (!body) return
      requestId = body.id
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      errors = err
      setFormComplaintClass('d-none')
      setNotificationRejectedClass(styles.failedBlock)
    }

    setNotificationPendingClass('d-none')

    if (errors.length) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorAuthorName = errors.find((error: any) => error.field === 'author_name')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorAuthorPhone = errors.find((error: any) => error.field === 'author_phone')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorContent = errors.find((error: any) => error.field === 'content')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorTheme = errors.find((error: any) => error.field === 'theme')

      if (errorAuthorName) {
        setUserNameClass('error')
        setUserNameError(errorAuthorName.message)
      }
      if (errorAuthorPhone) {
        setUserPhoneClass('error')
        setUserPhoneError(errorAuthorPhone.message)
      }
      if (errorContent) {
        setMessageTextClass('error')
        setMessageTextError(errorContent.message)
      }
      if (errorTheme) {
        setMessageTopicClass('error')
        setMessageTopicError(errorTheme.message)
      }
    } else {
      setSmsTimeout(SMS_TIMEOUT)
      smsTimeoutValue = SMS_TIMEOUT
      window.clearInterval(smsIntervalId)
      //setSmsIntervalId(
      smsIntervalId = window.setInterval(() => {
        if (smsTimeoutValue > 1) setSmsTimeout((smsTimeoutValue -= SMS_INTERVAL))
        else {
          setSmsRepeatAllowed(true)
          window.clearInterval(smsIntervalId)
        }
      }, SMS_INTERVAL)
      //);
      setSmsCodeClass(styles.smsContainer)
      setSmsCodeError('')
      setSmsRepeatAllowed(false)
      setFormComplaintClass('d-none')
      setFormSmsClass(styles.smsForm)
      if (fieldSmsRef) fieldSmsRef.current?.focus()
    }
    setSubmitDisabled(false)
    isTextField(fields.button)
      ? setSubmitText(fields.button.value)
      : setSubmitText('Отправить обращение')
  }

  const onChangePhone = ({ target }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setUserPhone(formatPhone(target.value))
  }

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      getProfile(token).then(({ name, phone }) => {
        setUserName(name ?? '')
        setUserPhone(phone ? formatPhone(phone) : '')
      })
    }
  }, [])

  return (
    <>
      <div className={styles.complaint_button} onClick={onClick}>
        <Button label="Написать нам" mode="secondary" />
      </div>
      <Dialog
        TransitionComponent={Transition}
        aria-describedby="alert-dialog-slide-description"
        aria-labelledby="alert-dialog-slide-title"
        classes={{
          paper: cn(styles.complaintModal, {
            [styles['complaintModal--white']]:
              notificationFulfilledClass !== 'd-none' || notificationRejectedClass !== 'd-none',
          }),
          container: styles.complaintContainer,
        }}
        keepMounted
        onClose={onClose}
        open={dialogOpened}
      >
        <header className={styles.header}>
          {formSmsClass === styles.smsForm && (
            <button className={styles.backBtn} onClick={onClickToComplaint} type="button">
              <img alt="close" draggable="false" src="/images/new-design/icons/arrow.svg" />
            </button>
          )}
          <div
            className={cn(styles.header_logo, {
              [styles.header_logo___confirm]: formSmsClass === styles.smsForm,
            })}
          >
            <Logo theme="light" />
          </div>
          <button
            className={cn(styles.closeBtn, {
              'd-none':
                notificationFulfilledClass !== 'd-none' || notificationRejectedClass !== 'd-none',
            })}
            onClick={onClose}
          >
            <SvgClose />
          </button>
        </header>

        <form
          className={cn(styles.complaint_form, formComplaintClass)}
          method="dialog"
          onReset={onReset}
          onSubmit={onSubmit}
          ref={formComplaintRef}
        >
          {isTextField(fields.title) && <h3>{fields.title.value}</h3>}
          {isTextField(fields.subtitle) && (
            <h3 className={styles.subtitle}>{fields.subtitle.value}</h3>
          )}
          <div
            className={cn(styles.section_top, {
              [styles['section_top--error']]: userNameError,
            })}
          >
            <label className={`complaintInputLabel ${styles.formBlock} ${userNameClass}`}>
              {isTextField(fields.name_label) && (
                <span className={styles.label}>{fields.name_label.value}</span>
              )}
              <div className="helperBlock">
                <TextField
                  autoCapitalize="words"
                  autoComplete="name"
                  classes={{ root: 'formInput' }}
                  inputProps={{
                    maxLength: USER_NAME_MAXLENGTH,
                  }}
                  name="user-name"
                  placeholder={
                    isTextField(fields.name_placeholder) ? fields.name_placeholder.value : ''
                  }
                  results={5}
                  title={isTextField(fields.name_title) ? fields.name_title.value : ''}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <p className="formError">{userNameError}</p>
              </div>
            </label>

            <label className={`complaintInputLabel ${styles.formBlock} ${userPhoneClass}`}>
              {isTextField(fields.phone_label) && (
                <span className={styles.label}>{fields.phone_label.value}</span>
              )}
              <div className="helperBlock">
                <Input
                  autoComplete="tel"
                  classes={{ root: 'formInput' }}
                  inputMode="tel"
                  name="user-phone"
                  placeholder={
                    isTextField(fields.phone_placeholder) ? fields.phone_placeholder.value : ''
                  }
                  onChange={(e) => onChangePhone(e)}
                  value={userPhone}
                  results={5}
                  title={isTextField(fields.phone_title) ? fields.phone_title.value : ''}
                  type="tel"
                />
                <p className="formError">{userPhoneError}</p>
              </div>
            </label>
          </div>
          <label className={`complaintSelectLabel ${styles.selectBlock} ${messageTopicClass}`}>
            {isTextField(fields.theme_label) && (
              <span className={styles.label}>{fields.theme_label.value}</span>
            )}
            <div className="helperBlock">
              <div className={styles.complaintSelects}>
                <div className={styles.complaintSelectBlock}>
                  <Select
                    IconComponent={() => (
                      <SvgIcon
                        classes={{
                          root: 'policySelectIcon ' + styles.complaintSelectIcon,
                        }}
                      >
                        <path
                          d="M9 1L5 5L1 1"
                          stroke="#11142D"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </SvgIcon>
                    )}
                    MenuProps={menuProps}
                    classes={{
                      root: styles.complaintSelect,
                    }}
                    displayEmpty
                    inputProps={{ name: 'message-topic' }}
                    onChange={onChange}
                    value={messageTopic}
                  >
                    {topics.map((topic: topic) => (
                      <MenuItem
                        classes={{
                          root: styles.complaintOption,
                          selected: styles.complaintOptionActive,
                        }}
                        disableGutters
                        key={topic.id}
                        title=""
                        value={topic.id}
                      >
                        {topic.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <p className="formError">{messageTopicError}</p>
                </div>
              </div>
            </div>
          </label>

          <label
            className={cn('complaintTextareaLabel', styles.textArea, messageTextClass, {
              [styles['textArea--error']]: messageTextError,
            })}
          >
            {isTextField(fields.text_label) && (
              <span className={styles.label}>{fields.text_label.value}</span>
            )}
            <div className="helperBlock">
              <TextField
                autoCapitalize="sentences"
                autoComplete="on"
                classes={{ root: 'formTextarea' }}
                multiline
                name="message-text"
                placeholder={
                  isTextField(fields.text_placeholder) ? fields.text_placeholder.value : ''
                }
                rows={4}
                spellCheck="true"
                title="Введите сообщение с описанием проблемы."
              />
              <p className="formError">{messageTextError}</p>
            </div>
          </label>
          <div className={cn({ [styles.submitBtn]: submitText === 'Подождите…' })}>
            <Button type="submit" label={submitText} mode="secondary" disabled={submitDisabled} />
          </div>
          <p
            className={styles.termsText}
            dangerouslySetInnerHTML={{
              __html: interpolate(isTextField(fields.legal_text) ? fields.legal_text.value : '', {
                privacyLegalPage: '/privacy-policy',
                personalLegalPage: '/personal-data',
              }),
            }}
          />
        </form>
        <form className={formSmsClass} method="dialog" ref={formSmsRef}>
          <h3>Введите код</h3>
          <div className={styles.smsBlock}>
            <div className={styles.label}>
              <span>Код из СМС</span>
              <span>{userPhone}</span>
            </div>
            <div className={smsCodeClass}>
              <TextField
                classes={{ root: styles.smsInput }}
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
                classes={{ root: styles.smsInput }}
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
                classes={{ root: styles.smsInput }}
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
                classes={{ root: styles.smsInput }}
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
              <p className={styles.errorText}>{smsCodeError}</p>
            </div>
          </div>
          <p className={`${styles.timer} ${smsRepeatAllowed ? 'd-none' : ''}`}>
            Повторная отправка через {smsTimeout / SMS_INTERVAL} сек.
          </p>
          <button
            className={`${styles.repeatBtn} ${smsRepeatAllowed ? '' : 'd-none'}`}
            onClick={onClickSmsRepeat}
            type="button"
          >
            Отправить код ещё раз
          </button>
        </form>
        {/* Pending notification. */}
        <div className={notificationPendingClass}>
          <img alt="preloader" draggable="false" src="/images/new-design/icons/preloader.svg" />
        </div>
        {/* Fulfilled notification. */}
        <div className={notificationFulfilledClass}>
          <img src="/images/dialog/hand-ok.png" />
          <div>Заявка успешно отправлена</div>
          <Button label="Хорошо" size="medium" onClick={onClose} />
        </div>
        {/* Rejected notification. */}
        <div className={notificationRejectedClass}>
          <img src="/images/dialog/hand-error.png" />
          <h3>Что-то пошло не так!</h3>
          <div>
            Произошла ошибка, попробуйте <br /> повторить позже
          </div>
          <Button label="Хорошо" size="medium" onClick={onClose} />
        </div>
      </Dialog>
    </>
  )
}
