import cn from 'classnames'
import { VFC } from 'react'

import { ApartmentAmoHistoryAmoHistory } from '@/api'

import styles from './apartment-history.module.scss'
import { setVisibleItem } from './helpers'

export const ExOwner: VFC<ApartmentAmoHistoryAmoHistory> = (amoHistory) => {
  const {
    hirLcQku: dateRegistration,
    _764685: primary,
    _764683: secondary,
    _5ueIEF5P: countOwners,
    jsit07Wz: typeOwnership,
    _764691: minors,
    tDz9B66r: ageOwners,
    _764687: loan,
    _764689: capital,
    _771347: isNotarized,
    v7HBbI69: dateOfDeathInheritor,
    vAPlbzfg: lineOfHeirs,
    bhkSH53F: countPersonsPrivatization,
    ygtTtzFX: countPersonsAgreedPrivatization,
    jtTOnZvX: countPersonsRefusedPrivatization,
    _1tW2TwPo: dateOfDeathDependents,
    aoc2d5Lp: ageDonor,
    _45rHJX7F: relationDegree,
    jVZ4UuLd: consentDonors,
    pUdSQBIg: dateCourtDecision,
    yjGKPguD: court,
    l8s9cBSr: dispute,
  } = amoHistory

  return (
    <div className={cn(styles.history_info, styles.history_owner)}>
      <h5 className={styles.history_title}>Предшествующий собственник</h5>
      <ul className={styles.history_list}>
        {dateRegistration != null && !setVisibleItem(primary, ['дду']) && (
          <li className={styles.history_item}>
            <span className={styles.history_name}>Дата регистрации права собственности</span>
            <span className={styles.history_text}>
              {dateRegistration.slice(0, dateRegistration.indexOf(' '))}
            </span>
          </li>
        )}
        {(secondary != null || primary != null) && (
          <li className={styles.history_item}>
            <span className={styles.history_name}>Основание права</span>
            <span className={styles.history_text}>{secondary || primary}</span>
          </li>
        )}
        {countOwners != null && (
          <li className={styles.history_item}>
            <span className={styles.history_name}>Количество собственников</span>
            <span className={styles.history_text}>{countOwners}</span>
          </li>
        )}
        {typeOwnership != null && (
          <li className={styles.history_item}>
            <span className={styles.history_name}>Вид права собственности</span>
            <span className={styles.history_text}>{typeOwnership}</span>
          </li>
        )}
        {minors != null && (
          <>
            <li className={styles.history_item}>
              <span className={styles.history_name}>Несовершеннолетние собственники</span>
              <span className={styles.history_text}>{minors}</span>
            </li>
            {minors.toLowerCase() === 'да' && (
              <li className={styles.history_item}>
                <span className={styles.history_name}>Согласие органов опеки получено?</span>
                <span className={styles.history_text}>{minors}</span>
              </li>
            )}
          </>
        )}
        {ageOwners != null && (
          <li className={styles.history_item}>
            <span className={styles.history_name}>Возраст собственников</span>
            <span className={styles.history_text}>{ageOwners.replace('.', ', ')}</span>
          </li>
        )}
        {(setVisibleItem(primary, ['дду', 'дупт']) ||
          setVisibleItem(secondary, ['дду', 'дупт', 'дкп', 'жск'])) && (
          <>
            <li className={styles.history_item}>
              <span className={styles.history_name}>Использовалась ипотека?</span>
              <span className={styles.history_text}>
                {loan?.toLowerCase() === 'ипотека активная' && 'Да'}
                {(loan?.toLowerCase() === 'ипотека погашенная' || loan == null) && 'Нет'}
              </span>
            </li>
            {loan?.toLowerCase() === 'ипотека активная' && (
              <li className={styles.history_item}>
                <span className={styles.history_name}>Ипотека погашена?</span>
                <span className={styles.history_text}>Да</span>
              </li>
            )}
          </>
        )}
        {capital != null &&
          (setVisibleItem(primary, ['дду', 'дупт']) ||
            setVisibleItem(secondary, ['дду', 'дкп', 'жск'])) && (
            <>
              <li className={styles.history_item}>
                <span className={styles.history_name}>Использовался мат. кап.?</span>
                <span className={styles.history_text}>{capital}</span>
              </li>
              {capital.toLowerCase() === 'да' && (
                <li className={styles.history_item}>
                  <span className={styles.history_name}>Доли детей были выделены?</span>
                  <span className={styles.history_text}>{capital}</span>
                </li>
              )}
            </>
          )}
        {isNotarized != null && (
          <li className={styles.history_item}>
            <span className={styles.history_name}>Сделка была нотариальная?</span>
            <span className={styles.history_text}>{isNotarized}</span>
          </li>
        )}
        {dateOfDeathInheritor != null && setVisibleItem(secondary, ['наследство']) && (
          <li className={styles.history_item}>
            <span className={styles.history_name}>Дата смерти наследодателя</span>
            <span className={styles.history_text}>
              {dateOfDeathInheritor.slice(0, dateOfDeathInheritor.indexOf(' '))}
            </span>
          </li>
        )}
        {lineOfHeirs != null && setVisibleItem(secondary, ['наследство']) && (
          <li className={styles.history_item}>
            <span className={styles.history_name}>
              Очередь наследников, к которой относился собственник
            </span>
            <span className={styles.history_text}>{lineOfHeirs}</span>
          </li>
        )}
        {countPersonsPrivatization != null && setVisibleItem(secondary, ['приватизация']) && (
          <li className={styles.history_item}>
            <span className={styles.history_name}>
              Количество лиц, имевших право на приватизацию
            </span>
            <span className={styles.history_text}>{countPersonsPrivatization}</span>
          </li>
        )}
        {countPersonsAgreedPrivatization != null && setVisibleItem(secondary, ['приватизация']) && (
          <li className={styles.history_item}>
            <span className={styles.history_name}>
              Количество лиц, согласившихся на приватизацию
            </span>
            <span className={styles.history_text}>{countPersonsAgreedPrivatization}</span>
          </li>
        )}
        {countPersonsRefusedPrivatization != null && setVisibleItem(secondary, ['приватизация']) && (
          <li className={styles.history_item}>
            <span className={styles.history_name}>
              Количество лиц, отказавшихся от приватизации
            </span>
            <span className={styles.history_text}>{countPersonsRefusedPrivatization}</span>
          </li>
        )}
        {dateOfDeathDependents != null && setVisibleItem(secondary, ['рента']) && (
          <li className={styles.history_item}>
            <span className={styles.history_name}>Дата смерти иждивенца</span>
            <span className={styles.history_text}>
              {dateOfDeathDependents.slice(0, dateOfDeathDependents.indexOf(' '))}
            </span>
          </li>
        )}
        {ageDonor != null && setVisibleItem(secondary, ['дарение']) && (
          <li className={styles.history_item}>
            <span className={styles.history_name}>Возраст дарителя</span>
            <span className={styles.history_text}>{ageDonor}</span>
          </li>
        )}
        {relationDegree != null && setVisibleItem(secondary, ['дарение']) && (
          <li className={styles.history_item}>
            <span className={styles.history_name}>Степень родства дарителя и одаряемого </span>
            <span className={styles.history_text}>{relationDegree}</span>
          </li>
        )}
        {consentDonors != null && setVisibleItem(secondary, ['дарение']) && (
          <li className={styles.history_item}>
            <span className={styles.history_name}>Согласие дарителя на продажу</span>
            <span className={styles.history_text}>{consentDonors}</span>
          </li>
        )}
        {dateCourtDecision != null && setVisibleItem(secondary, ['решение']) && (
          <li className={styles.history_item}>
            <span className={styles.history_name}>
              Дата вступления в законную силу решения суда
            </span>
            <span className={styles.history_text}>
              {dateCourtDecision.slice(0, dateCourtDecision.indexOf(' '))}
            </span>
          </li>
        )}
        {court != null && setVisibleItem(secondary, ['решение']) && (
          <li className={styles.history_item}>
            <span className={styles.history_name}>Суд, вынесший решение</span>
            <span className={styles.history_text}>{court}</span>
          </li>
        )}
        {dispute != null && setVisibleItem(secondary, ['решение']) && (
          <li className={styles.history_item}>
            <span className={styles.history_name}>Характер спора</span>
            <span className={styles.history_text}>{dispute}</span>
          </li>
        )}
      </ul>
    </div>
  )
}
