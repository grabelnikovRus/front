import cn from 'classnames'
import { useRef, useState, VFC } from 'react'
import SwiperCore, { Lazy, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ApartmentImages } from '@/api'
import { Picture, SvgArrowRight } from '@/uikit'

import { WrapperSlider } from './components/wrapper-slider'
import styles from './slider-images.module.scss'

export interface SliderImagesProps {
  images: ApartmentImages[]
  link?: string
  onClick?: () => void
  onAnalyticEvent?: (type?: string) => void
}

SwiperCore.use([Lazy, Navigation])

const SLIDER_IMAGE_SIZES = {
  '(min-width: 1024px)': '390:218',
  '(min-width: 375px)': '340:191',
  '(max-width: 374px)': '288:162',
}

export const SliderImages: VFC<SliderImagesProps> = ({ images, ...props }) => {
  const [slide, setSlide] = useState(0)
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)

  const getPaginationWidth = () => {
    const length = images.length || 0

    if (length === 0) return '0%'

    const percent = 100 / length
    const selectIndex = slide > length - 1 ? slide - length : slide
    const parseIndex = selectIndex < length ? selectIndex : 0

    return percent * parseIndex + '%'
  }

  return (
    <WrapperSlider {...props}>
      <Swiper
        loop
        preloadImages={false}
        className={styles.slider}
        navigation={{ prevEl: navigationPrevRef.current, nextEl: navigationNextRef.current }}
        lazy={{ loadPrevNext: true }}
        onSlideChange={(swiper) => {
          setSlide(swiper.realIndex)
        }}
        onBeforeInit={(swiper) => {
          if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
            swiper.params.navigation.prevEl = navigationPrevRef.current
            swiper.params.navigation.nextEl = navigationNextRef.current
          }
        }}
      >
        {images.map((image) => (
          <SwiperSlide key={image.uuid}>
            <Picture
              alt={image.alt}
              url={image.fileUrl}
              sizes={SLIDER_IMAGE_SIZES}
              className="swiper-lazy"
              lazy
            />
          </SwiperSlide>
        ))}
        {images.length > 1 && (
          <ul className={styles.pagination}>
            <li className={styles.pagination_fill} style={{ width: getPaginationWidth() }} />
          </ul>
        )}
        <div
          className={cn(styles.slider_arrow, styles.slider_arrow___prev)}
          ref={navigationPrevRef}
          onClick={(e) => {
            e.stopPropagation()
            props.onAnalyticEvent?.('arrow')
          }}
        >
          <SvgArrowRight />
        </div>
        <div
          className={cn(styles.slider_arrow, styles.slider_arrow___next)}
          ref={navigationNextRef}
          onClick={(e) => {
            e.stopPropagation()
            props.onAnalyticEvent?.('arrow')
          }}
        >
          <SvgArrowRight />
        </div>
      </Swiper>
    </WrapperSlider>
  )
}
