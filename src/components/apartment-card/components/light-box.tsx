import { VFC } from 'react'

import { ApartmentImages } from '@/api'
import FsLightBox from '@/lib/fs-light-box'
import { Picture } from '@/uikit'

import { useLightBox } from './use-light-box'

interface LightBoxProps {
  images: ApartmentImages[]
}

interface FSLightBoxArgs {
  state: { isOpen: boolean }
}

const LIGHT_BOX_IMAGE_SIZES = {
  '(max-width: 1023px)': '680:453',
  '(max-width: 1439px)': '1360:903',
  '(min-width: 1440px)': '1920:1275',
}

export const LightBox: VFC<LightBoxProps> = ({ images }) => {
  const { toggler, slide, updateOpenStatus } = useLightBox()

  const sources = images.map((image) => (
    <div key={image.uuid}>
      <Picture
        alt={image.alt}
        title={image.imageGroup?.name}
        url={image.fileUrl}
        sizes={LIGHT_BOX_IMAGE_SIZES}
        resizingType="fit"
      />
    </div>
  ))

  const handleOpen = (args: FSLightBoxArgs) => updateOpenStatus(args.state.isOpen)

  return (
    <FsLightBox
      toggler={toggler}
      sources={sources}
      slide={slide}
      disableThumbs
      zoomIncrement={0.5}
      onOpen={handleOpen}
      onClose={handleOpen}
    />
  )
}
