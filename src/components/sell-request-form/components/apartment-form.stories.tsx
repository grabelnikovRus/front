import { Story, Meta } from '@storybook/react'
import arrayMutators from 'final-form-arrays'
import { Form } from 'react-final-form'

import { ApartmentForm, ApartmentFormProps, ApartmentFormValues } from './apartment-form'

import { checklistSettings } from '../checklist-settings'

export default {
  title: 'component/sell/Apartment Form',
  component: ApartmentForm,
  decorators: [
    (Story) => (
      <div className="container">
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

const Template: Story<ApartmentFormProps> = (args) => (
  <Form<ApartmentFormValues>
    onSubmit={() => {
      null
    }}
    mutators={{ ...arrayMutators }}
  >
    {(props) => <ApartmentForm {...props} {...args} />}
  </Form>
)

export const Default = Template.bind({})
Default.args = {
  settings: checklistSettings,
  fields: {
    address_placeholder: {
      widgetType: 'text',
      value: 'Введите адрес',
    },
    titleFirstStage: {
      widgetType: 'text',
      value: 'Заполните чек-лист',
    },
    textBtnFirstStage: {
      widgetType: 'text',
      value: 'Далее',
    },
  },
}
