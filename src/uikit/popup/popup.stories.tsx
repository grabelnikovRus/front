import { Story, Meta } from '@storybook/react'

import { Badge } from '@/uikit'

import { Popup, PopupProps } from './popup'

export default {
  title: 'Uikit/Popup',
  component: Popup,
} as Meta

const Template: Story<PopupProps> = (args) => (
  <div style={{ padding: 50 }}>
    <Popup {...args} />
  </div>
)

const PopupButton: PopupProps['renderButton'] = ({ togglePopup, innerRef }) => (
  <Badge onClick={togglePopup} innerRef={innerRef}>
    Первичка
  </Badge>
)

const Icon: PopupProps['renderIcon'] = ({ className }) => (
  <img src="/images/catalog/primary_tag.svg" alt="" className={className} />
)

export const Default = Template.bind({})
Default.args = {
  renderButton: PopupButton,
  renderIcon: Icon,
  title: 'Первичка',
  body: 'Первичная недвижимость – жильё в новостройках, которое мы приобрели по праву переуступки.',
  buttonText: 'Ясно!',
}
