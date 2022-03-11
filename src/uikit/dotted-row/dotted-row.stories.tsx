import { Story, Meta } from '@storybook/react'
import { HTMLAttributes } from 'react'

import { DottedRow } from './dotted-row'

export default {
  title: 'uikit/Dot',
  component: DottedRow,
  parameters: {
    backgrounds: { default: 'dark' },
  },
} as Meta

const Template: Story<HTMLAttributes<HTMLSpanElement>> = (args) => (
  <div style={{ marginLeft: 50, marginTop: 50 }}>
    <DottedRow {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {}
