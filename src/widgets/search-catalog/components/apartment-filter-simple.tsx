/* eslint-disable max-lines,curly,no-use-before-define */

import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useMemo, useRef, useState, VFC } from 'react'

import { Promo } from '@/api'
import { COORDINATES_CITY, FORM } from '@/config'
import { interpolate } from '@/legacy/lib/string'
import { pluralizeCardinal } from '@/lib/i18n'
import { trackEvent } from '@/lib/tracking'
import { useDebounce } from '@/lib/use-debounce'
import { ApartmentsEntity, ApartmentsFilter, useApartmentsCounter } from '@/modules/apartments-v1'
import { ContactsEntity } from '@/modules/contacts'
import { CatalogSettingsEntity } from '@/modules/settings-v1'
import { YmapsSuggestResponseResult } from '@/types/ymaps-suggest'
import { Button, CheckboxGroup, SvgCompass } from '@/uikit'
import { SuggestToponym } from '@components/suggest-toponym/suggest-toponym'

import searchCatalogStyles from './apartment-filter-simple.module.scss'

interface IAddressData {
  address: string
  lat?: number
  lon?: number
  toponym?: YmapsSuggestResponseResult
  value?: string
}

interface FormState {
  checkboxStates: {
    [key: string]: string[]
  }
  errorMessages: {
    [key: string]: string
  }
  inputValues: {
    [key: string]: string
  }
  metaData?: {
    toponym?: YmapsSuggestResponseResult
  }
}

interface ApartmentFilterSimpleProps {
  apartments: ApartmentsEntity
  contacts: ContactsEntity
  settings: CatalogSettingsEntity
  userHasActiveDeals: boolean
}

const {
  APARTMENT_FILTER: { APARTMENT_PLURAL_FILTER },
} = FORM

