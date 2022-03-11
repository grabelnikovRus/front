import { VFC } from 'react'

import { useMediaSmallScreen } from '@/lib/use-media'
import { isTextField, WidgetFields } from '@/modules/widgets'
import { Button, SvgPen, FormattingNumbers } from '@/uikit'

import styles from './info-output.module.scss'

import { checklistSettings } from '../checklist-settings'
import { AptData } from '../sell-request-form.types'

export interface InfoOutputProps {
  fields: WidgetFields
  aptData: AptData
  onBack: () => void
  onNext: () => void
  settings: typeof checklistSettings
}

export const InfoOutput: VFC<InfoOutputProps> = ({
  fields,
  aptData,
  onBack,
  onNext,
  settings,
}) => {
  const isSmallScreen = useMediaSmallScreen()

  const { titleSecondStage, textBackBtnSecondStage, textNextBtnSecondStage } = fields
  const title = isTextField(titleSecondStage) ? titleSecondStage.value : ''
  const textBackBtn = isTextField(textBackBtnSecondStage) ? textBackBtnSecondStage.value : ''
  const textNextBtn = isTextField(textNextBtnSecondStage) ? textNextBtnSecondStage.value : ''

  return (
    <section className={styles.info}>
      <h1 className={styles.info_title} dangerouslySetInnerHTML={{ __html: title }} />
      <span className={styles.info_type}>
        {Number(aptData.roomType) === 0 ? `Студия` : `${aptData.roomType}-комн. квартира`},{' '}
        {aptData.area}&nbsp;м²
      </span>
      <span className={styles.info_address}>{aptData.address}</span>
      <div className={styles.info_list}>
        <div className={styles.info_item}>
          <span className={styles.info_name}>Тип объекта</span>
          <span className={styles.info_value}>
            {Array.isArray(aptData.objectType) && aptData.objectType[0] === 'flat'
              ? 'Квартира'
              : 'Апартаменты'}
          </span>
        </div>
        <div className={styles.info_item}>
          <span className={styles.info_name}>Комнат</span>
          <span className={styles.info_value}>
            {Number(aptData.roomType) === 0 ? `Студия` : `${aptData.roomType}-комн.`}
          </span>
        </div>
        <div className={styles.info_item}>
          <span className={styles.info_name}>Площадь, м²</span>
          <span className={styles.info_value}>{aptData.area}</span>
        </div>
        <div className={styles.info_item}>
          <span className={styles.info_name}>Этаж</span>
          <span className={styles.info_value}>{aptData.floor}</span>
        </div>
        <div className={styles.info_item}>
          <span className={styles.info_name}>Дом сдан?</span>
          <span className={styles.info_value}>
            {aptData.isInOperation?.[0] === 'true' ? 'Да' : 'Нет'}
          </span>
        </div>
        {aptData.isInOperation[0] === 'true' && aptData.isOwnership && (
          <div className={styles.info_item}>
            <span className={styles.info_name}>Право собственности получено?</span>
            <span className={styles.info_value}>
              {Array.isArray(aptData?.isOwnership) &&
                settings.isOwnership.options.find(
                  (option) => option.value === aptData.isOwnership?.[0],
                )?.caption}
            </span>
          </div>
        )}
        {aptData.isInOperation[0] === 'true' &&
          aptData.isOwnership?.[0] === 'false' &&
          aptData.isTransferAcceptanceCertificate && (
            <div className={styles.info_item}>
              <span className={styles.info_name}>Акт приема-передачи подписан?</span>
              <span className={styles.info_value}>
                {Array.isArray(aptData?.isTransferAcceptanceCertificate) &&
                  settings.isTransferAcceptanceCertificate.options.find(
                    (option) => option.value === aptData.isTransferAcceptanceCertificate?.[0],
                  )?.caption}
              </span>
            </div>
          )}
        {aptData.isInOperation[0] === 'false' && aptData.developer && (
          <div className={styles.info_item}>
            <span className={styles.info_name}>Застройщик</span>
            <span className={styles.info_value}>
              {Array.isArray(aptData?.developer) &&
                settings.developer.options.find(
                  (option) => option.value === aptData.developer?.[0],
                )?.caption}
            </span>
          </div>
        )}
        {aptData.isInOperation[0] === 'false' && aptData.releaseYear && (
          <div className={styles.info_item}>
            <span className={styles.info_name}>Год сдачи</span>
            <span className={styles.info_value}>{`${aptData.releaseYear}г.`}</span>
          </div>
        )}
        {aptData.isInOperation[0] === 'false' && aptData.releaseQuarter && (
          <div className={styles.info_item}>
            <span className={styles.info_name}>Квартал сдачи</span>
            <span className={styles.info_value}>{aptData.releaseQuarter}</span>
          </div>
        )}
        {aptData.isInOperation[0] === 'true' && aptData.renovationType && (
          <div className={styles.info_item}>
            <span className={styles.info_name}>Наличие ремонта</span>
            <span className={styles.info_value}>
              {
                settings.renovationType.options.find(
                  (option) => option.value === aptData.renovationType[0],
                )?.caption
              }
            </span>
          </div>
        )}
        {aptData.isInOperation[0] === 'true' &&
          (aptData.renovationType?.[0] === 'fresh' ||
            aptData.renovationType?.[0] === 'cosmetic') &&
          aptData.renovationYear && (
            <div className={styles.info_item}>
              <span className={styles.info_name}>Год последнего ремонта</span>
              <span className={styles.info_value}>{`${aptData.renovationYear}г.`}</span>
            </div>
          )}
        <div className={styles.info_item}>
          <span className={styles.info_name}>Желаемая стоимость, ₽</span>
          <span className={styles.info_value}>
            <FormattingNumbers value={'' + (aptData.price ?? '')} mode="money" />
          </span>
        </div>
        <div className={styles.info_item}>
          <span className={styles.info_name}>Ипотека</span>
          <span className={styles.info_value}>
            {Array.isArray(aptData.isMortgage) && aptData.isMortgage[0] === 'true' ? 'Да' : 'Нет'}
          </span>
        </div>
      </div>
      {aptData.isInOperation[0] === 'true' &&
        Array.isArray(aptData.peculiarities) &&
        aptData.peculiarities.length > 0 && (
          <div className={styles.features}>
            <h6 className={styles.features_title}>Особенности</h6>
            <ul className={styles.features_list}>
              {aptData.peculiarities.map((el: string) => (
                <li key={el} className={styles.features_feature}>
                  {settings.peculiarities.options.find((option) => option.value === el)?.caption}
                </li>
              ))}
            </ul>
          </div>
        )}
      <div className={styles.buttons}>
        <Button externalStyles={styles.buttons_back} onClick={onBack}>
          {isSmallScreen ? (
            'Назад'
          ) : (
            <>
              <SvgPen />
              {textBackBtn}
            </>
          )}
        </Button>
        <Button externalStyles={styles.buttons_next} onClick={onNext}>
          {textNextBtn}
        </Button>
      </div>
    </section>
  )
}
