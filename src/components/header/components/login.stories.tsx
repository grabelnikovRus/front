import { Story, Meta } from '@storybook/react'

import { pages } from '@/modules/pages/pages.mock'

import { Login, LoginProps } from './login'

import headerStyles from '../header.module.scss'

export default {
  title: 'component/Login',
  component: Login,
  parameters: { backgrounds: { default: 'dark' } },
  argTypes: {
    closeLocation: { action: 'close' },
    openLocation: { action: 'open' },
  },
} as Meta

const Template: Story<LoginProps> = (args) => <Login {...args} />

export const LoginSite = Template.bind({})
LoginSite.args = {
  legalWidgetPresent: false,
  open: true,
  pageSlug: 'buy',
  pages,
  className: headerStyles.any_icon,
}
