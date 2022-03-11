import { Story, Meta } from '@storybook/react'

import obj1_fileURL from '@/assets/img/obj1-file.jpeg'
import obj2_fileURL from '@/assets/img/obj2-file.jpeg'
import obj3_fileURL from '@/assets/img/obj3-file.jpeg'
import obj4_fileURL from '@/assets/img/obj4-file.jpeg'

import { SliderImages, SliderImagesProps } from './slider-images'

export default {
  title: 'component/Slider Images',
  component: SliderImages,
  decorators: [
    (Story) => (
      <div style={{ margin: 30, width: 390 }}>
        <Story />
      </div>
    ),
  ],
} as Meta

const Template: Story<SliderImagesProps> = (args) => <SliderImages {...args} />

export const Slider = Template.bind({})
Slider.args = {
  images: [
    {
      uuid: '26f882d4-e76c-45ad-8141-fdead591ff08',
      title: 'title',
      alt: 'alt',
      isMain: true,
      isPlan: false,
      imageGroup: {
        name: 'Комнаты',
        slug: 'rooms',
        uuid: '370b19e5-7ba3-46e6-804b-acb23b5946ff',
      },
      fileUrl: `${process.env.NEXT_PUBLIC_STORYBOOK_ORIGIN}/${obj1_fileURL}`,
    },
    {
      uuid: 'ece58750-5b70-4a6d-8f7a-76cf4344ecde',
      title: 'title',
      alt: 'alt',
      isMain: false,
      isPlan: false,
      imageGroup: {
        name: 'Коридор',
        slug: 'hallway',
        uuid: '0cb05b20-52ba-41e6-bc70-2b17a1ea8f9c',
      },
      fileUrl: `${process.env.NEXT_PUBLIC_STORYBOOK_ORIGIN}/${obj2_fileURL}`,
    },
    {
      uuid: '7e5dfb92-0e8a-49ec-9d07-07a357002d83',
      title: 'title',
      alt: 'alt',
      isMain: false,
      isPlan: false,
      imageGroup: {
        name: 'Кухня',
        slug: 'kitchen',
        uuid: '906dcac0-fc59-4dc4-bb0c-1aed12bac305',
      },
      fileUrl: `${process.env.NEXT_PUBLIC_STORYBOOK_ORIGIN}/${obj3_fileURL}`,
    },
    {
      uuid: '4a6e9e82-225c-4ec1-a796-224e201673cf',
      title: 'title',
      alt: 'alt',
      isMain: false,
      isPlan: true,
      imageGroup: {
        name: 'Планировка',
        slug: 'plan',
        uuid: 'c144b729-ac58-4b6f-b77c-c7792b2f3bf4',
      },
      fileUrl: `${process.env.NEXT_PUBLIC_STORYBOOK_ORIGIN}/${obj4_fileURL}`,
    },
  ],
  link: '/aaaa',
}
