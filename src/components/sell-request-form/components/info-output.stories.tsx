import { Story, Meta } from '@storybook/react'

import { InfoOutput, InfoOutputProps } from './info-output'

import { checklistSettings } from '../checklist-settings'

export default {
  title: 'component/Info Output',
  component: InfoOutput,
} as Meta

const Template: Story<InfoOutputProps> = (args) => (
  <div className="pik_broker">
    <InfoOutput {...args} />
  </div>
)

export const Info = Template.bind({})
Info.args = {
  settings: checklistSettings,
  aptData: {
    address: 'Москва',
    area: 30,
    floor: 2,
    isInOperation: ['true'],
    releaseYear: 2023,
    isOwnership: ['false'],
    isTransferAcceptanceCertificate: ['false'],
    isMortgage: ['false'],
    objectType: ['apartment'],
    price: 8000000,
    renovationType: ['cosmetic'],
    renovationYear: 2007,
    roomType: ['0'],
  },
  fields: {
    titleSecondStage: {
      widgetType: 'text',
      value: 'Всё верно?',
    },
    textBackBtnSecondStage: {
      widgetType: 'text',
      value: 'Изменить данные',
    },
    textNextBtnSecondStage: {
      widgetType: 'text',
      value: 'Всё верно',
    },
  },
  onBack: () => null,
  onNext: () => null,
}
