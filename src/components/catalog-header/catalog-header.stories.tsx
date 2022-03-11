import { Story, Meta } from '@storybook/react'

import { CatalogHeader, CatalogHeaderProps } from './catalog-header'

export default {
  title: 'component/Catalog Header',
  component: CatalogHeader,
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#ffffff' }],
    },
  },
} as Meta

const Template: Story<CatalogHeaderProps> = (args) => <CatalogHeader {...args} />

export const Default = Template.bind({})
Default.args = {
  count: 100,
}
