/* eslint-disable max-lines,no-use-before-define */
import { useRouter } from 'next/router'
import { useEffect, useState, useRef, VFC, useCallback } from 'react'
import { YMaps, Map, YMapsApi, ObjectManager, ObjectManagerFeatures } from 'react-yandex-maps'

import { Apartment, SearchApartmentsResponseV1ResponseBody, Widget, Promo } from '@/api'
import { CatalogHeader } from '@/components/catalog-header/catalog-header'
import { config } from '@/config'
import { NUMERIC_CONST, COORDINATES_CITY, CoodinatesCityType } from '@/config/constants'
import { parseMapQuery, ParseMapQueryReturnType } from '@/lib/map/parse-map-query'
import { removeUndefined } from '@/lib/object'
import { getInitialPhone } from '@/lib/phone'
import { trackEvent } from '@/lib/tracking'
import { checkField, isArray, isNumber } from '@/lib/types'
import {
  ApartmentsEntity,
  ApartmentsFilter,
  getApartments,
  normalizeApartmentsFilter,
} from '@/modules/apartments-v1'
import { ContactsEntity } from '@/modules/contacts'
import { getApartmentsMap } from '@/modules/map/'
import { PagesEntity } from '@/modules/pages'
import { CatalogSettingsEntity } from '@/modules/settings-v1'
import { ProfileEntity } from '@/modules/userpanel'
import { useMenuMobile } from '@components/menu-mobile/use-menu-mobile.hook'

import { FilterMaps } from './components/filter-maps'
import { ListMaps } from './components/list-maps'
import { pinLayout } from './components/pin-map'
import { Zoom } from './components/zoom'
import styles from './maps.module.scss'

export interface MapsProps {
  apartments: ApartmentsEntity
  contacts: ContactsEntity
  pages: PagesEntity
  query: ApartmentsFilter
  settings: CatalogSettingsEntity
  pageWidgets: Widget[]
  profile?: ProfileEntity
}

interface Pin {
  longitude: number
  latitude: number
  apartments: number[]
  minPrice: number
}

type ChangeCenterMapData = CoodinatesCityType | ParseMapQueryReturnType

const DEFAULT_CITY = 'Москва'

const DEFAULT_STATE = {
  center: COORDINATES_CITY[DEFAULT_CITY],
  zoom: NUMERIC_CONST.ZOOM_FOR_CITY,
  controls: [],
}

const DEFAULT_OPTIONS = {
  yandexMapDisablePoiInteractivity: true,
  suppressMapOpenBlock: true,
  maxAnimationZoomDifference: 20,
  minZoom: 5,
  maxZoom: 17,
}

const ZOOM_STEP = 2
const GRID_SIZE = {
  ZOOM_MIN: 20,
  ZOOM_MAX: 100,
}

const useApartmentsFilter = () => {
  const router = useRouter()

  const [value, setValue] = useState(() => normalizeApartmentsFilter(router.query))

  useEffect(() => {
    const currentValue = normalizeApartmentsFilter(router.query)

    if (JSON.stringify(currentValue) !== JSON.stringify(value)) {
      setValue(currentValue)
    }
  }, [router.query, value])

  return value
}

