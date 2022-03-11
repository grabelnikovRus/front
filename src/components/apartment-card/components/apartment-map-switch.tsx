import { VFC, useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { YMaps } from 'react-yandex-maps'

import { config } from '@/config'
import { trackEvent } from '@/lib/tracking'
import { useMediaSmallScreen } from '@/lib/use-media'
import { ApartmentEntity } from '@/modules/apartment'
import { Switcher, Button, SvgClose } from '@/uikit'
import { ModalSimple } from '@/uikit/modal-simple/modal-simple'

import { ApartmentMap } from './apartment-map'
import styles from './apartment-map-switch.module.scss'
import { ApartmentPanorama } from './apartment-panorama'

export const ApartmentMapSwitch: VFC<ApartmentEntity['address']> = (address) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isSmallScreen = useMediaSmallScreen()
  const [value, setValue] = useState<'map' | 'panorama'>('map')
  const [isOpenPanorama, setIsOpenPanorama] = useState(false)
  const [isHavePanorama, setIsHavePanorama] = useState(false)
  const [switherActiveValue, setSwitherActiveValue] = useState('map')
  const coordinates = [address.point.longitude, address.point.latitude]
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const refCurrent = ref.current

    let hasMoved = false
    const mousemoveHandler = () => {
      hasMoved = true
    }

    const mousedownHandler = () => {
      refCurrent.addEventListener('touchmove', mousemoveHandler, { passive: true })
    }

    const mouseupHandler = () => {
      refCurrent.removeEventListener('touchmove', mousemoveHandler)

      if (hasMoved) {
        hasMoved = false
        return
      }

      if (isSmallScreen) {
        setIsOpen(true)
      }
    }

    refCurrent.addEventListener('touchstart', mousedownHandler, { passive: true })
    refCurrent.addEventListener('touchend', mouseupHandler, { passive: true })

    return () => {
      refCurrent.removeEventListener('touchstart', mousedownHandler)
      refCurrent.removeEventListener('touchend', mouseupHandler)
    }
  }, [isSmallScreen])

  const switcherComponent = useMemo(
    () => (
      <>
        {isHavePanorama && (
          <div className={styles.switcher_btn}>
            <Switcher
              theme="neutral"
              size="small"
              activeValue={switherActiveValue}
              buttons={[
                {
                  mode: 'button',
                  callback: () => {
                    setValue('map')
                    setIsOpenPanorama(false)
                  },
                  text: 'Карта',
                  slug: 'map',
                },
                {
                  mode: 'button',
                  callback: () => {
                    setValue('panorama')
                    setSwitherActiveValue('panorama')
                    setIsOpenPanorama(true)
                    trackEvent({
                      category: 'Funnel Apartments',
                      name: 'Clicked on the Panorama',
                      label: 'Panorama',
                    })
                  },
                  text: 'Панорама',
                  slug: 'panorama',
                },
              ]}
            />
          </div>
        )}
      </>
    ),
    [isHavePanorama, switherActiveValue],
  )

  const content = useMemo(
    () => (
      <YMaps query={{ apikey: config.ymapsApiKey, load: 'package.full' }}>
        <ApartmentPanorama
          coordinates={coordinates}
          checkPanorama={(value) => setIsHavePanorama(value)}
          isShowPanorama={isOpenPanorama}
        />
        {value === 'map' && <ApartmentMap address={address} size={isOpen ? 'full' : undefined} />}

        {value === 'panorama' && <div id="player" className={styles.panorama} />}
      </YMaps>
    ),
    [value, isOpen, isOpenPanorama, coordinates], // eslint-disable-line react-hooks/exhaustive-deps
  )

  const resizeWindow = useCallback(
    (event) => {
      if (event.target.innerWidth < 768 && !isOpen) {
        setIsOpenPanorama(false)
        setSwitherActiveValue('map')
        setValue('map')
      }
    },
    [isOpen],
  )

  useEffect(() => {
    window.addEventListener('resize', resizeWindow)
    return () => window.removeEventListener('resize', resizeWindow)
  }, [resizeWindow])

  return (
    <>
      <div ref={ref} className={styles.switcher}>
        <div className="hidden_on_mobile">{switcherComponent}</div>
        {!isOpen && content}
      </div>
      <ModalSimple
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        theme="fullScreen"
        focusRef={closeButtonRef}
      >
        <div className={styles.modal}>
          <div className={styles.modal_header}>
            {switcherComponent}
            <Button
              innerRef={closeButtonRef}
              externalStyles={styles.modal_close}
              onClick={() => {
                setValue('map')
                setIsOpenPanorama(false)
                setIsOpen(false)
              }}
            >
              <SvgClose />
            </Button>
          </div>
          <div className={styles.modal_content}>{content}</div>
          <div className={styles.modal_address}>{address.formatted}</div>
        </div>
      </ModalSimple>
    </>
  )
}
