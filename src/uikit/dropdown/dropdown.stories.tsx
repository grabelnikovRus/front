import { Story, Meta } from '@storybook/react'

import { Dropdown, DropdownProps } from './dropdown'

import { SvgSort } from '..'

export default {
  title: 'uikit/Dropdown',
  component: Dropdown,
  parameters: { backgrounds: { default: 'dark' } },
  argTypes: { onChange: { action: 'changed' } },
} as Meta

const Template: Story<DropdownProps> = (args) => (
  <div style={{ display: 'flex', padding: 20 }}>
    <Dropdown {...args} />
  </div>
)

export const ChooseSort = Template.bind({})
ChooseSort.args = {
  items: [
    { id: 'createdAt,desc', name: 'По умолчанию' },
    { id: 'priceRub,desc', name: 'Сначала дороже' },
    { id: 'priceRub,asc', name: 'Сначала дешевле' },
    { id: 'fullArea,desc', name: 'Сначала больше м²' },
    { id: 'fullArea,asc', name: 'Сначала меньше м²' },
  ],
  value: 'createdAt,desc',
  label: 'Выбор сортировки',
  renderSelectedValue: (value) => `Сортировка: ${value.name}`,
}

export const ChooseDocs = Template.bind({})
ChooseDocs.args = {
  items: [
    { id: 'terms', name: 'Пользовательское соглашение' },
    { id: 'payment', name: 'Правила оплаты и безопасность платежей' },
    { id: 'personal', name: 'Согласие на обработку персональных данных' },
    { id: 'privacy', name: 'Политики обработки и защиты персональных данных' },
    { id: 'cookies', name: 'Политика Cookie' },
    { id: 'subscription', name: 'Оферта на заключение договора оказания услуги "Подписка"' },
    { id: 'micros', name: 'Оферта на заключение договора оказания дополнительных услуг' },
    { id: 'booking', name: 'Оферта на оказание услуг по бронированию' },
    { id: 'legal', name: 'Оферта на оказание юридических услуг' },
    { id: 'warranty', name: 'Положение о гарантийных обязательствах' },
    { id: 'promo', name: 'Акция Купи Квартиру в июле со скидкой до 5%' },
    { id: 'mortgage', name: 'Условия акции «Ипотека от 4.4%»' },
  ],
  size: 'slim',
  value: 'terms',
  label: 'Выбор документа',
}

export const ChooseCity = Template.bind({})
ChooseCity.args = {
  items: [
    { id: '', name: 'Москва и МО' },
    { id: '15', name: 'Москва' },
    { id: '88', name: 'City_without_offices' },
    { id: '89', name: 'City_w_o_w_p' },
    { id: '29', name: 'Балашиха' },
  ],
  value: '',
  renderSelectedValue: ({ id, name }) => '<span>Поиск в</span> Москва и МО',
}
ChooseCity.parameters = { backgrounds: { default: 'light' } }

const itemsDropdownCatalog = [
  { id: '1', name: 'Сначала дешевле' },
  { id: '2', name: 'Сначала дороже' },
  { id: '3', name: 'Дешевле' },
  { id: '4', name: 'Дороже' },
]

const Icon: DropdownProps['renderButton'] = (props) => (
  <div {...props}>
    <SvgSort />
  </div>
)

export const DropdownCatalog = Template.bind({})
DropdownCatalog.args = {
  items: itemsDropdownCatalog,
  value: '2',
  renderButton: Icon,
  theme: 'smallScreenIcon',
}
