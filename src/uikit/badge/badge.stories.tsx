import { action } from '@storybook/addon-actions'
import { Story, Meta } from '@storybook/react'

import { Badge, BadgeProps } from './badge'

export default {
  title: 'uikit/Badge',
  component: Badge,
  parameters: { actions: { argTypesRegex: null } },
} as Meta

const Template: Story<BadgeProps> = (args) => (
  <div style={{ width: 100 }}>
    <Badge {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  children: '64 000 ₽/м²',
}

export const Clickable = Template.bind({})
Clickable.args = {
  children: 'Первичка',
  onClick: action('clicked'),
}

export const Gradient = Template.bind({})
Gradient.args = {
  children: 'Скидка до 5%',
  mode: 'gradient',
  href: '#',
}
