import cn from 'classnames'
import { VFC } from 'react'

import { ApartmentWithAmoHistoryStatusLabelEnum } from '@/api'
import { SignUpViewing } from '@/components/sign-up-viewing/sign-up-viewing'
import { getInitialPhone } from '@/lib/phone'
import { trackEvent } from '@/lib/tracking'
import { ApartmentEntity } from '@/modules/apartment'
import { ContactsEntity } from '@/modules/contacts'
import { WidgetFields } from '@/modules/widgets'
import { FormattingNumbers, Button } from '@/uikit'

import styles from './apartment-feedback.module.scss'
import { ApartmentOptions } from './apartment-options'

interface ApartmentFeedbackProps {
  amoId: number
  statusLabel: ApartmentWithAmoHistoryStatusLabelEnum | undefined
  contacts: ContactsEntity
  bannerModal?: WidgetFields
  apartment: ApartmentEntity
  isShowBlock?: boolean
}

export const ApartmentFeedback: VFC<ApartmentFeedbackProps> = ({
  amoId,
  contacts,
  bannerModal,
  apartment,
  statusLabel,
  isShowBlock = true,
}) => {
  const phone = getInitialPhone(contacts)?.number

  return (
    <div className={styles.apartment_feedback}>
      <div className={styles.apartment_feedback_info}>
        <ApartmentOptions apartment={apartment} isShowBlock={isShowBlock} />
      </div>
      {statusLabel !== ApartmentWithAmoHistoryStatusLabelEnum.Unlisted && (
        <div className={styles.buttons}>
          {phone !== undefined && (
            <Button
              externalStyles={cn(styles.buttons_button, styles.buttons_phone)}
              size="small"
              href={`tel:${phone}`}
              onClick={() => {
                trackEvent({
                  category: 'Funnel Apartments',
                  name: 'Clicked on the Phone',
                  label: 'Phone',
                })
              }}
            >
              <div className={styles.buttons_button___desc}>
                <FormattingNumbers mode="phone" value={phone} />
              </div>
              <div className={styles.buttons_button___mobile}>Позвонить</div>
            </Button>
          )}
          <SignUpViewing amoId={amoId} bannerModal={bannerModal} isBigSize />
        </div>
      )}
    </div>
  )
}
