/* eslint-disable max-lines */

import {
  CatalogCheckboxGroupLayoutEnum,
  CatalogCheckboxGroupStrategyEnum,
  CatalogCheckboxGroupTypeEnum,
  CatalogCheckboxTypeEnum,
  CatalogNumberNewTypeEnum,
  CatalogSelectNewTypeEnum,
  CatalogTextNewTypeEnum,
} from '@/api'

export const checklistSettings = {
  address: {
    title: '',
    placeholder: 'Введите адрес',
    type: CatalogTextNewTypeEnum.Text,
    initial: null,
    validation: {
      required: 'Необходимо выбрать адрес',
    },
  },
  objectType: {
    title: 'Тип объекта',
    type: CatalogCheckboxGroupTypeEnum.CheckboxGroup,
    strategy: CatalogCheckboxGroupStrategyEnum.OnlyOne,
    layout: CatalogCheckboxGroupLayoutEnum.Row,
    initial: null,
    options: [
      {
        value: 'flat',
        caption: 'Квартира',
        icon: null,
      },
      {
        value: 'apartment',
        caption: 'Апартаменты',
        icon: null,
      },
    ],
    validation: {
      required: 'Укажите, тип объекта',
      notEqualTo: {
        value: 'apartment',
        message: 'К сожалению, мы не работаем с апартаментами',
      },
    },
  },
  roomType: {
    title: 'Количество комнат',
    type: CatalogCheckboxGroupTypeEnum.CheckboxGroup,
    strategy: CatalogCheckboxGroupStrategyEnum.OnlyOne,
    layout: CatalogCheckboxGroupLayoutEnum.Main,
    initial: null,
    options: [
      {
        value: '0',
        caption: 'Студия',
        icon: null,
      },
      {
        value: '1',
        caption: '1',
        icon: null,
      },
      {
        value: '2',
        caption: '2',
        icon: null,
      },
      {
        value: '3',
        caption: '3',
        icon: null,
      },
    ],
    validation: {
      required: 'Выберите количество комнат',
    },
  },
  area: {
    title: 'Площадь',
    placeholder: 'Площадь',
    type: CatalogNumberNewTypeEnum.Number,
    initial: null,
    validation: {
      required: 'Укажите площадь',
      greaterThanOrEqual: {
        value: 10,
        message: 'Укажите значение от 10м² до 100м²',
      },
      lessThanOrEqual: {
        value: 100,
        message: 'Укажите значение от 10м² до 100м²',
      },
    },
  },
  floor: {
    title: 'Этаж',
    placeholder: 'Этаж',
    type: CatalogNumberNewTypeEnum.Number,
    initial: null,
    validation: {
      required: 'Укажите этаж',
      greaterThanOrEqual: {
        value: 1,
        message: 'Укажите значение от 1 до 99',
      },
      lessThanOrEqual: {
        value: 99,
        message: 'Укажите значение от 1 до 99',
      },
    },
  },
  isInOperation: {
    title: 'Дом сдан?',
    type: CatalogCheckboxGroupTypeEnum.CheckboxGroup,
    strategy: CatalogCheckboxGroupStrategyEnum.OnlyOne,
    layout: CatalogCheckboxGroupLayoutEnum.Row,
    initial: null,
    options: [
      {
        value: 'true',
        caption: 'Да',
        icon: null,
      },
      {
        value: 'false',
        caption: 'Нет',
        icon: null,
      },
    ],
    validation: {
      required: 'Укажите, сдан дом или нет',
    },
  },
  isOwnership: {
    title: 'Право собственности получено?',
    type: CatalogCheckboxGroupTypeEnum.CheckboxGroup,
    strategy: CatalogCheckboxGroupStrategyEnum.OnlyOne,
    layout: CatalogCheckboxGroupLayoutEnum.Row,
    initial: null,
    options: [
      {
        value: 'true',
        caption: 'Да',
        icon: null,
      },
      {
        value: 'false',
        caption: 'Нет',
        icon: null,
      },
    ],
    validation: {
      required: 'Укажите, получено ли право собственности на квартиру',
    },
  },
  isTransferAcceptanceCertificate: {
    title: 'Акт приёма-передачи подписан?',
    type: CatalogCheckboxGroupTypeEnum.CheckboxGroup,
    strategy: CatalogCheckboxGroupStrategyEnum.OnlyOne,
    layout: CatalogCheckboxGroupLayoutEnum.Row,
    initial: null,
    options: [
      {
        value: 'true',
        caption: 'Да',
        icon: null,
      },
      {
        value: 'false',
        caption: 'Нет',
        icon: null,
      },
    ],
    validation: {
      required: 'Укажите, подписан ли акт приёма-передачи',
      equalTo: {
        message: 'Мы не выкупаем эти квартиры',
        value: 'false',
      },
    },
  },
  price: {
    title: 'Желаемая стоимость',
    placeholder: 'Введите стоимость',
    type: CatalogNumberNewTypeEnum.Number,
    initial: null,
    validation: {
      required: 'Укажите желаемую стоимость',
      greaterThan: {
        value: 0,
        message: 'Мы выкупаем квартиры стоимостью до 25 млн рублей',
      },
      lessThanOrEqual: {
        value: 25000000,
        message: 'Мы выкупаем квартиры стоимостью до 25 млн рублей',
      },
    },
  },
  renovationType: {
    title: 'Наличие ремонта',
    type: CatalogCheckboxGroupTypeEnum.CheckboxGroup,
    strategy: CatalogCheckboxGroupStrategyEnum.OnlyOne,
    layout: CatalogCheckboxGroupLayoutEnum.Column,
    initial: null,
    options: [
      {
        value: 'fresh',
        caption: 'Свежий',
        icon: null,
      },
      {
        value: 'cosmetic',
        caption: 'Косметический',
        icon: 'cosmeticCian',
      },
      {
        value: 'none',
        caption: 'Без ремонта',
        icon: 'noCian',
      },
    ],
    validation: {
      required: 'Выберите уровень ремонта',
    },
  },
  renovationYear: {
    title: 'Год последнего ремонта',
    placeholder: 'Введите год',
    type: CatalogTextNewTypeEnum.Text,
    initial: null,
    validation: {
      required: 'Укажите год последнего ремонта',
      greaterThanOrEqual: {
        value: 1000,
        message: 'Введите корректное значение',
      },
      lessThanOrEqual: {
        value: new Date().getFullYear(),
        message: 'Нельзя указать год больше текущего',
      },
    },
  },
  isMortgage: {
    title: 'Квартира сейчас в ипотеке?',
    type: CatalogCheckboxGroupTypeEnum.CheckboxGroup,
    strategy: CatalogCheckboxGroupStrategyEnum.OnlyOne,
    layout: CatalogCheckboxGroupLayoutEnum.Row,
    initial: null,
    options: [
      {
        value: 'true',
        caption: 'Да',
        icon: null,
      },
      {
        value: 'false',
        caption: 'Нет',
        icon: null,
      },
    ],
    validation: {
      required: 'Укажите, находится ли квартира в ипотеке',
    },
  },
  peculiarities: {
    title: 'Особенности',
    type: CatalogCheckboxGroupTypeEnum.CheckboxGroup,
    strategy: CatalogCheckboxGroupStrategyEnum.Any,
    layout: CatalogCheckboxGroupLayoutEnum.Column,
    initial: null,
    options: [
      {
        value: 'flooding',
        caption: 'Следы от затопления',
        icon: null,
      },
      {
        value: 'fire',
        caption: 'Следы от пожара',
        icon: null,
      },
      {
        value: 'insects',
        caption: 'Насекомые',
        icon: null,
      },
      {
        value: 'mold',
        caption: 'Плесень на стенах и потолке',
        icon: null,
      },
      {
        value: 'cracks',
        caption: 'Видимые трещины в стенах',
        icon: null,
      },
      {
        value: 'badBathroom',
        caption: 'Плохое состояние сан. узла (полное или частичное отсутствие плитки)',
        icon: null,
      },
    ],
    validation: {},
  },
  releaseYear: {
    title: 'Год сдачи',
    placeholder: 'Введите год',
    type: CatalogTextNewTypeEnum.Text,
    initial: null,
    validation: {
      required: 'Укажите год сдачи',
      greaterThanOrEqual: {
        value: new Date().getFullYear(),
        message: 'Нельзя указать год меньше текущего',
      },
    },
  },
  releaseQuarter: {
    title: 'Квартал',
    type: CatalogSelectNewTypeEnum.Select,
    initial: null,
    options: [
      {
        id: '1',
        name: '1 квартал',
      },
      {
        id: '2',
        name: '2 квартал',
      },
      {
        id: '3',
        name: '3 квартал',
      },
      {
        id: '4',
        name: '4 квартал',
      },
    ],
    validation: {
      required: 'Укажите квартал сдачи',
    },
  },
  developer: {
    title: 'Застройщик',
    type: CatalogCheckboxGroupTypeEnum.CheckboxGroup,
    strategy: CatalogCheckboxGroupStrategyEnum.OnlyOne,
    layout: CatalogCheckboxGroupLayoutEnum.Column,
    initial: null,
    options: [
      {
        value: 'pik',
        caption: 'ГК ПИК',
        icon: null,
      },
      {
        value: 'samolet',
        caption: 'Самолёт',
        icon: null,
      },
      {
        value: 'a101',
        caption: 'А 101',
        icon: null,
      },
      {
        value: 'ingrad',
        caption: 'Инград',
        icon: null,
      },
      {
        value: 'levelgroup',
        caption: 'Level Group',
        icon: null,
      },
      {
        value: 'other',
        caption: 'У меня другой застройщик',
        icon: null,
      },
    ],
    validation: {
      required: 'Укажите застройщика',
      notEqualTo: {
        message: 'Мы не выкупаем эти квартиры',
        value: 'other',
      },
    },
  },
  name: {
    title: 'Ваше имя',
    placeholder: 'Как вас зовут?',
    type: CatalogTextNewTypeEnum.Text,
    initial: null,
    validation: {
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
