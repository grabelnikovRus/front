import { Dialog } from '@headlessui/react'
import { useRef, VFC, Fragment } from 'react'

import { ApartmentImages } from '@/api'
import { ButtonIcon, Picture, SvgClose } from '@/uikit'

import styles from './mobile-gallery.module.scss'
import { useLightBox } from './use-light-box'

interface MobileGalleryProps {
  images: ApartmentImages[]
  isOpen: boolean
  onClose: () => void
}

export const MobileGallery: VFC<MobileGalleryProps> = ({ images, isOpen, onClose }) => {
  const confirmButtonRef = useRef(null)

  const { openLightbox, isOpen: isOpenLightbox } = useLightBox()

  return (
    <Dialog
      open={isOpen}
      className={styles.gallery}
      onClose={isOpenLightbox ? () => null : onClose}
      initialFocus={confirmButtonRef}
    >
      <Dialog.Title className={styles.gallery_title}>
        Галерея{' '}
        <ButtonIcon
          onClick={onClose}
          innerRef={confirmButtonRef}
          className={styles.gallery_close}
        >
          <SvgClose />
        </ButtonIcon>
      </Dialog.Title>
      <Dialog.Description className={styles.gallery_body}>
        {images.map((image, index) => (
          <Fragment key={image.uuid}>
            <span className={styles.gallery_text}>{image.imageGroup?.name}</span>
            <button onClick={() => openLightbox(index + 1)} className={styles.gallery_btn}>
              <Picture alt={image.alt} title={image.title} url={image.fileUrl} sizes="343:343" />
            </button>
          </Fragment>
        ))}
      </Dialog.Description>
    </Dialog>
  )
}
