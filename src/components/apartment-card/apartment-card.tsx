import cn from 'classnames'
import { VFC } from 'react'

import { ApartmentImages, ApartmentWithAmoHistoryStatusLabelEnum } from '@/api'
import { ApartmentSnippet } from '@/components/apartment-snippet/apartment-snippet'
import { LOCKED_APARTMENT_AMO_ID } from '@/config'
import { getInitialPhone } from '@/lib/phone'
import { trackEvent } from '@/lib/tracking'
import { ApartmentEntity, SimilarApartmentsEntity } from '@/modules/apartment'
import { ContactsEntity } from '@/modules/contacts'
import { WidgetEntity } from '@/modules/widgets'
import { Container } from '@/uikit'
import { BannerApartment } from '@/widgets/banner-apartment/banner-apartment'
import { Calculator } from '@/widgets/calculator/calculator'
import { LegalPurity } from '@/widgets/legal-purity/legal-purity'

import styles from './apartment-card.module.scss'
import { ApartmentArea } from './components/apartment-area'
import { ApartmentFeedback } from './components/apartment-feedback'
import { ApartmentHistory } from './components/apartment-history'
import { ApartmentInfo } from './components/apartment-info'
import { ApartmentOptions } from './components/apartment-options'
import { ApartmentGallery } from './components/apatrment-gallery'

export interface ApartmentCardProps {
  contacts: ContactsEntity
  apartment: ApartmentEntity
  calculator?: WidgetEntity
  legalPurity?: WidgetEntity
  banner?: WidgetEntity
  bannerModal?: WidgetEntity
  bannerApartmentSnippet?: WidgetEntity
  apartmentsSimilar: SimilarApartmentsEntity
  userHasActiveDeals: boolean
}

export const ApartmentCard: VFC<ApartmentCardProps> = ({
  contacts,
  apartment,
  calculator,
  legalPurity,
  banner,
  bannerModal,
  bannerApartmentSnippet,
  apartmentsSimilar,
  userHasActiveDeals,
}) => {
  const isSmallerFivePhoto = apartment.images.length < 5

  const { images } = apartment
  const mainPhoto = images.filter((image) => image.isMain)
  const plan = images.filter((image) => image.isPlan)
  const viewFromWindow = images.filter((image) => image.imageGroup?.slug === 'view_from_window')
  const sortImages = [...mainPhoto, ...plan, ...viewFromWindow, ...images].reduce(
    (acc, photo) => {
      acc.some((el) => el.uuid === photo.uuid) ? acc : acc.push(photo)
      return acc
    },
    [] as ApartmentImages[],
  )

  const indexPlan = sortImages.findIndex((image) => image.isPlan)
  const contactPhoneNumber = getInitialPhone(contacts)?.number

  const isShowBlock = apartment.amoId !== LOCKED_APARTMENT_AMO_ID

  return (
    <>
      <Container containerType="apartment">
        <div
          className={cn(styles.apartment, {
            [styles.apartment___few_photo]: isSmallerFivePhoto,
          })}
        >
          <div className={styles.gallery}>
            <ApartmentGallery
              images={sortImages}
              amoId={apartment.amoId}
              housingComplex={apartment.housingComplex}
              isSmallerFivePhoto={isSmallerFivePhoto}
            />
          </div>
          <div className={styles.area}>
            <ApartmentArea {...apartment} />
          </div>
          <div className={styles.options}>
            <ApartmentOptions isShowBlock={isShowBlock} apartment={apartment} />
          </div>
          {isShowBlock && banner && (
            <div className={styles.banner_mobile}>
              <BannerApartment
                fields={banner?.fields}
                onAnalyticEvent={() => {
                  trackEvent({
                    category: 'Funnel Apartments',
                    name: 'Clicked Rate an Apartment',
                    label: 'Rate an Apartment',
                  })
                }}
              />
            </div>
          )}
          {legalPurity && (
            <div className={styles.legal_purity}>
              <LegalPurity
                fields={legalPurity.fields}
                linkOn={apartment.housingType?.slug === 'newbuilding' ? 'primary' : 'secondary'}
                isHaveNewText={!isShowBlock}
              />
            </div>
          )}
          <div className={styles.info}>
            <ApartmentInfo {...apartment} indexPlan={indexPlan} />
          </div>
          {isShowBlock &&
            apartment.statusLabel !== ApartmentWithAmoHistoryStatusLabelEnum.Unlisted && (
              <div className={styles.calculator}>
                <Calculator
                  fields={calculator?.fields ?? {}}
                  price={apartment.priceRub}
                  apartmentId={apartment.amoId}
                  discountRate={apartment.discountRate}
                  userHasActiveDeals={userHasActiveDeals}
                />
              </div>
            )}
          {apartment.amoHistory != null && Object.keys(apartment.amoHistory).length > 0 && (
            <div className={styles.history}>
              <ApartmentHistory
                amoHistory={apartment.amoHistory}
                housingType={apartment.housingType}
                isShowBlock={isShowBlock}
              />
            </div>
          )}
          <div className={styles.feedback}>
            <ApartmentFeedback
              contacts={contacts}
              amoId={apartment.amoId}
              statusLabel={apartment.statusLabel}
              bannerModal={bannerModal?.fields}
              apartment={apartment}
              isShowBlock={isShowBlock}
            />
            {isShowBlock && banner && (
              <div className={styles.banner_desktop}>
                <BannerApartment
                  fields={banner?.fields}
                  onAnalyticEvent={() => {
                    trackEvent({
                      category: 'Funnel Apartments',
                      name: 'Clicked Rate an Apartment',
                      label: 'Rate an Apartment',
                    })
                  }}
                />
              </div>
            )}
          </div>
          {!!apartmentsSimilar?.apartments?.length && (
            <div className={styles.similar_apartments}>
              <div className={styles.similar_apartments_title}>Похожие квартиры</div>
              {apartmentsSimilar.apartments.map((apartment) => (
                <div key={apartment.amoId} className={styles.similar_apartments_item}>
                  <ApartmentSnippet
                    apartment={apartment}
                    contactPhoneNumber={contactPhoneNumber}
                    bannerApartmentSnippet={bannerApartmentSnippet?.fields}
                    bannerModal={bannerModal?.fields}
                    placement="similar"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
      <div className={styles.bottom_panel}>
        <ApartmentFeedback
          contacts={contacts}
          amoId={apartment.amoId}
          statusLabel={apartment.statusLabel}
          bannerModal={bannerModal?.fields}
          apartment={apartment}
          isShowBlock={isShowBlock}
        />
      </div>
    </>
  )
}
