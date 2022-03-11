/* eslint-disable max-lines */
import { Transition } from '@headlessui/react'
import cn from 'classnames'
import { cityIn } from 'lvovich'
import { useRouter } from 'next/router'
import { VFC, useMemo, useState, useEffect, MouseEvent, useRef, RefObject } from 'react'
import { FormRenderProps, Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import { useDeepCompareEffect, useToggle } from 'react-use'

import { Promo } from '@/api'
import { ApartmentsFilters } from '@/api/models/ApartmentsFilters'
import { FORM, INPUT_FORMATS } from '@/config/constants'
import { pluralizeCardinal } from '@/lib/i18n'
import { parseMapQuery } from '@/lib/map/parse-map-query'
import { trackEvent } from '@/lib/tracking'
import { useDebounce } from '@/lib/use-debounce'
import { dropEmptyFields, getCountApartments } from '@/modules/apartments-v1'
import { ContactsEntity } from '@/modules/contacts'
import { CatalogSettingsEntity } from '@/modules/settings-v1'
import { Button, InputBoxRow, SvgTrashFilter, SvgArrow, Dropdown, SvgCompass } from '@/uikit'
import { CheckboxGroup } from '@/uikit/filter/checkbox-group/checkbox-group'
import { InputNumber } from '@/uikit/filter/input-number/input-number'
import searchCatalogStyles from '@/widgets/search-catalog/components/apartment-filter-simple.module.scss'
import { SuggestToponym } from '@components/suggest-toponym/suggest-toponym'

import { Balloon } from './balloon'
import styles from './catalog-filter-form.module.scss'

export type CatalogFilterFormValues = ApartmentsFilters

type CatalogFilterFormProps = FormRenderProps<CatalogFilterFormValues> & {
  settings: CatalogSettingsEntity
  contacts: ContactsEntity
  formCloseTrigger?: boolean
  showMapBtn?: boolean
  userHasActiveDeals: boolean
  wrapperRef: RefObject<HTMLDivElement>
}

const {
  APARTMENT_FILTER: { APARTMENT_PLURAL_FILTER },
} = FORM

export const CatalogFilterForm: VFC<CatalogFilterFormProps> = ({
  handleSubmit,
  submitting,
  errors,
  form,
  settings,
  submitErrors,
  contacts,
  values,
  formCloseTrigger = false,
  showMapBtn = false,
  userHasActiveDeals,
  wrapperRef,
}) => {
  const [cityId, setCityId] = useState('')
  const [isAllFilterOptionOpen, toggleFilterOptions] = useToggle(false)
  const [isVisibleBalloon, setIsVisibleBalloon] = useState(false)

  const formRef = useRef<HTMLFormElement | null>(null)
  const [filterCoordinatesY, setFilterCoordinatesY] = useState(0)
  const [clickCoordinatesY, setClickCoordinatesY] = useState(0)

  const router = useRouter()

  const [initialAddress] = useState(router.query.address ?? '')

  const [count, setCount] = useState(0)

  const debounceValues = useDebounce(values, 300)

  const setCoordinatesClick = ({ target }: MouseEvent<HTMLFormElement>) => {
    if (!(target instanceof HTMLInputElement)) return

    const middleOfElement =
      target.type === 'checkbox' && target.parentElement
        ? target.parentElement.clientHeight / 2
        : target.clientHeight / 2

    const CoordinatesY = target.getBoundingClientRect().y + window.scrollY + middleOfElement
    setClickCoordinatesY(CoordinatesY)
  }

  const onClickBalloon = (event: MouseEvent<HTMLButtonElement>) => {
    handleSubmit(event)
    setIsVisibleBalloon(false)
  }

  const onChangeForm = () => setIsVisibleBalloon(isAllFilterOptionOpen)

  const resetForm = () => {
    const mapQuery = parseMapQuery(router.query)
    router.replace(
      {
        pathname: location.pathname,
        query: mapQuery,
      },
      undefined,
      { shallow: true },
    )
    form.reset()
    setIsVisibleBalloon(false)
    window.scroll({ top: 0, behavior: 'smooth' })
    wrapperRef?.current?.scrollTo(0, 0)

    trackEvent({
      category: 'UX',
      name: 'Filter',
      label: 'Reset Filters',
    })
  }

  const textButton = submitting
    ? 'Подождите…'
    : `Показать ${pluralizeCardinal(count, [...APARTMENT_PLURAL_FILTER])}`

  useEffect(() => {
    setIsVisibleBalloon(false)
  }, [isAllFilterOptionOpen])

  useDeepCompareEffect(() => {
    if (errors && Object.keys(errors).length) {
      setCount(0)
      return
    }
    getCountApartments(debounceValues, userHasActiveDeals ? Promo.ExMax : Promo.Default).then(
      setCount,
    )
  }, [debounceValues, errors, userHasActiveDeals])

  useEffect(() => {
    if (formRef.current) {
      setFilterCoordinatesY(formRef.current?.getBoundingClientRect().y + window.scrollY)
    }
  }, [])

  useEffect(() => {
    if (formCloseTrigger) {
      toggleFilterOptions(false)
    }
  }, [formCloseTrigger]) // eslint-disable-line react-hooks/exhaustive-deps

  const selectCityList = [
    { id: '', name: 'Москва и МО' },
    ...contacts.cities.map((city) => ({
      id: String(city.id),
      name: city.name,
    })),
  ]

  const onMapClick = () => {
    const filterValues = dropEmptyFields(values)

    if (!filterValues.city) delete filterValues.city
    delete filterValues.toponym

    const filter = Object.entries(filterValues)
      .map((entry) => ({
        [entry[0]]: Array.isArray(entry[1]) ? entry[1].join() : String(entry[1]),
      }))
      .reduce(
        (accum, entry) => ({
          ...accum,
          ...entry,
        }),
        {},
      )

    router.push({ pathname: '/catalog-map', query: filter })
  }

  const cityData = useMemo(() => {
    let addressParam
    let cityName: string

    if (cityId === '') {
      return {
        name: '',
      }
    } else {
      addressParam = contacts.cities.find((contact) => contact.id === Number(cityId))
      cityName = addressParam?.name ?? ''
    }

    return {
      name: cityName,
      bbox: {
        bbox1_latitude: addressParam?.bbox1Latitude ?? 0,
        bbox1_longitude: addressParam?.bbox1Longitude ?? 0,
        bbox2_latitude: addressParam?.bbox2Latitude ?? 0,
        bbox2_longitude: addressParam?.bbox2Longitude ?? 0,
      },
    }
  }, [contacts, cityId])

  return (
    <form
      className={styles.form}
      method="dialog"
      onSubmit={handleSubmit}
      onClick={setCoordinatesClick}
      onChange={onChangeForm}
      ref={formRef}
    >
      <div className={styles.form_inner}>
        <div
          className={cn(styles.mobile_panel, {
            [styles.mobile_panel___open]: isAllFilterOptionOpen,
          })}
        >
          <Button
            type="button"
            externalStyles={styles.mobile_panel_trash_content}
            onClick={resetForm}
          >
            Сбросить
          </Button>
          <Button
            type="submit"
            disabled={submitting || (errors && Object.keys(errors).length > 0)}
            onClick={() => setIsVisibleBalloon(false)}
            externalStyles={styles.mobile_panel_submit}
          >
            Применить
          </Button>
        </div>
        <div className={styles.form_wrapper}>
          <div className={styles.form_row}>
            <Field
              name="city"
              render={({ input }) => (
                <Dropdown
                  {...input}
                  label="Выбор города для поиска"
                  items={selectCityList}
                  onChange={(cityId) => {
                    const cityName =
                      contacts.cities.find((contact) => contact.id === Number(cityId))?.name ?? ''

                    setCityId(cityId)
                    input.onChange(cityName)
                    router.replace(
                      {
                        pathname: location.pathname,
                        query: {
                          ...router.query,
                          city: cityName,
                        },
                      },
                      undefined,
                      { shallow: true },
                    )
                    form.resetFieldState('address')
                  }}
                  value={
                    contacts.cities
                      .find((contact) => contact.name === input.value)
                      ?.id.toString() ?? ''
                  }
                  renderSelectedValue={({ name }) => `<span>Поиск в</span> ${cityIn(name || '')}`}
                  theme="white"
                />
              )}
            />
          </div>
          <div className={styles.form_row}>
            <Field
              name="address"
              render={({ input }) => (
                <SuggestToponym
                  {...input}
                  addressData={{
                    address:
                      typeof initialAddress === 'string' ? initialAddress : initialAddress[0],
                  }}
                  city={cityData}
                  onSelect={(value) => {
                    form.change(
                      'toponym',
                      value.toponym
                        ? [{ kind: value.toponym.kind, name: value.toponym.name }]
                        : [],
                    )

                    input.onChange(value.address)
                  }}
                />
              )}
            />
          </div>
          <div className={styles.form_row}>
            <InputBoxRow
              htmlFor="price-rub-min"
              label="Цена"
              unit="₽"
              theme="opaque"
              error={errors?.priceRubMin || errors?.priceRubMax || submitErrors}
            >
              <Field
                name="priceRubMin"
                render={({ input }) => (
                  <InputNumber
                    {...input}
                    id="price-rub-min"
                    type="text"
                    format={INPUT_FORMATS.INTEGER}
                    textHead="От"
                  />
                )}
              />
              <Field
                name="priceRubMax"
                render={({ input }) => (
                  <InputNumber
                    {...input}
                    id="price-rub-max"
                    type="text"
                    format={INPUT_FORMATS.INTEGER}
                    textHead="До"
                  />
                )}
              />
            </InputBoxRow>
          </div>
          <div className={styles.form_row}>
            <FieldArray
              name="roominess"
              render={(props) => (
                <CheckboxGroup
                  {...props}
                  {...settings.roominess}
                  label="Количество комнат"
                  theme="opaque"
                />
              )}
            />
          </div>
          <div className={styles.form_row}>
            <InputBoxRow
              htmlFor="full-area-min"
              label="Общая площадь"
              unit="м²"
              theme="opaque"
              error={errors?.fullAreaMin || errors?.fullAreaMax || submitErrors}
            >
              <Field
                name="fullAreaMin"
                render={({ input }) => (
                  <InputNumber
                    {...input}
                    id="full-area-min"
                    type="text"
                    format={INPUT_FORMATS.DECIMAL}
                    textHead="От"
                  />
                )}
              />
              <Field
                name="fullAreaMax"
                render={({ input }) => (
                  <InputNumber
                    {...input}
                    id="full-area-max"
                    type="text"
                    format={INPUT_FORMATS.DECIMAL}
                    textHead="До"
                  />
                )}
              />
            </InputBoxRow>
          </div>
          <Transition
            as="div"
            show={isAllFilterOptionOpen}
            enterFrom={styles.form_all_filter_options___closed}
            enterTo={styles.form_all_filter_options___open}
            leaveFrom={styles.form_all_filter_options___open}
            leaveTo={styles.form_all_filter_options___closed}
          >
            <div className={styles.form_row}>
              <FieldArray
                name="housingTypes"
                render={(props) => (
                  <CheckboxGroup
                    {...props}
                    {...settings.housingTypes}
                    label="Тип объекта"
                    theme="opaque"
                  />
                )}
              />
            </div>
            <div className={styles.form_row}>
              <InputBoxRow
                htmlFor="kitchens-area-min"
                label="Площадь кухни"
                unit="м²"
                theme="opaque"
                error={errors?.kitchensAreaMin || errors?.kitchensAreaMax || submitErrors}
              >
                <Field
                  name="kitchensAreaMin"
                  render={({ input }) => (
                    <InputNumber
                      {...input}
                      id="kitchens-area-min"
                      type="text"
                      format={INPUT_FORMATS.DECIMAL}
                      textHead="От"
                    />
                  )}
                />
                <Field
                  name="kitchensAreaMax"
                  render={({ input }) => (
                    <InputNumber
                      {...input}
                      id="kitchens-area-max"
                      type="text"
                      format={INPUT_FORMATS.DECIMAL}
                      textHead="До"
                    />
                  )}
                />
              </InputBoxRow>
            </div>
            <div className={styles.form_row}>
              <InputBoxRow
                htmlFor="living-area-min"
                label="Жилая площадь"
                unit="м²"
                theme="opaque"
                error={errors?.livingAreaMin || errors?.livingAreaMax || submitErrors}
              >
                <Field
                  name="livingAreaMin"
                  render={({ input }) => (
                    <InputNumber
                      {...input}
                      id="living-area-min"
                      type="text"
                      format={INPUT_FORMATS.DECIMAL}
                      textHead="От"
                    />
                  )}
                />
                <Field
                  name="livingAreaMax"
                  render={({ input }) => (
                    <InputNumber
                      {...input}
                      id="living-area-max"
                      type="text"
                      format={INPUT_FORMATS.DECIMAL}
                      textHead="До"
                    />
                  )}
                />
              </InputBoxRow>
            </div>
            <div className={styles.form_row}>
              <InputBoxRow
                htmlFor="building-floor-count-min"
                label="Этажей в доме"
                theme="opaque"
                error={
                  errors?.buildingFloorCountMin || errors?.buildingFloorCountMax || submitErrors
                }
              >
                <Field
                  name="buildingFloorCountMin"
                  render={({ input }) => (
                    <InputNumber
                      {...input}
                      id="building-floor-count-min"
                      type="text"
                      format={INPUT_FORMATS.INTEGER}
                      textHead="От"
                    />
                  )}
                />
                <Field
                  name="buildingFloorCountMax"
                  render={({ input }) => (
                    <InputNumber
                      {...input}
                      id="building-floor-count-max"
                      type="text"
                      format={INPUT_FORMATS.INTEGER}
                      textHead="До"
                    />
                  )}
                />
              </InputBoxRow>
            </div>
            <div className={styles.form_row}>
              <InputBoxRow
                htmlFor="floor-number-min"
                label="Этаж квартиры"
                theme="opaque"
                error={errors?.floorNumberMin || errors?.floorNumberMax || submitErrors}
              >
                <Field
                  name="floorNumberMin"
                  render={({ input }) => (
                    <InputNumber
                      {...input}
                      id="floor-number-min"
                      type="text"
                      format={INPUT_FORMATS.INTEGER}
                      textHead="От"
                    />
                  )}
                />
                <Field
                  name="floorNumberMax"
                  render={({ input }) => (
                    <InputNumber
                      {...input}
                      id="floor-number-max"
                      type="text"
                      format={INPUT_FORMATS.INTEGER}
                      textHead="До"
                    />
                  )}
                />
              </InputBoxRow>
            </div>
            <div className={styles.form_row}>
              <FieldArray
                name="decorationTypes"
                render={(props) => (
                  <CheckboxGroup
                    {...props}
                    {...settings.decorationTypes}
                    label="Уровень ремонта"
                    theme="opaque"
                  />
                )}
              />
            </div>
            <div className={styles.form_row}>
              <FieldArray
                name="wcsType"
                render={(props) => (
                  <CheckboxGroup
                    {...props}
                    {...settings.wcsType}
                    label="Санузел"
                    theme="opaque"
                  />
                )}
              />
            </div>
            <div className={styles.form_row}>
              <FieldArray
                name="buildingCeilingHeight"
                render={(props) => (
                  <CheckboxGroup
                    {...props}
                    {...settings.buildingCeilingHeight}
                    label="Высота потолков"
                    theme="opaque"
                  />
                )}
              />
            </div>
            <div className={styles.form_row}>
              <FieldArray
                name="buildingTypes"
                render={(props) => (
                  <CheckboxGroup
                    {...props}
                    {...settings.buildingTypes}
                    label="Тип дома"
                    theme="opaque"
                  />
                )}
              />
            </div>
            <div className={styles.form_row}>
              <FieldArray
                name="windowViewTypes"
                render={(props) => (
                  <CheckboxGroup
                    {...props}
                    {...settings.windowViewTypes}
                    label="Вид из окна"
                    theme="opaque"
                  />
                )}
              />
            </div>
            <div className={styles.form_row}>
              <FieldArray
                name="elevatorType"
                render={(props) => (
                  <CheckboxGroup
                    {...props}
                    {...settings.elevatorType}
                    label="Лифт"
                    theme="opaque"
                  />
                )}
              />
            </div>
            <div className={styles.form_row}>
              <FieldArray
                name="balconyType"
                render={(props) => (
                  <CheckboxGroup
                    {...props}
                    {...settings.balconyType}
                    label="Балкон"
                    theme="opaque"
                  />
                )}
              />
            </div>
            <div className={styles.form_row}>
              <FieldArray
                name="buildingGarbageChute"
                render={(props) => (
                  <CheckboxGroup
                    {...props}
                    {...settings.buildingGarbageChute}
                    label="Мусоропровод"
                    theme="opaque"
                  />
                )}
              />
            </div>
            <div className={styles.form_row}>
              <FieldArray
                name="buildingParkingTypes"
                render={(props) => (
                  <CheckboxGroup
                    {...props}
                    {...settings.buildingParkingTypes}
                    label="Парковка"
                    theme="opaque"
                  />
                )}
              />
            </div>
          </Transition>
          <Button
            type="button"
            size="full"
            disabled={submitting}
            externalStyles={styles.btn_show_all_filter}
            onClick={toggleFilterOptions}
          >
            <div className={styles.btn_show_all_filter_content}>
              Все фильтры
              <div
                className={cn(styles.btn_show_all_filter_arrow, {
                  [styles.btn_show_all_filter_arrow___rotate]: isAllFilterOptionOpen,
                })}
              >
                <SvgArrow />
              </div>
            </div>
          </Button>
          <Button
            type="submit"
            size="full"
            disabled={submitting || (errors && Object.keys(errors).length > 0)}
            onClick={() => setIsVisibleBalloon(false)}
            externalStyles={styles.form_submit}
          >
            {textButton}
          </Button>
          <Button type="button" size="full" externalStyles={styles.btn_trash} onClick={resetForm}>
            <div className={styles.btn_trash_content}>
              <SvgTrashFilter />
              Сбросить фильтр
            </div>
          </Button>
          {showMapBtn && (
            <Button
              type="button"
              onClick={onMapClick}
              externalStyles={searchCatalogStyles.search_catalog__form_bottom_btnMap}
            >
              <SvgCompass />
              Смотреть на карте
            </Button>
          )}
        </div>
      </div>
      {isAllFilterOptionOpen && (
        <Balloon
          isVisibleBalloon={isVisibleBalloon}
          submitting={submitting}
          text={textButton}
          topFilter={filterCoordinatesY}
          clickCoordinatesY={clickCoordinatesY}
          onClick={onClickBalloon}
        />
      )}
    </form>
  )
}
