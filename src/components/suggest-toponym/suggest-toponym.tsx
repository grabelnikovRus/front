import cn from 'classnames'
import { useRef, useState, useEffect, useCallback, VFC } from 'react'

import { NUMERIC_CONST } from '@/config/constants'
import { getYmapsSuggestPlace } from '@/modules/ymaps'
import { ICity, YmapsSuggestResponseResult } from '@/types/ymaps-suggest'
import { Suggest, SvgSuggestAddress, SvgSuggestMetro, SvgSuggestOther } from '@/uikit'
import { useMenuMobile } from '@components/menu-mobile/use-menu-mobile.hook'

import styles from './suggest-toponym.module.scss'

interface AddressData {
  address: string
  lat?: number
  lon?: number
  toponym?: YmapsSuggestResponseResult
  value?: string
}

interface AddressSection {
  title: string
  items: AddressData[]
}

export interface SuggestToponymProps {
  addressData: AddressData
  city: ICity
  onSelect: (data: AddressData) => void
  testId?: string
  value?: string
}

const SUGGEST_DELAY = 600
let suggestionTimeoutId: number | null

export const SuggestToponym: VFC<SuggestToponymProps> = ({
  addressData,
  city,
  onSelect,
  testId,
  value,
}) => {
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<AddressSection[]>([])
  const windowHeight = useRef(0)
  const clearAddress = () => onSelect({ address: '', lat: undefined, lon: undefined })

  const handleSuggestionsFetchRequested = (value: string) => {
    if (suggestionTimeoutId) window.clearTimeout(suggestionTimeoutId)
    if (value.length > 2) {
      setLoading(true)
      suggestionTimeoutId = window.setTimeout(() => {
        suggestionTimeoutId = null
        getYmapsSuggestPlace(value, city).then((sections) => {
          setLoading(false)
          setSuggestions(
            sections.map((section) => ({
              title: section.title,
              items: section.places.map((place) => ({
                address: place.displayName,
                lat: place.lat,
                lon: place.lon,
                value: place.value,
                toponym: place.toponym,
              })),
            })),
          )
        })
      }, SUGGEST_DELAY)
    }
  }

  const handleSuggestionSelected = (suggestion?: AddressData | null) => {
    if (suggestion == null) return
    setSuggestions([])
    onSelect(suggestion)
  }

  const handleInput = (value = '') => {
    handleSuggestionsFetchRequested(value)
    if (value === '') {
      setSuggestions([])
      clearAddress()
    }
  }

  const renderSectionTitle = (section: AddressSection) => {
    let svg
    switch (section.title) {
      case 'Адреса':
        svg = <SvgSuggestAddress />
        break
      case 'Метро':
        svg = <SvgSuggestMetro />
        break
      default:
        svg = <SvgSuggestOther />
    }
    return (
      <div className={styles.suggestion_title}>
        <div className={styles.suggestion_icon}>{svg}</div>
        {section.title}
      </div>
    )
  }

  const renderSuggestion = ({
    item,
    inputValue,
    isHighlighted,
    ...rest
  }: {
    item: AddressData
    inputValue: string
    isHighlighted: boolean
  }) => {
    const displayName = item.address
    const suggestClassName = cn(styles.suggestions_item, {
      [styles.suggestions_item___highlighted]: isHighlighted,
    })
    const suggestProps = { key: displayName, className: suggestClassName, ...rest }

    if (!displayName.toLowerCase().includes(inputValue.toLowerCase())) {
      return <div {...suggestProps}>{displayName}</div>
    }

    const firstIndex = displayName.toLowerCase().indexOf(inputValue.toLowerCase())
    const lastIndex = firstIndex + inputValue.length

    const first = displayName.substring(0, firstIndex)
    const middle = displayName.substring(firstIndex, lastIndex)
    const last = displayName.substring(lastIndex)
    return (
      <div {...suggestProps}>
        {first}
        <span className={styles.suggestions_highlighted}>{middle}</span>
        {last}
      </div>
    )
  }

  const menuMobileState = useMenuMobile()

  const onResizeWindow = useCallback(() => {
    if (
      Math.abs(windowHeight.current - window.innerHeight) <
      NUMERIC_CONST.DIFF_HEIGHT_WINDOW_AND_KEYBOARD
    ) {
      menuMobileState.openMenu()
      return
    }
    if (windowHeight.current <= window.innerHeight) menuMobileState.openMenu()
    if (windowHeight.current > window.innerHeight) menuMobileState.closeMenu()
  }, [menuMobileState])

  useEffect(() => {
    window.addEventListener('resize', onResizeWindow)
    return () => window.removeEventListener('resize', onResizeWindow)
  }, [onResizeWindow])

  useEffect(() => {
    windowHeight.current = window.innerHeight
  }, [])

  return (
    <div className={styles.suggestion}>
      <Suggest<AddressData>
        placeholder="Район, метро или МЦД..."
        defaultInputValue={addressData.address}
        itemToString={(item) => item?.address ?? ''}
        renderSectionTitle={renderSectionTitle}
        renderItem={renderSuggestion}
        onSelect={handleSuggestionSelected}
        onInput={handleInput}
        items={suggestions}
        isLoading={loading}
        testId={testId}
        value={value}
      />
    </div>
  )
}
