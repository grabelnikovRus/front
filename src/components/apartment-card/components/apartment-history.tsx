import cn from 'classnames'
import Link from 'next/link'
import { VFC, useEffect } from 'react'
import { useToggle, useFirstMountState } from 'react-use'

import { ApartmentAmoHistoryAmoHistory, ApartmentReference } from '@/api'
import { listOfDocuments } from '@/config'
import { addParagraphs } from '@/lib/string'
import { trackEvent } from '@/lib/tracking'
import { useMediaSmallScreen } from '@/lib/use-media'
import { DottedRow, SvgShieldGradient, SvgPdf, SvgDoc } from '@/uikit'

import styles from './apartment-history.module.scss'
import { ExOwner } from './ex-owner'
import { getNameDocument } from './get-name-document'
import { getDocuments } from './helpers'
import { PopupHistory } from './popup-history'

export interface ApartmentHistoryProps {
  amoHistory: ApartmentAmoHistoryAmoHistory | null
  housingType: ApartmentReference | null
  isShowBlock?: boolean
}

export const ApartmentHistory: VFC<ApartmentHistoryProps> = ({
  amoHistory,
  housingType,
  isShowBlock = true,
}) => {
  const [isOpen, toggleIsOpen] = useToggle(false)
  const isFirstMount = useFirstMountState()

  const isSmallScreen = useMediaSmallScreen()

  const isNewApartment = housingType?.slug === 'newbuilding'
  const {
    _764685: primary,
    _764683: secondary,
    _673559: dateRegistrationOwnership,
    _684643: ownership,
    _780121: datepRegistrationPledge,
    _780231: datepWithdrawalPledge,
    dduLink,
    duptPbLink,
    avzPbLink,
    ppLink,
    escrowLink,
    ppOdsLink,
    creditLink,
    egrnLink,
    titleDocumentLink,
    egrnPbLink,
    dkpPbLink,
    appPbLink,
    vdkLink,
    agreementLink,
  } = amoHistory as ApartmentAmoHistoryAmoHistory

  const list = [
    dduLink,
    duptPbLink,
    avzPbLink,
    ppLink,
    escrowLink,
    ppOdsLink,
    creditLink,
    egrnLink,
    titleDocumentLink,
    egrnPbLink,
    dkpPbLink,
    appPbLink,
    vdkLink,
    agreementLink,
  ]

  let encumbrances = 'Нет'
  if (datepRegistrationPledge != null && datepWithdrawalPledge == null) {
    encumbrances = listOfDocuments.ENCUMBRANCES
  }

  const isVisibleDocuments = list.some((document) => document != null)
  const isVisibleExOwner = [primary, secondary].some((field) => field != null)

  useEffect(() => {
    if (isFirstMount) return

    trackEvent({
      category: 'Funnel Apartments',
      name: isOpen ? 'Clicked History View Full' : 'Clicked Collapse Apartment History',
      label: isOpen ? 'History View Full' : 'Collapse Apartment History',
    })
  }, [isOpen, isFirstMount])

  if (amoHistory === null) return null

  return (
    <PopupHistory isMobileScreen={isSmallScreen} isOpen={isOpen} onClose={toggleIsOpen}>
      <div
        className={cn(styles.history_info, {
          [styles.history_info___popup_open]: isSmallScreen && isOpen,
        })}
      >
        <h5 className={styles.history_title}>
          {!isSmallScreen || isOpen
            ? 'История этой квартиры в настоящий момент'
            : 'Подробная история квартиры'}
        </h5>
        <ul className={styles.history_list}>
          {isShowBlock && (
            <li className={styles.history_item}>
              <span className={styles.history_name}>Собственник</span>
              <span className={styles.history_text}>ООО &quot;ПИК-Брокер&quot;</span>
            </li>
          )}
          {dateRegistrationOwnership != null && (
            <li className={styles.history_item}>
              <span className={styles.history_name}>Дата регистрации права собственности</span>
              <span className={styles.history_text}>
                {dateRegistrationOwnership.slice(0, dateRegistrationOwnership.indexOf(' '))}
              </span>
            </li>
          )}
          {ownership != null && (
            <li className={styles.history_item}>
              <span className={styles.history_name}>Документ-основание права собственности</span>
              <span className={styles.history_text}>{ownership}</span>
            </li>
          )}
          <li className={styles.history_item}>
            <span className={styles.history_name}>Зарегистрированные лица</span>
            <span className={styles.history_text}>Отсутствуют</span>
          </li>
          <li className={cn(styles.history_item, styles.history_item___encumbrance)}>
            <span className={styles.history_name}>Наличие обременений</span>
            <span className={styles.history_text}>{encumbrances}</span>
          </li>
        </ul>
      </div>
      {isVisibleDocuments && (
        <div className={styles.document}>
          <h5 className={styles.document_title}>Документы</h5>
          <ul className={styles.document_list}>
            {list.map((link) => {
              if (link == null) return null
              return (
                <a
                  key={link}
                  href={link}
                  className={styles.document_item}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className={styles.document_text}>
                    {getNameDocument(link, amoHistory)}
                  </span>
                  <span className={styles.document_icon}>
                    {link.slice(-4) === '.pdf' ? <SvgPdf /> : <SvgDoc />}
                  </span>
                </a>
              )
            })}
          </ul>
        </div>
      )}
      {isSmallScreen && <div className={styles.rounding_block} />}
      {isVisibleExOwner && (
        <>
          <ExOwner {...amoHistory} />
          <div className={styles.enumeration}>
            <h5 className={styles.enumeration_title}>
              Мы запросили и тщательно проверили следующие документы
            </h5>
            <ul className={styles.enumeration_list}>
              {getDocuments(amoHistory).map((item) => (
                <li key={item} className={styles.enumeration_item}>
                  <DottedRow className={styles.enumeration_dot} />
                  <span className={styles.enumeration_text}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      {amoHistory.legalOpinion != null && (
        <>
          {isSmallScreen && <div className={styles.rounding_block} />}
          <div className={styles.opinion}>
            <h5 className={styles.opinion_title}>Общее юридическое заключение</h5>
            <div
              className={styles.opinion_items}
              dangerouslySetInnerHTML={{ __html: addParagraphs(amoHistory.legalOpinion) }}
            />
          </div>
        </>
      )}
      {isSmallScreen && <div className={styles.rounding_block} />}
      <div className={styles.guarantee}>
        <div className={styles.guarantee_icon}>
          <SvgShieldGradient />
        </div>
        <div className={styles.guarantee_text}>Гарантируем - покупка будет безопасной</div>
        <Link href={isNewApartment ? '/guarantee-primary' : '/guarantee-secondary'}>
          <a
            target="_blank"
            rel="noreferrer"
            className={styles.guarantee_link}
            onClick={() => {
              trackEvent({
                category: 'Funnel Apartments',
                name: 'Clicked on the Certificate',
                label: 'Certificate',
              })
            }}
          >
            {isSmallScreen ? 'Смотреть сертификат' : 'Сертификат'}
          </a>
        </Link>
      </div>
    </PopupHistory>
  )
}
