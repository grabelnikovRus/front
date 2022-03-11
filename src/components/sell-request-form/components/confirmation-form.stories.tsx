import { action } from '@storybook/addon-actions'
import { Story, Meta } from '@storybook/react'
import { Form } from 'react-final-form'

import {
  ConfirmationForm,
  ConfirmationFormProps,
  ConfirmationFormValues,
} from './confirmation-form'

export default {
  title: 'component/sell/Confirmation Form',
  component: ConfirmationForm,
} as Meta

const Template: Story<ConfirmationFormProps> = (args) => (
  <div className="container">
    <Form<ConfirmationFormValues> onSubmit={action('submit')}>
      {(props) => <ConfirmationForm {...props} {...args} />}
    </Form>
  </div>
)

export const Default = Template.bind({})
Default.args = {
  phone: '79239993451',
  onSmsRepeat: async () => undefined,
}
