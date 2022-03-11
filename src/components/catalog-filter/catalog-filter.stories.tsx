import { Story, Meta } from '@storybook/react'

import { contacts } from '@/modules/contacts/contacts.mock'
import { catalogSettings } from '@/modules/settings-v1/catalog-settings.mock'

import { CatalogFilter, CatalogFilterProps } from './catalog-filter'

export default {
  title: 'component/Catalog Filter',
  component: CatalogFilter,
  decorators: [
    (Story) => (
      <div style={{ width: '307px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#ffffff' }],
    },
  },
} as Meta

const Template: Story<CatalogFilterProps> = (args) => <CatalogFilter {...args} />

export const Default = Template.bind({})
Default.args = {
  settings: catalogSettings,
  contacts,
  formCloseTrigger: false,
  pathname: '/catalog',
}
