import { Meta, Story } from '@storybook/react'

import fileUrl from '@/assets/img/obj1-file.jpeg'

import { Picture, PictureProps } from './picture'

export default {
  title: 'uikit/Picture',
  component: Picture,
} as Meta

const Template: Story<PictureProps> = (args) => (
  <div>
    <Picture {...args}>children</Picture>
  </div>
)

export const Default = Template.bind({})
Default.args = {
  alt: 'alt',
  title: 'title',
  url: `${process.env.NEXT_PUBLIC_STORYBOOK_ORIGIN}/${fileUrl}`,
  sizes: {
    '(max-width: 767px)': '340:191',
    '(max-width: 1023px)': '680:453',
    '(max-width: 1439px)': '1360:903',
    '(min-width: 1440px)': '1920:1275',
  },
}
