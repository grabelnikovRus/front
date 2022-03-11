import cn from 'classnames'
import Cookies from 'js-cookie'
import { useEffect, useState, VFC } from 'react'
import { useLocalStorage } from 'react-use'

import { IAddressFormData, SuggestAddress, ILocalStoredData } from '@/components'
import { useLayoutSellRequest } from '@/components/layout/use-layout-sell-request.hook'
import { config, PAGE, STORAGE_KEY } from '@/config'
import { trackEvent, categoryForAnalytic } from '@/lib/tracking'
import { checkCoords } from '@/modules/coords'
import { isStackField, isTextField, WidgetFields } from '@/modules/widgets'
import { pageSlug } from '@/types/page-slug'
import { Button } from '@/uikit'

import styles from './entry-form.module.scss'

export interface EntryFormProps {
  fields: WidgetFields
  pageSlug: pageSlug
  legalWidgetPresent?: boolean
  isExchangeMax?: boolean
}

export const EntryForm: VFC<EntryFormProps> = ({
  fields,
  legalWidgetPresent,
  pageSlug,
  isExchangeMax,
}) => {
  const [localStorageValue] = useLocalStorage<ILocalStoredData>(STORAGE_KEY)
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [addressData, setAddressData] = useState<IAddressFormData>({ address: '' })
  const [isDisabledEntryForm, setIsDisabledEntryForm] = useState(false)

  const { setAddress, openSellRequest } = useLayoutSellRequest()

  const { address_placeholder, title, subtitle, description, textBtn, features } = fields
  const placeholder = isTextField(address_placeholder) ? address_placeholder.value : ''
  const titleForm = isTextField(title) ? title.value : ''
  const subtitleForm = isTextField(subtitle) ? subtitle.value : ''
  const descriptionForm = isTextField(description) ? description.value : ''
  const labelBtn = isTextField(textBtn) ? textBtn.value : ''
  const list = isStackField(features) ? features.stack : []

  const handleAddressSelect = async (data: IAddressFormData) => {
    setAddressData(data)

    if (data.address === '') {
      setIsDisabledEntryForm(false)
      trackEvent({
        category: categoryForAnalytic(location.pathname),
        label: 'Аddress in the Search bar',
        name: 'Removed the Address in the search bar',
      })
    } else {
      trackEvent({
        category: categoryForAnalytic(location.pathname),
        label: 'Аddress in the Search bar',
        name: 'Entered the Аddress in the Search bar',
      })
    }

    try {
      if (!data.lon || !data.lat) {
        return
      }

      const { body } = await checkCoords({
        longitude: data?.lon,
        latitude: data?.lat,
      })
      const { typeOfZone } = body

      if (typeOfZone === 'notBuyoutZone') {
        setIsDisabledEntryForm(true)
        return
      }
    } catch (err) {
      setIsDisabledEntryForm(false)
    }

    setAddress(data)

    if (data.address !== '') {
      openSellRequest()
    }
  }

  const getPageSlug = () => {
    if (legalWidgetPresent) return PAGE.SLUG_LEGAL
    return pageSlug
  }

  const redirectToLk = () => {
    location.assign(`${config.userpanelUrl}/?slug=${getPageSlug()}`)
  }

  useEffect(() => {
    setUserLoggedIn(Boolean(Cookies.get('token')))
  }, [])

  useEffect(() => {
    if (localStorageValue?.address) {
      setAddressData(localStorageValue.address)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const inputOrButton = userLoggedIn ? (
    <div className={styles.form_btn}>
      <Button label={labelBtn} onClick={redirectToLk} />
    </div>
  ) : (
    <div className={styles.form_input}>
      <SuggestAddress
        addressData={addressData}
        placeholder={placeholder}
        onSelect={handleAddressSelect}
      />
      {isDisabledEntryForm && (
        <div className={styles.form_error}>
          К сожалению, мы не выкупаем квартиры по данному адресу. Объект находится вне зоны оценки
        </div>
      )}
    </div>
  )

  return (
    <section className={cn(styles.form, { [styles.form___exchange_max]: isExchangeMax })}>
      <div className={styles.form_wrapper}>
        {titleForm && (
          <h1 className={styles.form_title} dangerouslySetInnerHTML={{ __html: titleForm }} />
        )}
        {subtitleForm && (
          <h5
            className={styles.form_subtitle}
            dangerouslySetInnerHTML={{ __html: subtitleForm }}
          />
        )}
        {descriptionForm && (
          <h6
            className={styles.form_description}
            dangerouslySetInnerHTML={{ __html: descriptionForm }}
          />
        )}
        {!isExchangeMax && inputOrButton}
      </div>
      {isExchangeMax && (
        <div className={styles.form_container}>
          <h6
            className={styles.form_list_description}
            dangerouslySetInnerHTML={{ __html: descriptionForm }}
          />
          <ul className={styles.form_list}>
            {list.map((el, index) => {
              const title = isTextField(el.title) ? el.title.value : null
              return (
                <li key={title || index} className={styles.form_item}>
                  <span className={styles.form_number}>{index + 1}</span>
                  <span className={styles.form_text}>{title}</span>
                </li>
              )
            })}
          </ul>
          {inputOrButton}
        </div>
      )}
    </section>
  )
}
