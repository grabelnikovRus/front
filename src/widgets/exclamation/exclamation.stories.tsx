import { Story, Meta } from '@storybook/react'

import { Exclamation, ExclamationProps } from './exclamation'

export default {
  title: 'widget/Exclamation',
  component: Exclamation,
  parameters: { actions: { argTypesRegex: null } },
} as Meta

const Template: Story<ExclamationProps> = (args) => (
  <div style={{ width: 600 }}>
    <Exclamation {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  fields: {
    text: {
      value:
        'Срок действия сертификата: с даты государственной регистрации Договора об уступке прав и обязанностей участника долевого строительства, заключенного между ООО «ПИК-Брокер» и владельцем сертификата и является бессрочным. Сертификат составлен в единственном подлинном экземпляре.',
      widgetType: 'text',
    },
  },
}
