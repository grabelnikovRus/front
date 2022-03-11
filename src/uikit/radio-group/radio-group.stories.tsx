import { Story, Meta } from '@storybook/react'

import { CatalogCheckboxGroupLayoutEnum } from '@/api'

import { RadioGroup } from './radio-group'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RadioGroupProps = any

export default {
  title: 'uikit/Radio Group',
  component: RadioGroup,
  decorators: [
    (Story) => (
      <div style={{ width: 355, padding: '24px' }}>
        <Story />
      </div>
    ),
  ],
} as Meta

const Template: Story<RadioGroupProps> = (args) => <RadioGroup {...args} />

export const Switcher = Template.bind({})
Switcher.args = {
  fields: { name: 'renovation' },
  meta: { submitFailed: false },
  theme: 'switcher',
  label: 'Наличие ремонта',
  options: [
    {
      value: 'true',
      caption: 'Есть',
      icon: null,
    },
    {
      value: 'false',
      caption: 'Нет',
      icon: null,
    },
  ],
  layout: CatalogCheckboxGroupLayoutEnum.Row,
}

export const Buttons = Template.bind({})
Buttons.args = {
  fields: { name: 'objectType' },
  meta: { submitFailed: false },
  theme: 'buttons',
  label: 'Тип объекта',
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
  layout: CatalogCheckboxGroupLayoutEnum.Row,
}
