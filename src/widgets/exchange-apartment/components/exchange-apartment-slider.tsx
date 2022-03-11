import cn from 'classnames'
import { useRef, VFC } from 'react'
import SwiperCore, { Lazy, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { categoryForAnalytic, trackEvent } from '@/lib/tracking'
import { isTextField, WidgetFields } from '@/modules/widgets'

import styles from './exchange-apartment-slider.module.scss'
import { getIcon } from './get-icon'

export interface ExchangeApartmentSliderProps {
  titles: string[]
  lists: WidgetFields[][]
}

SwiperCore.use([Lazy, Navigation, Pagination])

export const ExchangeApartmentSlider: VFC<ExchangeApartmentSliderProps> = ({ titles, lists }) => {
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)
  return (
    <Swiper
      className={styles.slider}
      loop
      pagination={{
        type: 'bullets',
        clickable: true,
        renderBullet: (index, className) => `<div class=${className}>${titles[index]}</div>`,
      }}
      navigation={{ prevEl: navigationPrevRef.current, nextEl: navigationNextRef.current }}
      onBeforeInit={(swiper) => {
        if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
          swiper.params.navigation.prevEl = navigationPrevRef.current
          swiper.params.navigation.nextEl = navigationNextRef.current
        }
      }}
      onRealIndexChange={(swiper) => {
        const activeElTitle = titles[swiper.realIndex]
        if (activeElTitle === 'ПИК') {
          trackEvent({
            category: categoryForAnalytic(location.pathname),
            name: 'Clicked in the PIK developer selection block',
            label: 'PIK developer selection block',
          })
        } else if (activeElTitle === 'A101') {
          trackEvent({
            category: categoryForAnalytic(location.pathname),
            name: 'Clicked in the Block the choice of developer A101',
            label: 'Block the choice of developer A101',
          })
        } else if (activeElTitle === 'Level Group') {
          trackEvent({
            category: categoryForAnalytic(location.pathname),
            name: 'Clicked in the Block the choice of developer Level Group',
            label: 'Block the choice of developer Level Group',
          })
        }
      }}
    >
      {lists.map((el, index) => (
        <SwiperSlide key={isTextField(el[0].description) ? el[0].description.value : index}>
          <div className={styles.description}>
            {el.map(({ icon, description }, ind) => (
              <li
                className={styles.description_item}
                key={isTextField(description) ? description.value : ind}
              >
                <span className={styles.description_icon}>
                  {isTextField(icon) ? getIcon(icon.value) : ''}
                </span>
                <span className={styles.description_text}>
                  {isTextField(description) ? description.value : ''}
                </span>
              </li>
            ))}
          </div>
        </SwiperSlide>
      ))}
      <div
        className={cn(styles.slider_arrow, styles.slider_arrow___prev)}
        onClick={() =>
          trackEvent({
            category: categoryForAnalytic(location.pathname),
            name: 'Clicked the Left Arrow in the developer selection block',
            label: 'Left Arrow in the developer selection block',
          })
        }
        ref={navigationPrevRef}
      />
      <div
        className={cn(styles.slider_arrow, styles.slider_arrow___next)}
        onClick={() =>
          trackEvent({
            category: categoryForAnalytic(location.pathname),
            name: 'Clicked the Right Arrow in the developer selection block',
            label: 'Right Arrow in the developer selection block',
          })
        }
        ref={navigationNextRef}
      />
    </Swiper>
  )
}
