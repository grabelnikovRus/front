import { trackEvent } from '@/lib/tracking'

export const analyticEvents = {
  openModal(): void {
    trackEvent({
      category: 'Authorization',
      label: 'Icon Authorization',
      name: 'Clicked Authorization',
    })
  },
  switchSignin(): void {
    trackEvent({
      category: 'Registration',
      label: 'I already have an account in Registration',
      name: 'Clicked on the button I already have an account',
    })
  },
  switchSignup(): void {
    trackEvent({
      category: 'Registration',
      label: "Don't have an account yet? in Registration",
      name: "Clicked on the button Don't have an account yet?",
    })
  },
  smsRepeatAuth(): void {
    trackEvent({
      category: 'Authorization',
      label: 'Send code button again in Authorization',
      name: 'Clicked the Send code button again',
    })
  },
  smsRepeatReg(): void {
    trackEvent({
      category: 'Registration',
      label: 'Send code button again in Registration',
      name: 'Clicked the Send code button again',
    })
  },
  changePhoneAuth(): void {
    trackEvent({
      category: 'Authorization',
      label: 'Change phone button in Authorization',
      name: 'Clicked on the change phone button',
    })
  },
  changePhoneReg(): void {
    trackEvent({
      category: 'Registration',
      label: 'Change phone button in Registration',
      name: 'Clicked on the change phone button',
    })
  },
  errorSmsAuth(): void {
    trackEvent({
      category: 'Authorization',
      label: 'Wrong code from SMS  in Authorization',
      name: 'Entered the wrong code from SMS',
    })
  },
  errorSmsReg(): void {
    trackEvent({
      category: 'Registration',
      label: 'Wrong code from SMS  in Registration',
      name: 'Entered the wrong code from SMS',
    })
  },
  submitSignin(): void {
    trackEvent({
      category: 'Authorization',
      label: 'Get Code button in Authorization',
      name: 'Click the Get Code button',
    })
  },
  submitSignup(): void {
    trackEvent({
      category: 'Registration',
      label: 'Get code button in the registration form in Registration',
      name: 'Clicked the Get code button in the registration form',
    })
  },
  userNameReg(): void {
    trackEvent({
      category: 'Registration',
      label: 'Name in registration form in Registration',
      name: 'Entered name in registration form',
    })
  },
  phoneReg(): void {
    trackEvent({
      category: 'Registration',
      label: 'Phone in the registration form in Registration',
      name: 'Entered phone in the registration form',
    })
  },
  userPhoneAuth(): void {
    trackEvent({
      category: 'Authorization',
      label: 'Typing The Phone in Authorization ',
      name: 'Started Typing The Phone',
    })
  },
  entersCodeAuth(): void {
    trackEvent({
      category: 'Authorization',
      label: 'SMS code notConversions in Authorization',
      name: 'Entered SMS code notConversions',
    })
  },
  entersCodeReg(): void {
    trackEvent({
      category: 'Registration',
      label: 'SMS Code in the Registration Chain in Registration Conversions',
      name: 'Entered SMS Code in the Registration Chain Conversions',
    })
  },
  userNotFoundError(): void {
    trackEvent({
      category: 'Authorization',
      label: 'User is not found in Authorization',
      name: 'Entered a non-existent number in the Authorization form',
    })
  },
  notRegUserError(): void {
    trackEvent({
      category: 'Registration',
      label: 'Existing number in the registration form in Registration',
      name: 'Entered an existing number in the registration form',
    })
  },
  errorPhoneAuth(): void {
    trackEvent({
      category: 'Authorization',
      label: 'Error phone field',
      name: 'Error phone field is not filled',
    })
  },
  errorNameReg(): void {
    trackEvent({
      category: 'Registration',
      label: 'Error field name',
      name: 'Error field name is not filled',
    })
  },
  errorPhoneReg(): void {
    trackEvent({
      category: 'Registration',
      label: 'Error phone field',
      name: 'Error phone field is not filled',
    })
  },
}
