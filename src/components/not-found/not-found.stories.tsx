import { Story, Meta } from '@storybook/react'

import { NotFound } from './not-found'

export default {
  title: 'component/Not Found',
  component: NotFound,
} as Meta

const Template: Story = (args) => <NotFound {...args} />

export const NotFoundStory = Template.bind({})
NotFoundStory.args = {
  fields: {
    heading: {
      value: 'Упс... пустая страничка',
      widgetType: 'text',
    },
    description: {
      value: 'Может начнем все сначала?',
      widgetType: 'text',
    },
    button: {
      value: 'На главную',
      widgetType: 'text',
    },
  },
}
