import { Story, Meta } from '@storybook/react'

import { contacts } from '@/modules/contacts/contacts.mock'
import { pages } from '@/modules/pages/pages.mock'

import { Footer, FooterProps } from './footer'

export default {
  title: 'component/Footer',
  component: Footer,
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#ffffff' }],
    },
  },
} as Meta

const Template: Story<FooterProps> = (args) => <Footer {...args} />

export const FooterSite = Template.bind({})
FooterSite.args = {
  menuSocial: [
    {
      attr: null,
      background: null,
      description: null,
      foreground: null,
      href: 'https://api.whatsapp.com/send?phone=74952522255&text=',
      images: null,
      items: [],
      prefix: null,
      slug: 'social__Facebook',
      subtitle: null,
      suffix: null,
      title: 'Facebook',
    },
    {
      attr: null,
      background: null,
      description: null,
      foreground: null,
      href: 'https://api.whatsapp.com/send?phone=74952522255&text=',
      images: null,
      items: [],
      prefix: null,
      slug: 'social__VK',
      subtitle: null,
      suffix: null,
      title: 'VK',
    },
    {
      attr: null,
      background: null,
      description: null,
      foreground: null,
      href: 'https://api.whatsapp.com/send?phone=74952522255&text=',
      images: null,
      items: [],
      prefix: null,
      slug: 'social__Instagram',
      subtitle: null,
      suffix: null,
      title: 'Instagram',
    },
    {
      attr: null,
      background: null,
      description: null,
      foreground: null,
      href: 'https://api.whatsapp.com/send?phone=74952522255&text=',
      images: null,
      items: [],
      prefix: null,
      slug: 'social__whatsapp',
      subtitle: null,
      suffix: null,
      title: 'WhatsApp',
    },
    {
      attr: null,
      background: null,
      description: null,
      foreground: null,
      href: 'tg://resolve?domain=PIK_Broker_bot',
      images: null,
      items: [],
      prefix: null,
      slug: 'social__telegram',
      subtitle: null,
      suffix: null,
      title: 'Telegram',
    },
    {
      attr: null,
      background: null,
      description: null,
      foreground: null,
      href: 'https://api.whatsapp.com/send?phone=74952522255&text=',
      images: null,
      items: [],
      prefix: null,
      slug: 'social__OK',
      subtitle: null,
      suffix: null,
      title: 'OK',
    },
    {
      attr: null,
      background: null,
      description: null,
      foreground: null,
      href: 'https://api.whatsapp.com/send?phone=74952522255&text=',
      images: null,
      items: [],
      prefix: null,
      slug: 'social__Почта',
      subtitle: null,
      suffix: null,
      title: 'Почта',
    },
  ],
  widget: {
    fields: {
      copyright: {
        value: '©2019-2021. ООО «ПИК-Брокер» Все права защищены',
        widgetType: 'text',
      },
      terms_link: {
        value: 'termsLegalPage',
        widgetType: 'text',
      },
      terms_text: {
        value: 'Условия пользования сайта',
        widgetType: 'text',
      },
      text: {
        value:
          'Данный сайт носит информационно–справочный характер и ни при каких условиях не является публичной офертой',
        widgetType: 'text',
      },
    },
    name: 'footer_v5__global',
  },
  pages,
  contacts,
}
