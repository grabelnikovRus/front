import { action } from '@storybook/addon-actions'
import { Story, Meta } from '@storybook/react'
import { Form } from 'react-final-form'

import {
  RegistrationForm,
  RegistrationFormProps,
  RegistrationFormValues,
} from './registration-form'

export default {
  title: 'component/sell/Registration Form',
  component: RegistrationForm,
} as Meta

const Template: Story<RegistrationFormProps> = (args) => (
  <div className="container">
    <Form<RegistrationFormValues> onSubmit={action('submit')}>
      {(props) => <RegistrationForm {...props} {...args} />}
    </Form>
  </div>
)

export const Default = Template.bind({})
Default.args = {}
