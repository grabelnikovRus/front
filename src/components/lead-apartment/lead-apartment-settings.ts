import {
  CatalogCheckbox,
  CatalogCheckboxTypeEnum,
  CatalogTextNew,
  CatalogTextNewTypeEnum,
} from '@/api'

interface LeadApartmentSettings {
  name: CatalogTextNew
  phone: CatalogTextNew
  allowMarketing: CatalogCheckbox
  privacyPolicy: CatalogCheckbox
}

export const leadApartmentSettings: LeadApartmentSettings = {
  name: {
    title: 'Ваше имя',
    placeholder: 'Как вас зовут?',
    type: CatalogTextNewTypeEnum.Text,
    initial: null,
    validation: {
      maxLength: {
        value: 100,
        message: 'Пожалуйста, укоротите это текст до 100 символов или менее.',
      },
      minLength: {
        value: 1,
        message: 'Пожалуйста, используйте не менее одного символа',
      },
      required: 'Пожалуйста, заполните это поле',
    },
  },
  phone: {
    title: 'Телефон',
    placeholder: '+7 ( - - - )  - - -  - -  - -',
    type: CatalogTextNewTypeEnum.Text,
    initial: null,
    validation: {
      minLength: {
        value: 11,
        message: 'Используйте формат: +7(000) 000-00-00.',
      },
      required: 'Пожалуйста, заполните это поле',
    },
  },
  allowMarketing: {
    type: CatalogCheckboxTypeEnum.Checkbox,
    initial: false,
    validation: {},
  },
  privacyPolicy: {
    type: CatalogCheckboxTypeEnum.Checkbox,
    initial: true,
    validation: {
      required: ' ',
    },
  },
}
