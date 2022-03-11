import cn from 'classnames'
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState, VFC } from 'react'

import { Apartment, Promo, SearchApartmentsResponseV1ResponseBody } from '@/api'
import { ApartmentSnippet } from '@/components/apartment-snippet/apartment-snippet'
import { pluralizeCardinal } from '@/lib/i18n'
import { trackEvent } from '@/lib/tracking'
import { useMediaSmallScreen } from '@/lib/use-media'
import { getApartments } from '@/modules/apartments-v1'
import { WidgetFields } from '@/modules/widgets'
import { SvgClose, SvgPreloaderSlider } from '@/uikit'
import { BottomSheet } from '@/uikit/bottom-sheet/bottom-sheet'
import { useMenuMobile } from '@components/menu-mobile/use-menu-mobile.hook'

import styles from './list-maps.module.scss'

export interface ListMaps {
  apartmentList: Apartment[]
  setApartmentList: Dispatch<SetStateAction<Apartment[]>>
  infoPin: Pick<SearchApartmentsResponseV1ResponseBody, 'count'>
  apartmentId: number[]
  contactPhoneNumber?: string
  onCloseListApartments: () => void
  bannerApartmentSnippet?: WidgetFields
  bannerModal?: WidgetFields
  userHasActiveDeals: boolean
}

export const ListMaps: VFC<ListMaps> = ({
  apartmentList,
  apartmentId,
  infoPin,
  setApartmentList,
  contactPhoneNumber,
  onCloseListApartments,
  bannerApartmentSnippet,
  bannerModal,
  userHasActiveDeals,
}) => {
  const list = useRef<Element | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const menuMobileState = useMenuMobile()
  const isSmallScreen = useMediaSmallScreen()

  const onScrollList = useCallback(() => {
    const isScrolled =
      list.current?.scrollHeight ===
      (list.current?.scrollTop as number) + (list.current?.clientHeight as number)
    if (!isScrolled) return
    if (apartmentList.length >= (infoPin.count ?? 0)) return
    setIsLoading(true)
    getApartments(
      { apartments: apartmentId },
      userHasActiveDeals ? Promo.ExMax : Promo.Default,
    ).then(({ apartments }) => {
      setApartmentList((apartmentList) => [...apartmentList, ...apartments])
      setIsLoading(false)
    })
  }, [infoPin, apartmentId, setApartmentList, apartmentList, userHasActiveDeals])

  useEffect(() => {
    list.current = document.body.querySelector('#list')
    list.current?.addEventListener('scroll', onScrollList)
    return () => list.current?.removeEventListener('scroll', onScrollList)
  }, [onScrollList])

  useEffect(() => {
    list.current?.scrollTo(0, 0)
  }, [apartmentId])

  useEffect(() => {
    document.body.classList.add(styles.hidden)
    return () => document.body.classList.remove(styles.hidden)
  }, [])

  return (
    <>
      {isSmallScreen ? (
        <BottomSheet isOpen={menuMobileState.isOpenList} onClose={menuMobileState.closeList}>
          <BottomSheet.Container
            isOpen={menuMobileState.isOpenList}
            onClose={menuMobileState.closeList}
            className={styles.bottom_sheet_content}
            classNameWrapper={styles.bottom_sheet_wrapper}
          >
            <section id="list" className={styles.list_wrapper}>
              {apartmentList.map((apartment) => (
                <ApartmentSnippet
                  key={apartment.uuid}
                  apartment={apartment}
                  contactPhoneNumber={contactPhoneNumber}
                  bannerApartmentSnippet={bannerApartmentSnippet}
                  bannerModal={bannerModal}
                  placement="map"
                />
              ))}
              {isLoading && (
                <div className={styles.list_preloader}>
                  <SvgPreloaderSlider />
                </div>
              )}
            </section>
          </BottomSheet.Container>
        </BottomSheet>
      ) : (
        <div
          className={cn(styles.list, {
            [styles.list___open]: menuMobileState.isOpenList,
          })}
        >
          <div className={styles.list___close}>
            <span className={styles.list_count}>
              {pluralizeCardinal(infoPin.count ?? 0, ['Объектов', 'Объект', 'Объекта'])}
            </span>
            <SvgClose
              onClick={() => {
                onCloseListApartments()
                menuMobileState.closeList()
                trackEvent({
                  category: 'Funnel Buy Map',
                  label: 'Close in the object card',
                  name: 'Clicked Close in the object card',
                })
              }}
            />
          </div>
          <section id="list" className={styles.list_wrapper}>
            {apartmentList.map((apartment) => (
              <ApartmentSnippet
                key={apartment.uuid}
                apartment={apartment}
                contactPhoneNumber={contactPhoneNumber}
                bannerApartmentSnippet={bannerApartmentSnippet}
                bannerModal={bannerModal}
                placement="map"
              />
            ))}
            {isLoading && (
              <div className={styles.list_preloader}>
                <SvgPreloaderSlider />
              </div>
            )}
          </section>
        </div>
      )}
    </>
  )
}
