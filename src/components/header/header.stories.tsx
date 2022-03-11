import { Story, Meta } from '@storybook/react'

import { contacts } from '@/modules/contacts/contacts.mock'
import { menus } from '@/modules/menu/menu.mock'

import { Header, HeaderProps } from './header'

import styles from '../../../config/storybook/storybook-container.module.scss'

export default {
  title: 'component/Header',
  component: Header,
  decorators: [
    (Story) => (
      <div className={styles.container}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: { default: 'dark' },
    nextRouter: {
      path: '/buy',
      asPath: '/buy',
      query: {},
    },
  },
} as Meta

const Template: Story<HeaderProps> = (args) => <Header {...args} />

export const HeaderSite = Template.bind({})
HeaderSite.args = {
  contacts,
  menu: menus.menu_desktop,
  widget: {
    name: 'city_map_v5__global',
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
  },
}
