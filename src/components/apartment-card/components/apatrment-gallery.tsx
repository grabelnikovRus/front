import cn from 'classnames'
import { VFC, useState, useCallback } from 'react'

import { ApartmentImages, ApartmentReference } from '@/api'
import { SliderImages } from '@/components/slider-images/slider-images'
import { trackEvent } from '@/lib/tracking'
import { Button, CopyButton, Picture, SvgFullScreen, SvgPlan, SvgViewWindow } from '@/uikit'

import styles from './apartment-gallery.module.scss'
import { LightBox } from './light-box'
import { MobileGallery } from './mobile-gallery'
import { useLightBox } from './use-light-box'

export interface ApartmentGalleryProps {
  images: ApartmentImages[]
  housingComplex: ApartmentReference | null
  amoId: number
  isSmallerFivePhoto: boolean
}

export const ApartmentGallery: VFC<ApartmentGalleryProps> = ({
  images,
  amoId,
  housingComplex,
  isSmallerFivePhoto,
}) => {
  const [isOpenMobileGallery, setIsOpenMobileGallery] = useState(false)

  const { openLightbox } = useLightBox()

  const [mainPhoto] = images.filter((image) => image.isMain)
  const indexPlan = images.findIndex((image) => image.isPlan)
  const indexWindow = images.findIndex((image) => image.imageGroup?.slug === 'view_from_window')

  const onAnalyticEventOpenGallery = useCallback(() => {
    trackEvent({
      category: 'Funnel Apartments',
      name: 'Clicked on the Photo',
      label: 'Photo',
    })
  }, [])

  return (
    <section className={styles.gallery}>
      <div className={styles.mobile_screen}>
        <SliderImages
          images={images}
          onClick={() => {
            setIsOpenMobileGallery(true)
            onAnalyticEventOpenGallery()
          }}
        />
      </div>
      <div className={styles.medium_screen}>
        <button
          className={styles.medium_screen_btn}
          onClick={() => {
            openLightbox(1)
            onAnalyticEventOpenGallery()
          }}
        >
          <Picture alt={mainPhoto.alt} url={mainPhoto.fileUrl} sizes="688:386" />
        </button>
      </div>
      {isSmallerFivePhoto ? (
        <div className={cn(styles.full_screen, styles.full_screen___few_photo)}>
          <button className={styles.full_screen_btn} onClick={() => openLightbox(1)}>
            <Picture alt={mainPhoto.alt} url={mainPhoto.fileUrl} sizes="776:436" />
          </button>
        </div>
      ) : (
        <div className={cn(styles.full_screen)}>
          {images.slice(0, 5).map((image, index) => (
            <button
              key={image.uuid}
              className={styles.full_screen_btn}
              onClick={() => {
                openLightbox(index + 1)
                onAnalyticEventOpenGallery()
              }}
            >
              <Picture
                alt={image.alt}
                url={image.fileUrl}
                sizes={index === 0 ? '551:462' : '282:228'}
              />
            </button>
          ))}
        </div>
      )}
      <CopyButton
        link={`/apartment/${amoId}`}
        text={housingComplex?.name || 'Квартира'}
        onClick={() => {
          trackEvent({
            category: 'Funnel Apartments',
            name: 'Clicked on Share',
            label: 'Share',
          })
        }}
      />
      <div className={styles.gallery_buttons}>
        {indexPlan >= 0 && (
          <Button
            className={styles.gallery_badge}
            onClick={() => {
              openLightbox(indexPlan + 1)
              trackEvent({
                category: 'Funnel Apartments',
                name: 'Clicked on Layout',
                label: 'Layout',
              })
            }}
          >
            <SvgPlan />
            Планировка
          </Button>
        )}
        {indexWindow >= 0 && (
          <Button
            className={styles.gallery_badge}
            onClick={() => {
              openLightbox(indexWindow + 1)
              trackEvent({
                category: 'Funnel Apartments',
                name: 'Clicked on Layout',
                label: 'Layout',
              })
            }}
          >
            <SvgViewWindow />
            Вид из окна
          </Button>
        )}
        <Button
          className={styles.gallery_full_screen}
          onClick={() => {
            openLightbox(1)
            onAnalyticEventOpenGallery()
          }}
        >
          <SvgFullScreen />
        </Button>
      </div>
      <LightBox images={images} />
      <MobileGallery
        images={images}
        isOpen={isOpenMobileGallery}
        onClose={() => setIsOpenMobileGallery(false)}
      />
    </section>
  )
}
