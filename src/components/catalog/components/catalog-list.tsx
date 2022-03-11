import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { useRouter } from 'next/router'
import { useState, VFC, useEffect } from 'react'

import { Promo } from '@/api'
import { ApartmentSnippet } from '@/components/apartment-snippet/apartment-snippet'
import constants from '@/legacy/config/constants.json'
import apartmentStyle from '@/legacy/styles/apartment.module.scss'
import { getInitialPhone } from '@/lib/phone'
import { encodeToDataUri, interpolate } from '@/lib/string'
import {
  ApartmentsEntity,
  ApartmentsSort,
  getApartments,
  normalizeApartmentsSort,
  normalizeApartmentsFilter,
} from '@/modules/apartments-v1'
import { ContactsEntity } from '@/modules/contacts'
import { WidgetFields } from '@/modules/widgets'
import { BannerCatalog } from '@/widgets/banner-catalog/banner-catalog'

interface CatalogListProps {
  initialApartments: ApartmentsEntity
  contacts: ContactsEntity
  sort: ApartmentsSort
  banner?: WidgetFields
  bannerApartmentSnippet?: WidgetFields
  bannerModal?: WidgetFields
  userHasActiveDeals: boolean
}

export const CatalogList: VFC<CatalogListProps> = ({
  contacts,
  initialApartments,
  banner,
  bannerApartmentSnippet,
  bannerModal,
  userHasActiveDeals,
}) => {
  const [apartments, setApartments] = useState<ApartmentsEntity['apartments']>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [countPages, setCountPages] = useState(1)
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false)
  const router = useRouter()

  const contactPhoneNumber = getInitialPhone(contacts)?.number

  useEffect(() => {
    setApartments(initialApartments.apartments)
    setCountPages(initialApartments.countPages)
    setCurrentPage(1)
  }, [initialApartments])

  const fetchNextPage = async (currentPage: number) => {
    setIsFetchingNextPage(true)
    const result = await getApartments(
      normalizeApartmentsFilter(router.query),
      userHasActiveDeals ? Promo.ExMax : Promo.Default,
      normalizeApartmentsSort(router.query),
      currentPage,
    )
    setIsFetchingNextPage(false)
    return result.apartments
  }

  useScrollPosition(({ currPos, prevPos }) => {
    const footerHeightDesktop =
      (document.querySelector('footer') as HTMLInputElement).clientHeight || 650

    if (currentPage < countPages) {
      if (
        !isFetchingNextPage &&
        prevPos.y > currPos.y &&
        document.body.scrollHeight - window.innerHeight - footerHeightDesktop + currPos.y < 0
      ) {
        setCurrentPage((page) => page + 1)
        fetchNextPage(currentPage + 1).then((nextApartments) => {
          setApartments((prevState) => [...prevState, ...nextApartments])
        })
      }
    }
  })

  return (
    <section className={apartmentStyle.apartmentList}>
      {apartments.slice(0, 2).map((apartment) => (
        <ApartmentSnippet
          key={apartment.amoId}
          apartment={apartment}
          contactPhoneNumber={contactPhoneNumber}
          bannerApartmentSnippet={bannerApartmentSnippet}
          bannerModal={bannerModal}
        />
      ))}
      {banner && <BannerCatalog fields={banner} />}
      {apartments.slice(2).map((apartment) => (
        <ApartmentSnippet
          key={apartment.amoId}
          apartment={apartment}
          contactPhoneNumber={contactPhoneNumber}
          bannerApartmentSnippet={bannerApartmentSnippet}
          bannerModal={bannerModal}
        />
      ))}
      {isFetchingNextPage && (
        <div
          className={`${apartmentStyle.preloader__block} ${apartmentStyle.preloader__block_bottom}`}
        >
          <img
            alt="preloader"
            src={encodeToDataUri(interpolate(constants.SITE.PRELOADER, { color: '#b8bac1' }))}
          />
        </div>
      )}
      <p className={apartmentStyle.disclaimer}>
        «ПАО “ВТБ” – Генеральная лицензия на осуществление банковских операций № 1000, выдана
        Центральным Банком РФ 08.07.2015{' '}
      </p>
      <p className={apartmentStyle.disclaimer}>
        АО “Альфа-Банк” – Генеральная лицензия на осуществление банковских операций № 1326, выдана
        Центральным Банком РФ 16.01.2015»
      </p>
    </section>
  )
}
