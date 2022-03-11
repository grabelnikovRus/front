import { Story, Meta } from '@storybook/react'

import { Tooltip, TooltipProps } from './tooltip'

export default {
  title: 'Uikit/Tooltip',
  component: Tooltip,
} as Meta

const Template: Story<TooltipProps> = (args) => (
  <div style={{ padding: 100 }}>
    Площадь <Tooltip {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  title: 'Площадь квартиры',
  body: 'Укажите площадь, которая обозначена в документах. Балконы и лоджии не учитываются.',
}
