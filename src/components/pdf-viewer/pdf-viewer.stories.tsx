import { Story, Meta } from '@storybook/react'

import PdfViewer, { PdfViewerProps } from './pdf-viewer'

export default {
  title: 'widget/PdfViewer',
  component: PdfViewer,
  parameters: { backgrounds: { default: 'dark' } },
} as Meta

const Template: Story<PdfViewerProps> = (args) => <PdfViewer {...args} />

export const CatalogMain = Template.bind({})
CatalogMain.args = {
  viewData: 'https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf',
}
