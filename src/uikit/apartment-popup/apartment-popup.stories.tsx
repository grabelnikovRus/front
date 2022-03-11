import { Story, Meta } from '@storybook/react'

import { ApartmentPopup, ApartmentPopupProps, ModePopup } from './apartment-popup'

export default {
  title: 'uikit/ApartmentPopup',
  component: ApartmentPopup,
} as Meta

const Template: Story<ApartmentPopupProps> = (args) => <ApartmentPopup {...args} />

export const ApartmentPopupTrade = Template.bind({})
ApartmentPopupTrade.args = {
  mode: ModePopup.TRADE,
}

export const ApartmentPopupPrimary = Template.bind({})
ApartmentPopupPrimary.args = {
  mode: ModePopup.PRIMARY,
}

export const ApartmentPopupSecondary = Template.bind({})
ApartmentPopupSecondary.args = {
  mode: ModePopup.SECONDARY,
}
