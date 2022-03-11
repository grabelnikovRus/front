import cn from 'classnames'
import { useEffect, useRef, VFC } from 'react'

import { CatalogFilter } from '@/components/catalog-filter/catalog-filter'
import { trackEvent } from '@/lib/tracking'
import { useBodyScrollLock } from '@/lib/use-body-scroll-lock'
import { useBrowserDetector } from '@/lib/use-browser-detector'
import { useMediaSmallScreen } from '@/lib/use-media'
import { ContactsEntity } from '@/modules/contacts'
import { CatalogSettingsEntity } from '@/modules/settings-v1'
import { SvgClose } from '@/uikit'
import { BottomSheet } from '@/uikit/bottom-sheet/bottom-sheet'
import { useMenuMobile } from '@components/menu-mobile/use-menu-mobile.hook'

import styles from './filter-maps.module.scss'

export interface FilterMaps {
  contacts: ContactsEntity
  settings: CatalogSettingsEntity
  onOpenFilter: () => void
  userHasActiveDeals: boolean
}

export const FilterMaps: VFC<FilterMaps> = ({
  contacts,
  settings,
  onOpenFilter,
  userHasActiveDeals,
}) => {
  const isSmallScreen = useMediaSmallScreen()
  const menuMobileState = useMenuMobile()
  const browser = useBrowserDetector()
  const filterSmallScreenWrapperRef = useRef<HTMLDivElement>(null)
  const filterBigScreenWrapperRef = useRef<HTMLDivElement>(null)

  useBodyScrollLock(!menuMobileState.isOpenMenu, filterBigScreenWrapperRef)

  useEffect(() => {
    onOpenFilter()
  }, [menuMobileState.isOpenFilterMap, menuMobileState.isOpenMenu]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(
    () => () => {
      menuMobileState.closeFilterMap()
    },
    [], // eslint-disable-line react-hooks/exhaustive-deps
  )

  const closeFilter = () => {
    menuMobileState.closeFilterMap()
    trackEvent({
      category: 'Funnel Buy Map',
      name: 'Clicked Close in the object card',
      label: 'Close in the object card',
    })
  }

  return (
    <>
      {isSmallScreen ? (
        <BottomSheet isOpen={menuMobileState.isOpenFilterMap} onClose={closeFilter}>
          <BottomSheet.Container
            isOpen={menuMobileState.isOpenFilterMap}
            onClose={closeFilter}
            className={cn(styles.bottom_sheet_content, {
              [styles.bottom_sheet_content___iOS]:
                !menuMobileState.isOpenMenu && browser?.os === 'iOS',
            })}
            classNameWrapper={styles.bottom_sheet_wrapper}
          >
            <div className={styles.filter_wrapper} ref={filterSmallScreenWrapperRef}>
              <CatalogFilter
                contacts={contacts}
                settings={settings}
                closeFilter={closeFilter}
                pathname="/catalog-map"
                userHasActiveDeals={userHasActiveDeals}
                wrapperRef={filterSmallScreenWrapperRef}
              />
            </div>
          </BottomSheet.Container>
        </BottomSheet>
      ) : (
        <div
          className={cn(styles.filter, {
            [styles.filter___open]: menuMobileState.isOpenFilterMap,
          })}
        >
          <div className={styles.filter___close}>
            <SvgClose onClick={closeFilter} />
          </div>
          <div className={styles.filter_wrapper} ref={filterBigScreenWrapperRef}>
            <CatalogFilter
              contacts={contacts}
              settings={settings}
              closeFilter={() => null}
              pathname="/catalog-map"
              userHasActiveDeals={userHasActiveDeals}
              wrapperRef={filterBigScreenWrapperRef}
            />
          </div>
        </div>
      )}
    </>
  )
}
