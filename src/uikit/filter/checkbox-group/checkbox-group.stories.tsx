import { Story, Meta } from '@storybook/react'

import { CheckboxGroup } from './checkbox-group'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CheckboxGroupProps = any

export default {
  title: 'uikit/Filter/Checkbox Group',
  component: CheckboxGroup,
  decorators: [
    (Story) => (
      <div style={{ width: 355, padding: '24px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#ffffff' }],
    },
  },
} as Meta

const Template: Story<CheckboxGroupProps> = (args) => <CheckboxGroup {...args} values={[]} />

const defaultCheckboxes: CheckboxGroupProps['options'] = [
  {
    value: '0',
    caption: 'Не важно',
    slug: null,
  },
  {
    value: '1',
    caption: '2.5 м',
    slug: null,
  },
  {
    value: '2',
    caption: '2.6 м',
    slug: null,
  },
  {
    value: '3',
    caption: '2.7 м',
    slug: null,
  },
  {
    value: '4',
    caption: '2.8 м',
    slug: null,
  },
  {
    value: '5',
    caption: '2.9 м',
    slug: null,
  },
  {
    value: '6',
    caption: '3 м',
    slug: null,
  },
  {
    value: '7',
    caption: '3 м+',
    slug: null,
  },
]

export const Default = Template.bind({})
Default.args = {
  fields: { name: '' },
  meta: { submitFailed: false },
  label: 'Высота потолков',
  options: defaultCheckboxes,
  layout: 'wrap',
  initial: null,
}

const rooms: CheckboxGroupProps['options'] = [
  {
    value: '0',
    caption: 'Студия',
    slug: null,
  },
  {
    value: '1',
    caption: '1',
    slug: null,
  },
  {
    value: '2',
    caption: '2',
    slug: null,
  },
  {
    value: '3',
    caption: '3',
    slug: null,
  },
]

export const Rooms = Template.bind({})
Rooms.args = {
  fields: { name: '' },
  meta: { submitFailed: false },
  label: 'Комнат',
  options: rooms,
  layout: 'main',
}

const decorationType: CheckboxGroupProps['options'] = [
  {
    value: '0',
    caption: 'Любой',
    slug: null,
  },
  {
    value: '1',
    caption: 'Без ремонта',
    slug: 'noCian',
  },
  {
    value: '2',
    caption: 'Косметический',
    slug: 'cosmeticCian',
  },
  {
    value: '3',
    caption: 'Евроремонт',
    slug: 'euroCian',
  },
  {
    value: '4',
    caption: 'Дизайнерский',
    slug: 'designCian',
  },
]

export const Decoration = Template.bind({})
Decoration.args = {
  fields: { name: '' },
  meta: { submitFailed: false },
  label: 'Уровень ремонта',
  options: decorationType,
  layout: 'column',
  showIcon: true,
}

const details: CheckboxGroupProps['options'] = [
  {
    value: null,
    caption: 'Следы от затопления',
    icon: null,
  },
  {
    value: null,
    caption: 'Следы от пожара',
    icon: null,
  },
  {
    value: null,
    caption: 'Насекомые',
    icon: null,
  },
  {
    value: null,
    caption: 'Плесень на стенах и потолке',
    icon: null,
  },
  {
    value: null,
    caption: 'Видимые трещины в стенах',
    icon: null,
  },
  {
    value: null,
    caption: 'Плохое состояние сан. узла (полное или частичное отсутствие плитки)',
    icon: null,
  },
  {
    value: null,
    caption: 'Видимые трещины в стенах',
    icon: null,
  },
]

export const Details = Template.bind({})
Details.args = {
  fields: { name: '' },
  meta: { submitFailed: false },
  options: details,
  theme: 'classic',
}
