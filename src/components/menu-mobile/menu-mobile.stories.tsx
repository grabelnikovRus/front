import { Story, Meta } from '@storybook/react'

import { contacts } from '@/modules/contacts/contacts.mock'

import { MenuMobile, MenuMobileProps } from './menu-mobile'

export default {
  title: 'component/MenuMobile',
  component: MenuMobile,
  parameters: {
    backgrounds: { default: 'dark' },
    nextRouter: {
      path: '/',
      asPath: '/',
      query: {},
    },
  },
} as Meta

const Template: Story<MenuMobileProps> = (args) => <MenuMobile {...args} />

export const MobileMenu = Template.bind({})
MobileMenu.args = {
  contacts,
  menu: [
    {
      attr: null,
      title: 'Главная',
      subtitle: null,
      description: null,
      slug: 'menu_mobile__main',
      background: null,
      foreground: null,
      href: '/',
      suffix: null,
      prefix: null,
      images: null,
      items: [],
    },
    {
      attr: null,
      title: 'Каталог',
      subtitle: null,
      description: null,
      slug: 'menu_mobile__buy',
      background: null,
      foreground: null,
      href: '/buy',
      suffix: null,
      prefix: null,
      images: null,
      items: [],
    },
    {
      attr: null,
      title: 'Продать',
      subtitle: 'Продайте свою квартиру в кратчайшие сроки',
      description: null,
      slug: 'menu_mobile__sale',
      background: null,
      foreground: null,
      href: '/sale',
      suffix: null,
      prefix: null,
      images: null,
      items: [],
    },
    {
      attr: null,
      title: 'Обменять',
      subtitle: 'Обменяйте свою квартиру в указанный срок',
      description: null,
      slug: 'menu_mobile__exchange',
      background: null,
      foreground: null,
      href: '',
      suffix: null,
      prefix: null,
      images: null,
      items: [],
    },
    {
      attr: null,
      title: 'Обмен MAX',
      subtitle: null,
      description: 'Обмен старой квартиры на недвижимость из каталога ПИК-Брокер',
      slug: 'menu_mobile__exchange-max',
      background: null,
      foreground: null,
      href: '/exchange-max',
      suffix: null,
      prefix: null,
      images: null,
      items: [],
    },
  ],
}
