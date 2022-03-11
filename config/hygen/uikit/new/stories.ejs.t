---
to: src/uikit/<%= name %>/<%= name %>.stories.tsx
---
import { Meta, Story } from '@storybook/react'

import { <%= h.changeCase.pascal(name) %>, <%= h.changeCase.pascal(name) %>Props } from './<%= name %>'

export default {
  title: 'uikit/<%= h.changeCase.pascal(name) %>',
  component: <%= h.changeCase.pascal(name) %>,
} as Meta

const Template: Story<<%= h.changeCase.pascal(name) %>Props> = (args) => (
  <div>
    <<%= h.changeCase.pascal(name) %> {...args}>children</<%= h.changeCase.pascal(name) %>>
  </div>
)

export const Default = Template.bind({})
Default.args = {}