export const Maps: VFC<MapsProps> = (props) => {
  const router = useRouter()
  const [ymaps, setYmaps] = useState<YMapsApi | null>(null)
  const mapRef = useRef<ymaps.Map | null>(null)
  const mapObjectManagerRef = useRef<ymaps.ObjectManager | null>(null)
  const [bounds, setBounds] = useState<number[][]>([])
  const [centerMap, setCenterMap] = useState<number[]>([0, 0])
  const [gridSize, setGridSize] = useState(GRID_SIZE.ZOOM_MIN)
  const [features, setFeatures] = useState<ObjectManagerFeatures>([])
  const [apartmentList, setApartmentList] = useState<Apartment[]>([])
  const [apartmentIdAmo, setApartmentIdAmo] = useState<number[]>([])
  const [infoPin, setInfoPin] = useState<Pick<SearchApartmentsResponseV1ResponseBody, 'count'>>({
    count: 0,
  })
  const apartmentsFilter = useApartmentsFilter()
  const userHasActiveDeals = Boolean(props.profile?.countActiveDeals)
  const bannerApartmentSnippet = userHasActiveDeals
    ? undefined
    : props.pageWidgets.find((widget) => widget.name === 'banner_apartment_snippet_v5__snippet')
  const bannerModal = userHasActiveDeals
    ? undefined
    : props.pageWidgets.find((widget) => widget.name === 'banner_modal_v5__modal')

  const contactPhoneNumber = getInitialPhone(props.contacts)?.number

  const menuMobileState = useMenuMobile()

  const setMapStateByQuery = useCallback((priority?: 'city') => {
    if (!mapRef.current) return

    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())

    const city = params.city ? (params.city as CoodinatesCityType) : DEFAULT_CITY

    if (priority === 'city') {
      changeCenterMap(city)
      return
    }

    const mapState = parseMapQuery(params, 'normalize')

    const changeData = Object.keys(removeUndefined(mapState)).length ? mapState : city

    changeCenterMap(changeData)
  }, [])

  const onLoad = useCallback(
    (ymaps) => {
      setYmaps(ymaps)

      setMapStateByQuery()

      setBounds(mapRef.current?.getBounds() ?? [])
    },
    [setMapStateByQuery],
  )

  const setInitialRef = useCallback((ref: ymaps.Map | null) => {
    mapRef.current = ref
  }, [])

  const drawMapElement = () => {
    if (!mapRef?.current || !mapObjectManagerRef?.current) return

    const currentZoom = mapRef.current.getZoom()

    if (currentZoom <= NUMERIC_CONST.MAX_ZOOM_ONCLICK) {
      const iconLayout = ymaps?.templateLayoutFactory.createClass(
        '<div class="placemark placemark_point"></div>',
      )

      mapObjectManagerRef.current.clusters.options.set({
        clusterIconLayout: iconLayout,
        clusterCursor: 'none',
      })

      mapObjectManagerRef.current.objects.options.set({ iconLayout: iconLayout })
      return
    }

    mapObjectManagerRef.current.objects.options.set({
      iconLayout: pinLayout(ymaps, centerMap, menuMobileState.isOpenList),
    })

    mapObjectManagerRef.current.clusters.options.set({
      clusterIconLayout: pinLayout(ymaps, centerMap, menuMobileState.isOpenList),
      clusterCursor: 'pointer',
    })
  }

  useEffect(() => {
    if (!mapObjectManagerRef?.current) return
    mapObjectManagerRef.current.objects.options.set({
      iconLayout: pinLayout(ymaps, centerMap, menuMobileState.isOpenList),
    })
  }, [menuMobileState.isOpenList, centerMap, ymaps])

  const onClusterEvent = (e: ymaps.IEvent) => {
    if (!mapRef.current || !mapObjectManagerRef.current) return

    const objectId = e.get('objectId')
    const cluster = mapObjectManagerRef.current.clusters.getById(objectId)

    if (cluster === null) return

    const clusterCoordinates = cluster.geometry.coordinates
    const currentZoom = mapRef.current.getZoom()

    mapRef.current.setCenter(clusterCoordinates, currentZoom + ZOOM_STEP)
  }

  const onObjectEvent = (e: ymaps.IEvent) => {
    if (!mapObjectManagerRef.current) return

    const objectId = e.get('objectId')
    const object = mapObjectManagerRef.current.objects.getById(objectId)

    if (object === null) return

    const apartments =
      checkField(object.properties, 'pin') &&
      checkField(object.properties.pin, 'apartments') &&
      isArray<number>(object.properties.pin.apartments, isNumber)
        ? object.properties.pin.apartments
        : []

    const pin = {
      longitude: object.geometry.coordinates[0],
      latitude: object.geometry.coordinates[1],
      apartments,
      minPrice: 0,
    }

    onClickPin(pin)
  }

  const setInitialObjectManager = useCallback(
    (ref: ymaps.ObjectManager | null) => {
      if (!ref) return

      mapObjectManagerRef.current = ref

      drawMapElement()

      ref.clusters.events.add('click', onClusterEvent)
      ref.objects.events.add('click', onObjectEvent)
    },
    [mapRef.current], // eslint-disable-line react-hooks/exhaustive-deps
  )

  const onClickPin = ({ longitude, latitude, apartments }: Pin) => {
    if (!mapRef.current) return

    const currentZoom = mapRef.current.getZoom()

    if (currentZoom <= NUMERIC_CONST.MAX_ZOOM_ONCLICK) return

    setApartmentIdAmo(apartments)
    mapRef.current.panTo([longitude, latitude])
    setCenterMap([longitude, latitude])
    getApartments({ apartments }, userHasActiveDeals ? Promo.ExMax : Promo.Default).then(
      ({ apartments, count }) => {
        setInfoPin({ count: count ?? 0 })
        setApartmentList(apartments)
      },
    )
    menuMobileState.closeFilterMap()
    menuMobileState.openList()
    trackEvent({
      category: 'Funnel Buy Map',
      name: 'Selected an Object on the Map',
      label: 'Object on the Map',
    })
  }

  const onMapMove = (bounds: number[][]) => {
    if (!mapRef.current) return

    setBounds(bounds)

    const currentZoom = mapRef.current.getZoom()

    if (currentZoom >= NUMERIC_CONST.MAX_ZOOM_ONCLICK) {
      setGridSize(GRID_SIZE.ZOOM_MAX)
    } else {
      setGridSize(GRID_SIZE.ZOOM_MIN)
    }
  }

  useEffect(() => {
    setMapStateByQuery('city')
  }, [router.query.city, setMapStateByQuery])

  const changeCenterMap = (data: ChangeCenterMapData) => {
    if (!mapRef.current) return

    const city = typeof data === 'string' ? data : null

    const { ZOOM_FOR_TOWN, ZOOM_FOR_CITY } = NUMERIC_CONST

    let nextZoomNumber: number = city ? ZOOM_FOR_TOWN : ZOOM_FOR_CITY
    if (city === DEFAULT_CITY) nextZoomNumber = ZOOM_FOR_CITY
    if (typeof data === 'object' && data.z) nextZoomNumber = data.z as number

    const newCoordinates = typeof data === 'object' ? data.ll : COORDINATES_CITY[data]

    if (newCoordinates) {
      mapRef.current.setCenter(newCoordinates as number[], nextZoomNumber, {
        checkZoomRange: true,
      })
    }
  }

  const resetStytleActivePin = () => {
    const element = document.getElementsByClassName('placemark___active')[0]

    if (element) {
      element.classList.remove('placemark___active')
    }
  }

  useEffect(() => {
    if (!bounds.length) return

    getApartmentsMap(bounds, apartmentsFilter).then(({ objectManager }) => {
      if (!objectManager) return

      setFeatures(objectManager as ObjectManagerFeatures)
    })
  }, [bounds, apartmentsFilter])

  const setLocationQuery = () => {
    const map = mapRef.current
    if (!map) return

    const query = {
      ...router.query,
      ll: map.getCenter().join(','),
      z: map.getZoom(),
    }

    router.replace({ query }, undefined, { shallow: true })
  }

  return (
    <YMaps query={{ apikey: config.ymapsApiKey, load: 'package.full' }}>
      <div className={styles.maps}>
        <div className={styles.maps_header}>
          <CatalogHeader />
        </div>
        <div className={styles.maps_wrapper}>
          <Map
            onLoad={onLoad}
            defaultOptions={DEFAULT_OPTIONS}
            defaultState={DEFAULT_STATE}
            instanceRef={setInitialRef}
            width="100%"
            height="100%"
            onBoundsChange={(e) => {
              onMapMove(e.originalEvent.newBounds)
              drawMapElement()
              setLocationQuery()
            }}
          >
            <>
              <ObjectManager
                options={{
                  clusterize: false,
                  gridSize: gridSize,
                  clusterDisableClickZoom: true,
                  clusterOpenBalloonOnClick: false,
                }}
                instanceRef={setInitialObjectManager}
                features={features}
              />
              <Zoom ymaps={ymaps} mapRef={mapRef} />
            </>
          </Map>
          <FilterMaps
            {...props}
            onOpenFilter={resetStytleActivePin}
            userHasActiveDeals={userHasActiveDeals}
          />
          {!!apartmentList.length && (
            <ListMaps
              apartmentList={apartmentList || []}
              setApartmentList={setApartmentList}
              apartmentId={apartmentIdAmo}
              infoPin={infoPin}
              contactPhoneNumber={contactPhoneNumber}
              onCloseListApartments={resetStytleActivePin}
              bannerApartmentSnippet={bannerApartmentSnippet?.fields}
              bannerModal={bannerModal?.fields}
              userHasActiveDeals={userHasActiveDeals}
            />
          )}
        </div>
      </div>
    </YMaps>
  )
}
