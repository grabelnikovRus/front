import { useRef, VFC } from 'react'

import { ApartmentsEntity } from '@/modules/apartments-v1'
import { ContactsEntity } from '@/modules/contacts'
import { CatalogSettingsEntity } from '@/modules/settings-v1'
import { ProfileEntity } from '@/modules/userpanel'
import { isTextField, WidgetFields } from '@/modules/widgets'
import { BottomSheet } from '@/uikit/bottom-sheet/bottom-sheet'
import { CatalogFilter } from '@components/catalog-filter/catalog-filter'
import styles from '@components/menu-mobile/menu-mobile.module.scss'
import { useMenuMobile } from '@components/menu-mobile/use-menu-mobile.hook'

import { ApartmentFilterSimple } from './components/apartment-filter-simple'
import classes from './search-catalog.module.scss'

export interface SearchCatalogProps {
  apartments: ApartmentsEntity | null
  contacts: ContactsEntity
  settings: CatalogSettingsEntity | null
  fields: WidgetFields
  profile?: ProfileEntity
}

export const SearchCatalog: VFC<SearchCatalogProps> = ({
  apartments,
  contacts,
  settings,
  fields,
  profile,
}) => {
  const userHasActiveDeals = Boolean(profile?.countActiveDeals)
  const menuMobileState = useMenuMobile()
  const filterWrapperRef = useRef<HTMLDivElement>(null)

  if (apartments === null || settings === null) {
    return null
  }
  const { header } = fields

  return (
    <section className={classes.search_catalog__container}>
      {isTextField(header) && <h1 className={classes.search_catalog__header}>{header.value}</h1>}
      <ApartmentFilterSimple
        apartments={apartments}
        contacts={contacts}
        settings={settings}
        userHasActiveDeals={userHasActiveDeals}
      />

      <BottomSheet
        isOpen={menuMobileState.isOpenFilterCatalog}
        onClose={menuMobileState.closeFilterCatalog}
      >
        <BottomSheet.Container
          isOpen={menuMobileState.isOpenFilterCatalog}
          onClose={menuMobileState.closeFilterCatalog}
          className={styles.bottom_sheet_content}
          classNameWrapper={styles.bottom_sheet_wrapper}
        >
          <div ref={filterWrapperRef} className={styles.filter_wrapper}>
            <CatalogFilter
              contacts={contacts}
              settings={settings}
              closeFilter={menuMobileState.closeFilterCatalog}
              pathname="/catalog"
              showMapBtn
              userHasActiveDeals={userHasActiveDeals}
              wrapperRef={filterWrapperRef}
            />
          </div>
        </BottomSheet.Container>
      </BottomSheet>
    </section>
  )
}
