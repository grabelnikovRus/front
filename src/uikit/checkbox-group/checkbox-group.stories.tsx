import { Story, Meta } from '@storybook/react'

import { CheckboxGroup, CheckboxGroupProps } from './checkbox-group'

export default {
  title: 'uikit/Checkbox Group',
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

const Template: Story<CheckboxGroupProps> = (args) => (
  <CheckboxGroup {...args} values={['Да', 'Нет']} />
)

const defaultCheckboxes: CheckboxGroupProps['options'] = [
  {
    value: '0',
    caption: 'Не важно',
    icon: null,
  },
  {
    value: '1',
    caption: '2.5 м',
    icon: null,
  },
  {
    value: '2',
    caption: '2.6 м',
    icon: null,
  },
  {
    value: '3',
    caption: '2.7 м',
    icon: null,
  },
  {
    value: '4',
    caption: '2.8 м',
    icon: null,
  },
  {
    value: '5',
    caption: '2.9 м',
    icon: null,
  },
  {
    value: '6',
    caption: '3 м',
    icon: null,
  },
  {
    value: '7',
    caption: '3 м+',
    icon: null,
  },
]

export const Default = Template.bind({})
Default.args = {
  label: 'Высота потолков',
  options: defaultCheckboxes,
}

const rooms: CheckboxGroupProps['options'] = [
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
]

export const Rooms = Template.bind({})
Rooms.args = {
  label: 'Комнат',
  options: rooms,
}

const decorationType: CheckboxGroupProps['options'] = [
  {
    value: '0',
    caption: 'Любой',
    icon: null,
  },
  {
    value: '1',
    caption: 'Без ремонта',
    icon: 'noCian',
  },
  {
    value: '2',
    caption: 'Косметический',
    icon: 'cosmeticCian',
  },
  {
    value: '3',
    caption: 'Евроремонт',
    icon: 'euroCian',
  },
  {
    value: '4',
    caption: 'Дизайнерский',
    icon: 'designCian',
  },
]

export const Decoration = Template.bind({})
Decoration.args = {
  label: 'Уровень ремонта',
  options: decorationType,
}

const house: CheckboxGroupProps['options'] = [
  {
    value: 'Да',
    caption: 'Да',
    icon: null,
  },
  {
    value: null,
    caption: 'Нет',
    icon: null,
  },
]

export const isHouseBuilt = Template.bind({})
isHouseBuilt.args = {
  label: 'Дом сдан?',
  options: house,
  theme: 'indicatorButton',
}
