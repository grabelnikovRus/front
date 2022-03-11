import { Story, Meta } from '@storybook/react'

import { apartments } from '@/modules/apartments-v1/apartments.mock'
import { contacts } from '@/modules/contacts/contacts.mock'
import { catalogSettings } from '@/modules/settings-v1/catalog-settings.mock'

import { SearchCatalog, SearchCatalogProps } from './search-catalog'

import { reactQuery } from '../../../config/storybook/decorators'

export default {
  title: 'widget/SearchCatalog',
  component: SearchCatalog,
  parameters: { backgrounds: { default: 'dark' } },
  decorators: [reactQuery],
} as Meta

const Template: Story<SearchCatalogProps> = (args) => <SearchCatalog {...args} />

export const CatalogMain = Template.bind({})
CatalogMain.args = {
  apartments,
  contacts,
  settings: catalogSettings,
}
