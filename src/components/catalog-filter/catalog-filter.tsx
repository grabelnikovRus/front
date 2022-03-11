import arrayMutators from 'final-form-arrays'
import { useRouter } from 'next/router'
import { RefObject, useEffect, useState, VFC } from 'react'
import { Form } from 'react-final-form'

import { SortBy, SortOrder } from '@/api'
import { validate } from '@/lib/form'
import { parseMapQuery } from '@/lib/map/parse-map-query'
import { trackEvent } from '@/lib/tracking'
import {
  ApartmentsSort,
  normalizeApartmentsSort,
  normalizeApartmentsFilter,
  dropEmptyFields,
} from '@/modules/apartments-v1'
import { ContactsEntity } from '@/modules/contacts'
import { CatalogSettingsEntity } from '@/modules/settings-v1'

import { CatalogFilterForm, CatalogFilterFormValues } from './components/catalog-filter-form'

export interface CatalogFilterProps {
  settings: CatalogSettingsEntity
  contacts: ContactsEntity
  formCloseTrigger?: boolean
  closeFilter: () => void
  pathname: string
  showMapBtn?: boolean
  userHasActiveDeals: boolean
  wrapperRef: RefObject<HTMLDivElement>
}

export const CatalogFilter: VFC<CatalogFilterProps> = ({
  settings,
  contacts,
  formCloseTrigger = false,
  closeFilter,
  pathname,
  showMapBtn,
  userHasActiveDeals,
  wrapperRef,
}) => {
  const [initialValues, setInitialValues] = useState({})
  const router = useRouter()

  useEffect(() => {
    const values = Object.keys(settings).reduce<{
      [key: string]: string | number | string[] | null
    }>((acc, key) => {
      if (settings[key as keyof CatalogSettingsEntity].initial) {
        acc[key] = settings[key as keyof CatalogSettingsEntity].initial
      }

      return acc
    }, {})

    if (Object.keys(router.query).length) {
      const filter = normalizeApartmentsFilter(router.query)
      const sort = normalizeApartmentsSort(router.query)

      setInitialValues({
        ...values,
        ...filter,
        ...sort,
      })

      return
    }

    setInitialValues(values)
  }, [settings, router.query])

  useEffect(() => {
    const handleRouteChange = (url: string, { shallow }: { shallow: boolean }) => {
      if (!shallow) {
        closeFilter()
      }
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const updateQuery = (values: CatalogFilterFormValues) => {
    const filterValues = dropEmptyFields(values)

    if (!filterValues.city) delete filterValues.city

    const sort: ApartmentsSort = {
      ...(router.query.sortBy ? { sortBy: router.query.sortBy as SortBy } : {}),
      ...(router.query.sortOrder ? { sortOrder: router.query.sortOrder as SortOrder } : {}),
    }

    const filter = Object.entries(filterValues)
      .map((entry) => {
        let value

        if (Array.isArray(entry[1])) {
          const isObjectsArray = entry[1].some((el) => typeof el === 'object')

          let searchParams = entry[1]
          if (isObjectsArray) {
            searchParams = entry[1].map((item) =>
              decodeURIComponent(new URLSearchParams(item).toString()),
            )
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

    const mapQuery = parseMapQuery(router.query)

    const shallow = router.pathname === pathname
    const routerMethod = shallow ? 'replace' : 'push'

    router[routerMethod]({ pathname, query: { ...mapQuery, ...sort, ...filter } }, undefined, {
      shallow,
    })
  }

  const handleSubmit = (values: CatalogFilterFormValues) => {
    window.scroll({ top: 0, behavior: 'smooth' })
    updateQuery(values)

    trackEvent({
      category: 'UX',
      name: 'Filter',
      label: 'Clicked Show Variants Button',
    })

    closeFilter()
  }

  return (
    <Form<CatalogFilterFormValues>
      initialValues={initialValues}
      validate={validate(settings)}
      onSubmit={handleSubmit}
      mutators={{ ...arrayMutators }}
    >
      {(props) => (
        <CatalogFilterForm
          {...props}
          settings={settings}
          contacts={contacts}
          formCloseTrigger={formCloseTrigger}
          showMapBtn={showMapBtn}
          userHasActiveDeals={userHasActiveDeals}
          wrapperRef={wrapperRef}
        />
      )}
    </Form>
  )
}
