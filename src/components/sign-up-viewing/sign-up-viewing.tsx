import cn from 'classnames'
import { VFC, useState } from 'react'

import { LeadApartment } from '@/components/lead-apartment/lead-apartment'
import { trackEvent, categoryForAnalytic } from '@/lib/tracking'
import { useMediaSmallScreen } from '@/lib/use-media'
import { WidgetFields } from '@/modules/widgets'
import { Button, ButtonIcon, Modal, SvgClose, SvgCheck, Logo } from '@/uikit'

import styles from './sign-up-viewing.module.scss'

export interface SignUpViewingProps {
  amoId: number
  bannerModal?: WidgetFields
  isBigSize?: boolean
  onAnalyticEvent?: () => void
  placement?: 'default' | 'map' | 'similar'
}

export const SignUpViewing: VFC<SignUpViewingProps> = ({
  amoId,
  bannerModal,
  isBigSize = false,
  placement = 'default',
}) => {
  const isSmallScreen = useMediaSmallScreen()
  const [isSendClaim, setIsSendClaim] = useState(false)
  const [leadApartmentStep, setLeadApartmentStep] = useState<'lead' | 'verify'>('lead')

  return (
    <Modal
      title="Записаться на просмотр"
      renderHeader={({ ref, closeModal }) => (
        <div className={styles.modal_header}>
          <div className={styles.modal_header_logo}>
            <Logo theme="light" />
          </div>
          <ButtonIcon
            mode={isSmallScreen ? 'transparent' : 'opaque'}
            onClick={() => {
              if (leadApartmentStep === 'lead') {
                trackEvent({
                  category: 'Funnel Viewing Flats',
                  name: 'Clicked Close in the Sign up for Viewing screen',
                  label: 'Close in the Sign up for Viewing screen',
                })
              } else if (leadApartmentStep === 'verify') {
                trackEvent({
                  category: 'Funnel Viewing Flats',
                  name: 'Clicked Close on the Enter Code screen',
                  label: 'Close on the Enter Code screen',
                })
              }
              closeModal()
            }}
            innerRef={ref}
          >
            <SvgClose />
          </ButtonIcon>
        </div>
      )}
      renderButton={({ openModal }) => (
        <Button
          externalStyles={cn(styles.button, {
            [styles.button___big]: isBigSize,
          })}
          label="Записаться"
          size="small"
          onClick={() => {
            openModal()

            const category = categoryForAnalytic(location.pathname, 'Funnel ')
            const label = `Sign up${placement === 'similar' ? ' in similar apartments' : ''}`
            const name = `Clicked on Sign up${
              placement === 'similar' ? ' in similar apartments' : ''
            }`

            trackEvent({
              category,
              name,
              label,
            })
          }}
          disabled={isSendClaim}
        >
          {isSendClaim ? (
            <div className={styles.button___send}>
              {isBigSize && <SvgCheck />}
              Вы записаны
            </div>
          ) : (
            'Записаться'
          )}
        </Button>
      )}
    >
      {({ closeModal }) => (
        <div className={styles.modal_body}>
          <LeadApartment
            amoId={amoId}
            bannerModal={bannerModal}
            onSuccess={() => {
              closeModal()
              setIsSendClaim(true)
            }}
            onStepChange={(step) => setLeadApartmentStep(step)}
          />
        </div>
      )}
    </Modal>
  )
}
