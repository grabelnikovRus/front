/* eslint-disable max-lines */

import {
  CatalogNumberNewTypeEnum,
  CatalogCheckboxGroupTypeEnum,
  CatalogTextNewTypeEnum,
  CatalogCheckboxGroupLayoutEnum,
  CatalogCheckboxGroupStrategyEnum,
} from '@/api'
import { CatalogSettingsEntity } from '@/modules/settings-v1/catalog-settings.entity'

export const catalogSettings: CatalogSettingsEntity = {
  address: {
    title: 'Местоположение',
    placeholder: 'Район, метро или МЦД...',
    type: CatalogTextNewTypeEnum.Text,
    initial: null,
    validation: {
      minLength: {
        value: 3,
        message: 'Пожалуйста, используйте не менее 3 символов',
      },
      maxLength: {
        value: 255,
        message: 'Пожалуйста, укоротите этот текст до 255 символов или менее',
      },
    },
  },
  balconyType: {
    title: 'Балкон',
    type: CatalogCheckboxGroupTypeEnum.CheckboxGroup,
    strategy: CatalogCheckboxGroupStrategyEnum.ByDefault,
    layout: CatalogCheckboxGroupLayoutEnum.Wrap,
    initial: ['no-matter'],
    options: [
      {
        value: 'no-matter',
        caption: 'Неважно',
        icon: null,
      },
      {
        value: 'loggia',
        caption: 'Лоджия',
        icon: null,
      },
      {
        value: 'balcony',
        caption: 'Балкон',
        icon: null,
      },
    ],
    validation: {},
  },
  buildingCeilingHeight: {
    title: 'Высота потолков',
    type: CatalogCheckboxGroupTypeEnum.CheckboxGroup,
    strategy: CatalogCheckboxGroupStrategyEnum.ByDefault,
    layout: CatalogCheckboxGroupLayoutEnum.Wrap,
    initial: ['no-matter'],
    options: [
      {
        value: 'no-matter',
        caption: 'Неважно',
        icon: null,
      },
      {
        value: '<=250',
        caption: '2.5 м',
        icon: null,
      },
      {
        value: '=260',
        caption: '2.6 м',
        icon: null,
      },
      {
        value: '=270',
        caption: '2.7 м',
        icon: null,
      },
      {
        value: '=280',
        caption: '2.8 м',
        icon: null,
      },
      {
        value: '=290',
        caption: '2.9 м',
        icon: null,
      },
      {
        value: '=300',
        caption: '3 м',
        icon: null,
      },
      {
        value: '>300',
        caption: '3 м +',
        icon: null,
      },
    ],
    validation: {},
  },
  buildingFloorCountMax: {
    title: 'Этажей в доме, до',
    placeholder: '80',
    type: CatalogNumberNewTypeEnum.Number,
    initial: null,
    validation: {
      greaterThanOrEqual: {
        value: 5,
        message: 'Введите этажность от 5 до 80',
      },
      lessThanOrEqual: {
        value: 80,
        message: 'Введите этажность от 5 до 80',
      },
    },
  },
  buildingGarbageChute: {
    title: 'Мусоропровод',
    type: CatalogCheckboxGroupTypeEnum.CheckboxGroup,
    strategy: CatalogCheckboxGroupStrategyEnum.ByDefault,
    layout: CatalogCheckboxGroupLayoutEnum.Wrap,
    initial: ['no-matter'],
    options: [
      {
        value: 'no-matter',
        caption: 'Неважно',
        icon: null,
      },
      {
        value: 'yes',
        caption: 'Есть',
        icon: null,
      },
      {
        value: 'no',
        caption: 'Нет',
        icon: null,
      },
    ],
    validation: {},
  },
  buildingFloorCountMin: {
    title: 'Этажей в доме, от',
    placeholder: '5',
    type: CatalogNumberNewTypeEnum.Number,
    initial: null,
    validation: {
      greaterThanOrEqual: {
        value: 5,
        message: 'Введите этажность от 5 до 80',
      },
      lessThanOrEqual: {
        value: 80,
        message: 'Введите этажность от 5 до 80',
      },
    },
  },
  buildingParkingTypes: {
    title: 'Парковка',
    type: CatalogCheckboxGroupTypeEnum.CheckboxGroup,
    strategy: CatalogCheckboxGroupStrategyEnum.ByDefault,
    layout: CatalogCheckboxGroupLayoutEnum.Wrap,
    initial: ['00000000-0000-0000-0000-000000000000'],
    options: [
      {
        value: '00000000-0000-0000-0000-000000000000',
        caption: 'Неважно',
        icon: null,
      },
      {
        value: 'a996ac6c-be70-4b31-81a8-13da834d42d6',
        caption: 'Наземная',
        icon: 'ground',
      },
      {
        value: '14fc51c7-80b0-4702-ba5a-fb0185d9195c',
        caption: 'Подземный',
        icon: 'underground',
      },
      {
        value: '769e2c6a-14b2-4669-b456-a9737ee1032f',
        caption: 'Многоуровневый',
        icon: 'multilevel',
      },
      {
        value: '514cfc09-719b-44c5-9582-8b22b7524dfd',
        caption: 'На крыше',
        icon: 'roof',
      },
      {
        value: 'deb9d9ba-915e-45b0-9e5f-27095cbe926c',
        caption: 'За шлагбаумом во дворе',
        icon: 'barrier',
      },
    ],
    validation: {},
  },
  buildingTypes: {
    title: 'Тип дома',
    type: CatalogCheckboxGroupTypeEnum.CheckboxGroup,
    strategy: CatalogCheckboxGroupStrategyEnum.ByDefault,
    layout: CatalogCheckboxGroupLayoutEnum.Wrap,
    initial: ['00000000-0000-0000-0000-000000000000'],
    options: [
      {
        value: '00000000-0000-0000-0000-000000000000',
        caption: 'Неважно',
        icon: null,
      },
      {
        value: '1950f24f-1205-4e3c-b6bf-55e429cb4b9e',
        caption: 'Кирпичный',
        icon: 'brick',
      },
      {
        value: 'f402f7c0-93b6-4b45-b5d5-dfe2b21726a0',
        caption: 'Блочный',
        icon: 'block',
      },
      {
        value: '4056adab-65e4-40ef-877c-a1a318d8a955',
        caption: 'Монолитный',
        icon: 'monolith',
      },
      {
        value: 'ab5aab24-7197-4b68-a1f0-a43cb5a19387',
        caption: 'Монолитно-кирпичный',
        icon: 'monolithbrick',
      },
      {
        value: '2f777358-b1e2-4ddf-a4f3-35135f465d7a',
        caption: 'Панельный',
        icon: 'panel',
      },
      {
        value: '26327a32-920e-40c3-a508-c893095098b5',
        caption: 'Сталинский',
        icon: 'stalin',
      },
    ],
    validation: {},
  },
  decorationTypes: {
    title: 'Уровень ремонта',
    type: CatalogCheckboxGroupTypeEnum.CheckboxGroup,
    strategy: CatalogCheckboxGroupStrategyEnum.ByDefault,
    layout: CatalogCheckboxGroupLayoutEnum.Column,
    initial: ['00000000-0000-0000-0000-000000000000'],
    options: [
      {
        value: '00000000-0000-0000-0000-000000000000',
        caption: 'Любой',
        icon: null,
      },
      {
        value: 'acf012c8-3d26-4202-9910-df627aff4d2a',
        caption: 'Без ремонта',
        icon: 'noCian',
      },
      {
        value: 'dfb4cf47-e121-4b4c-8c05-10b523ee28dc',
        caption: 'Косметический',
        icon: 'cosmeticCian',
      },
      {
        value: 'fd86906f-05b4-4e68-808f-30f4fb54226f',
        caption: 'Дизайнерский',
        icon: 'designCian',
      },
      {
        value: '86bedc34-b9bc-49ec-bc09-bd823257cc58',
        caption: 'Евроремонт',
        icon: 'euroCian',
      },
    ],
    validation: {},
  },
  elevatorType: {
    title: 'Лифт',
    type: CatalogCheckboxGroupTypeEnum.CheckboxGroup,
    strategy: CatalogCheckboxGroupStrategyEnum.ByDefault,
    layout: CatalogCheckboxGroupLayoutEnum.Wrap,
    initial: ['no-matter'],
    options: [
      {
        value: 'no-matter',
        caption: 'Неважно',
        icon: null,
      },
      {
        value: 'any',
        caption: 'Любой лифт',
        icon: null,
      },
      {
        value: 'freight',
        caption: 'Грузовой',
        icon: null,
      },
    ],
    validation: {},
  },
  floorNumberMax: {
    title: 'Этаж квартиры, до',
    placeholder: '80',
    type: CatalogNumberNewTypeEnum.Number,
    initial: null,
    validation: {
      greaterThanOrEqual: {
        value: 1,
        message: 'Введите этаж от 1 до 80',
      },
      lessThanOrEqual: {
        value: 80,
        message: 'Введите этаж от 1 до 80',
      },
    },
  },
  floorNumberMin: {
    title: 'Этаж квартиры, от',
    placeholder: '1',
    type: CatalogNumberNewTypeEnum.Number,
    initial: null,
    validation: {
      greaterThanOrEqual: {
        value: 1,
        message: 'Введите этаж от 1 до 80',
      },
      lessThanOrEqual: {
        value: 80,
        message: 'Введите этаж от 1 до 80',
      },
    },
  },
  fullAreaMax: {
    title: 'Общая площадь, до',
    placeholder: '150',
    type: CatalogNumberNewTypeEnum.Number,
    initial: null,
    validation: {
      greaterThanOrEqual: {
        value: 0,
        message: 'Укажите площадь от 0 до 150 м²',
      },
      lessThanOrEqual: {
        value: 150,
        message: 'Укажите площадь от 0 до 150 м²',
      },
    },
  },
  fullAreaMin: {
    title: 'Общая площадь, от',
    placeholder: '0',
    type: CatalogNumberNewTypeEnum.Number,
    initial: null,
    validation: {
      greaterThanOrEqual: {
        value: 0,
        message: 'Укажите площадь от 0 до 150 м²',
      },
      lessThanOrEqual: {
        value: 150,
        message: 'Укажите площадь от 0 до 150 м²',
      },
    },
  },
  housingTypes: {
    title: 'Тип объекта',
    type: CatalogCheckboxGroupTypeEnum.CheckboxGroup,
    strategy: CatalogCheckboxGroupStrategyEnum.Any,
    layout: CatalogCheckboxGroupLayoutEnum.Row,
    initial: null,
    options: [
      {
        value: '024268c5-c499-45c1-b32d-284a212f93e5',
        caption: 'Первичка',
        icon: 'newbuilding',
      },
      {
        value: '1e8c006c-cbf0-4fcc-8725-6b4d319e3bee',
        caption: 'Вторичка',
        icon: 'second',
      },
    ],
    validation: {},
  },
  kitchensAreaMax: {
    title: 'Площадь кухни, до',
    placeholder: '50',
    type: CatalogNumberNewTypeEnum.Number,
    initial: null,
    validation: {
      greaterThanOrEqual: {
        value: 0,
        message: 'Укажите площадь от 0 до 50 м²',
      },
      lessThanOrEqual: {
        value: 50,
        message: 'Укажите площадь от 0 до 50 м²',
      },
    },
  },
  kitchensAreaMin: {
    title: 'Площадь кухни, от',
    placeholder: '0',
    type: CatalogNumberNewTypeEnum.Number,
    initial: null,
    validation: {
      greaterThanOrEqual: {
        value: 0,
        message: 'Укажите площадь от 0 до 50 м²',
      },
      lessThanOrEqual: {
        value: 50,
        message: 'Укажите площадь от 0 до 50 м²',
      },
    },
  },
  livingAreaMax: {
    title: 'Жилая площадь, до',
    placeholder: '150',
    type: CatalogNumberNewTypeEnum.Number,
    initial: null,
    validation: {
      greaterThanOrEqual: {
        value: 0,
        message: 'Укажите площадь от 0 до 150 м²',
      },
      lessThanOrEqual: {
        value: 150,
        message: 'Укажите площадь от 0 до 150 м²',
      },
      greaterOrEqualThanField: {
        field: 'livingAreaMin',
        message: 'Укажите площадь больше, чем в поле "От"',
      },
    },
  },
  livingAreaMin: {
    title: 'Жилая площадь, от',
    placeholder: '0',
    type: CatalogNumberNewTypeEnum.Number,
    initial: null,
    validation: {
      greaterThanOrEqual: {
        value: 0,
        message: 'Укажите площадь от 0 до 150 м²',
      },
      lessThanOrEqual: {
        value: 150,
        message: 'Укажите площадь от 0 до 150 м²',
      },
      lessThanOrEqualToField: {
        field: 'livingAreaMax',
        message: 'Укажите площадь меньше, чем в поле "До"',
      },
    },
  },
  priceRubMax: {
    title: 'Цена, до',
    placeholder: '100000000',
    type: CatalogNumberNewTypeEnum.Number,
    initial: null,
    validation: {
      greaterThanOrEqual: {
        value: 3000000,
        message: 'Введите цену от 3 до 100 млн рублей',
      },
      lessThanOrEqual: {
        value: 100000000,
        message: 'Введите цену от 3 до 100 млн рублей',
      },
      greaterThanField: {
        field: 'priceRubMin',
        message: 'Введите цену больше, чем в поле "От"',
      },
    },
  },
  priceRubMin: {
    title: 'Цена, от',
    placeholder: '3000000',
    type: CatalogNumberNewTypeEnum.Number,
    initial: null,
    validation: {
      greaterThanOrEqual: {
        value: 3000000,
        message: 'Введите цену от 3 до 100 млн рублей',
      },
      lessThanOrEqual: {
        value: 100000000,
        message: 'Введите цену от 3 до 100 млн рублей',
      },
      lessThanField: {
        field: 'priceRubMax',
        message: 'Введите цену меньше, чем в поле "До"',
      },
    },
  },
  roominess: {
    title: 'Количество комнат',
    type: CatalogCheckboxGroupTypeEnum.CheckboxGroup,
    strategy: CatalogCheckboxGroupStrategyEnum.Any,
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
    validation: {},
  },
  saleTypes: {
    title: 'Тип продажи',
    type: CatalogCheckboxGroupTypeEnum.CheckboxGroup,
    strategy: CatalogCheckboxGroupStrategyEnum.Any,
    initial: null,
    options: [
      {
        value: '3aa1e114-53ad-47ce-a046-b416e8e89718',
        caption: 'Свободная',
        icon: 'freeSale',
      },
      {
        value: '8e285810-56e2-4452-b945-b629de70bc59',
        caption: 'Трейд-ин+',
        icon: 'trade_in_plus',
      },
    ],
    validation: {},
  },
  wcsType: {
    title: 'Санузел',
    type: CatalogCheckboxGroupTypeEnum.CheckboxGroup,
    strategy: CatalogCheckboxGroupStrategyEnum.ByDefault,
    layout: CatalogCheckboxGroupLayoutEnum.Wrap,
    initial: ['no-matter'],
    options: [
      {
        value: 'no-matter',
        caption: 'Неважно',
        icon: null,
      },
      {
        value: 'separate',
        caption: 'Раздельный',
        icon: null,
      },
      {
        value: 'combined',
        caption: 'Совмещённый',
        icon: null,
      },
    ],
    validation: {},
  },
  windowViewTypes: {
    title: 'Вид из окна',
    type: CatalogCheckboxGroupTypeEnum.CheckboxGroup,
    strategy: CatalogCheckboxGroupStrategyEnum.ByDefault,
    layout: CatalogCheckboxGroupLayoutEnum.Wrap,
    initial: ['00000000-0000-0000-0000-000000000000'],
    options: [
      {
        value: '00000000-0000-0000-0000-000000000000',
        caption: 'Неважно',
        icon: null,
      },
      {
        value: 'cec3f7b3-035e-40e0-abf9-8a512d98e4ab',
        caption: 'На улицу',
        icon: 'street',
      },
      {
        value: '70d699ae-2f0f-49a8-aca2-614aa2c8b270',
        caption: 'Во двор',
        icon: 'yard',
      },
      {
        value: '90ecba8d-1773-433e-9b0d-6b466d45fab3',
        caption: 'На улицу и во двор',
        icon: 'yardAndStreet',
      },
    ],
    validation: {},
  },
  loanRateMax: {
    title: 'Ставка ипотеки, до',
    placeholder: null,
    type: CatalogNumberNewTypeEnum.Number,
    initial: null,
    validation: {
      greaterThanOrEqual: {
        value: 1,
        message: 'Введите ставку ипотеки от 1 до 9',
      },
      lessThanOrEqual: {
        value: 9,
        message: 'Введите ставку ипотеки от 1 до 9',
      },
    },
  },
  loanRateMin: {
    title: 'Ставка ипотеки, от',
    placeholder: null,
    type: CatalogNumberNewTypeEnum.Number,
    initial: null,
    validation: {
      greaterThanOrEqual: {
        value: 1,
        message: 'Введите ставку ипотеки от 1 до 9',
      },
      lessThanOrEqual: {
        value: 9,
        message: 'Введите ставку ипотеки от 1 до 9',
      },
    },
  },
}