export const ApartmentFilterSimple: VFC<ApartmentFilterSimpleProps> = (props) => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const checkboxStates = {
    'apartment-rooms': props.settings.roominess.initial ?? [],
  }
  const inputValues = {
    'building-address': String(props.settings.address.initial ?? ''),
  }
  const [formState, setFormState] = useState<FormState>({
    // Merge GET query search params to the form checkbox fields.
    checkboxStates: {
      'apartment-rooms': checkboxStates['apartment-rooms'],
    },
    errorMessages: {},
    inputValues: {
      'building-address': inputValues['building-address'],
    },
  })
  const dropEmptyFields = (req: ApartmentsFilter): ApartmentsFilter =>
    Object.entries(req).reduce(
      (accum, entry) =>
        (
          Array.isArray(entry[1])
            ? entry[1]?.some(
                (value) =>
                  value &&
                  value !== '00000000-0000-0000-0000-000000000000' &&
                  value !== 'no-matter',
              )
            : entry[1]
        )
          ? {
              ...accum,
              ...{ [entry[0]]: entry[1] },
            }
          : accum,
      {},
    )
  const getFilter = (state: FormState): ApartmentsFilter => {
    const req = dropEmptyFields({
      address: state.inputValues['building-address'],
      roominess: state.checkboxStates['apartment-rooms'],
    })

    if (state?.metaData?.toponym?.kind && state?.metaData?.toponym?.name) {
      req.toponym = [
        {
          kind: state?.metaData?.toponym?.kind,
          name: state?.metaData?.toponym?.name,
        },
      ]
    }

    if (!req.city) {
      const address = state.metaData?.toponym?.desc
      req.city = Object.keys(COORDINATES_CITY)
        .filter((city) => address?.includes(city))
        .join('')
    }

    return req
  }
  const onChange = ({ target }: ChangeEvent<HTMLInputElement>, newArray: string[]) => {
    // Assign shallow copy of array with changed checked state of an input by a specified index.
    const state = {
      ...formState,
      checkboxStates: {
        ...formState.checkboxStates,
        [target.name]: newArray,
      },
    }

    setFormState(state)
    getFilter(state)
  }
  const onChangeAddress = (data: IAddressData) => {
    if (data.address === '') {
      trackEvent({
        category: 'Funnel Buy',
        label: 'Address in the Search bar',
        name: 'Removed the Address in the search bar',
      })
    } else {
      trackEvent({
        category: 'Funnel Buy',
        label: 'Address in the Search bar',
        name: 'Entered the Address in the Search bar',
      })
    }

    const state = {
      ...formState,
      inputValues: {
        ...formState.inputValues,
        'building-address': data.address,
      },
      metaData: {
        toponym: data.toponym,
      },
    }
    setFormState(state)
    if (isFormValid(state)) getFilter(state)
  }

  const updateQueryString = (state: FormState, pathname: string) => {
    if (!validateForm(state)) {
      return
    }

    const req = dropEmptyFields(getFilter(state))

    const query = Object.entries(req)
      .map((entry) => {
        let value

        if (Array.isArray(entry[1])) {
          const isObjectsArray = entry[1].some((el) => typeof el === 'object')

          let searchParams = entry[1]
          if (isObjectsArray) {
            searchParams = entry[1].map((item) => new URLSearchParams(item).toString())
          }

          value = searchParams.join()
        } else {
          value = String(entry[1])
        }

        return {
          [entry[0]]: value,
        }
      })
      .reduce(
        (accum, entry) => ({
          ...accum,
          ...entry,
        }),
        {},
      )

    if (query.fullAreaMax) query.fullAreaMax = String(Number(query.fullAreaMax) / 100)
    if (query.fullAreaMin) query.fullAreaMin = String(Number(query.fullAreaMin) / 100)

    router.push({
      pathname,
      // Map arrays of checkbox values to joined strings.
      query,
    })
  }

  const router = useRouter()
  const onReset = () => resetForm()
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    updateQueryString(formState, '/catalog')
    trackEvent({
      category: 'Funnel Buy',
      label: 'Show Apartments button',
      name: 'Clicked on the Show Apartments button',
    })
  }
  const onMapClick = () => updateQueryString(formState, '/catalog-map')
  const resetForm = () => {
    const state = {
      ...formState,
      checkboxStates,
      inputValues,
      metaData: undefined,
    }

    setFormState(state)
    getFilter(state)
  }
  const validateForm = (state: FormState) => {
    const errorMessages: {
      [key: string]: string
    } = {}

    // Building location.
    if (state.inputValues['building-address']) {
      if (
        !RegExp(props.settings.address.validation.pattern?.value ?? '').test(
          state.inputValues['building-address'],
        )
      )
        errorMessages['building-address'] =
          props.settings.address.validation.pattern?.message ?? ''
      else if (
        props.settings.address.validation.maxLength &&
        props.settings.address.validation.maxLength.value <
          state.inputValues['building-address'].length
      )
        errorMessages['building-address'] = interpolate(
          props.settings.address.validation.maxLength.message,
          {
            maxLength: props.settings.address.validation.maxLength.value,
          },
        )
      else if (
        props.settings.address.validation.minLength &&
        props.settings.address.validation.minLength.value >
          state.inputValues['building-address'].length
      )
        errorMessages['building-address'] = interpolate(
          props.settings.address.validation.minLength.message,
          {
            minLength: props.settings.address.validation.minLength.value,
          },
        )
    } else if (props.settings.address.validation.required)
      errorMessages['building-address'] = props.settings.address.validation.required
    setFormState((state) => ({
      ...state,
      errorMessages,
    }))

    return !Object.keys(errorMessages).length
  }
  const isFormValid = (state: FormState): boolean => {
    // Building location.
    if (state.inputValues['building-address']) {
      if (
        !RegExp(props.settings.address.validation.pattern?.value ?? '').test(
          state.inputValues['building-address'],
        )
      )
        return false
      else if (
        props.settings.address.validation.maxLength &&
        props.settings.address.validation.maxLength.value <
          state.inputValues['building-address'].length
      )
        return false
      else if (
        props.settings.address.validation.minLength &&
        props.settings.address.validation.minLength.value >
          state.inputValues['building-address'].length
      )
        return false
    } else if (props.settings.address.validation.required) return false

    return true
  }

  const cityData = useMemo(() => {
    const addressParam = props.contacts.cities[0]
    const cityName = ''

    return {
      name: cityName,
      bbox: {
        bbox1_latitude: addressParam.bbox1Latitude ?? 0,
        bbox1_longitude: addressParam.bbox1Longitude ?? 0,
        bbox2_latitude: addressParam.bbox2Latitude ?? 0,
        bbox2_longitude: addressParam.bbox2Longitude ?? 0,
      },
    }
  }, [props.contacts])

  const debouncedFormState = useDebounce(formState, 300)

  const { data: apartmentsCounter, isFetching: isCounterLoading } = useApartmentsCounter(
    dropEmptyFields(getFilter(debouncedFormState)),
    props.userHasActiveDeals ? Promo.ExMax : Promo.Default,
    props.apartments.count ?? 0,
    isFormValid(debouncedFormState),
  )

  return (
    <form
      className={searchCatalogStyles.search_catalog__form}
      //id="simpleApartmentFilterForm"
      method="dialog"
      onReset={onReset}
      onSubmit={onSubmit}
      ref={formRef}
    >
      <div className={searchCatalogStyles.search_catalog__form_main}>
        <div className={searchCatalogStyles.search_catalog__form_search}>
          <div
            className={`${searchCatalogStyles.search_block} ${
              'building-address' in formState.errorMessages
            }`}
          >
            <label className={searchCatalogStyles.search_block_filter_simple}>
              <SuggestToponym
                addressData={{
                  address: formState.inputValues['building-address'],
                }}
                city={cityData}
                onSelect={onChangeAddress}
                testId="search-catalog__input"
              />
              <span>{formState.errorMessages['building-address']}</span>
            </label>
          </div>
        </div>
        <CheckboxGroup
          className={searchCatalogStyles.search_catalog__form_roominess}
          name="apartment-rooms"
          options={props.settings.roominess.options}
          layout="main"
          values={formState.checkboxStates['apartment-rooms']}
          onChange={onChange}
          theme="simpleFilter"
          _default={props.settings.roominess.initial}
          onClick={(value) => {
            const eventType = value === '0' ? 'Studio' : value
            trackEvent({
              category: 'Funnel Buy',
              label: `${eventType} Apartment`,
              name: `Сhosed ${eventType} Apartment`,
            })
          }}
        />
      </div>
      <div className={searchCatalogStyles.search_catalog__form_bottom}>
        <Button type="submit" data-testid="search-catalog__show-apartments">
          {isCounterLoading
            ? 'Подождите…'
            : `Показать ${pluralizeCardinal(apartmentsCounter ?? 0, [
                ...APARTMENT_PLURAL_FILTER,
              ])}`}
        </Button>
        <Button
          type="button"
          onClick={() => {
            onMapClick()
            trackEvent({
              category: 'Funnel Buy Map',
              label: 'Button View on the Map on the Buy Page',
              name: 'Clicked on the Button View on the Map on the Buy Page',
            })
          }}
          externalStyles={searchCatalogStyles.search_catalog__form_bottom_btnMap}
          data-testid="search-catalog__show-on-map"
        >
          <SvgCompass />
          Смотреть на карте
        </Button>
      </div>
    </form>
  )
}
