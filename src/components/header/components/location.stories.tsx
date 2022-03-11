import { Story, Meta } from '@storybook/react'

import { contacts } from '@/modules/contacts/contacts.mock'

import { Location, LocationProps } from './location'

export default {
  title: 'component/Location',
  component: Location,
  argTypes: { openLocation: { action: 'closed' } },
} as Meta

const Template: Story<LocationProps> = (args) => <Location {...args} />

export const Default = Template.bind({})
Default.args = {
  open: true,
  contacts,
  fields: {
    heading: {
      widgetType: 'text',
      value: 'Города в которых мы работаем',
    },
    search_placeholder: {
      widgetType: 'text',
      value: 'Искать по городу',
    },
  },
}
