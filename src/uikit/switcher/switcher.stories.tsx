import { action } from '@storybook/addon-actions'
import { Story, Meta } from '@storybook/react'

import { Switcher, SwitcherProps } from './switcher'

export default {
  title: 'uikit/Switcher',
  component: Switcher,
  parameters: {
    backgrounds: {
      default: 'sell',
      values: [
        { name: 'sell', value: '#43B5E9' },
        { name: 'buy', value: '#8CCC98' },
      ],
    },
    nextRouter: {
      path: '/sell/[id]',
      asPath: '/sell',
      query: {},
    },
  },
} as Meta

const Template: Story<SwitcherProps> = (args) => <Switcher {...args} />

export const SwitcherLinkSell = Template.bind({})
SwitcherLinkSell.args = {
  theme: 'blue',
  buttons: [
    {
      mode: 'link',
      path: '/buy',
      text: 'Купить',
      slug: 'buy',
    },
    {
      mode: 'link',
      path: '/sell',
      text: 'Продать',
      slug: 'sell',
    },
  ],
}

export const SwitcherButtonSell = Template.bind({})
SwitcherButtonSell.args = {
  theme: 'blue',
  buttons: [
    {
      mode: 'button',
      callback: action('купить'),
      text: 'Купить',
      slug: 'buy',
    },
    {
      mode: 'button',
      callback: action('продать'),
      text: 'Продать',
      slug: 'sell',
    },
  ],
}

export const SwitcherNeutralTheme = Template.bind({})
SwitcherNeutralTheme.args = {
  theme: 'neutral',
  buttons: [
    {
      mode: 'link',
      path: '/buy',
      text: 'Первичка',
      slug: 'buy',
    },
    {
      mode: 'link',
      path: '/sell',
      text: 'Вторичка',
      slug: 'sell',
    },
  ],
}
