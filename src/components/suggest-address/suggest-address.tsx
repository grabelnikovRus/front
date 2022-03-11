import cn from 'classnames'
import { useCallback, useEffect, useState, VFC } from 'react'

import { STORAGE_KEY } from '@/config'
import { getAddressSuggestions } from '@/modules/ymaps'
import { IAddressSuggest } from '@/types/ymaps-suggest'
import { Suggest } from '@/uikit'

import styles from './suggest-address.module.scss'

import { getStoredData, setStoredData } from '../sell-request-form/lib/local-storage'
import { IAddressFormData } from '../sell-request-form/sell-request-form.types'

export interface SuggestAddressProps {
  addressData: IAddressFormData
  placeholder: string
  onSelect: (data: IAddressFormData) => void
  onChangeInput?: (address: string) => void
  error?: string
}

const SUGGEST_DELAY = 600
let suggestionTimeoutId: number | null

export const SuggestAddress: VFC<SuggestAddressProps> = (props) => {
  const { placeholder, onSelect, onChangeInput, addressData, error } = props
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<IAddressSuggest[]>([])
  const [prevSuggestions, setPrevsuggestions] = useState<IAddressSuggest[]>([])

  const clearAddress = () => {
    onChangeInput?.('')
    onSelect({ address: '' })
    const storedData = getStoredData(STORAGE_KEY)
    delete storedData.address
    setStoredData(STORAGE_KEY, storedData)
  }

  const handleSuggestionsFetchRequested = useCallback((value: string) => {
    if (suggestionTimeoutId) window.clearTimeout(suggestionTimeoutId)
    if (value.length > 2) {
      suggestionTimeoutId = window.setTimeout(() => {
        setLoading(true)
        suggestionTimeoutId = null
        getAddressSuggestions(value).then((res) => {
          res.length && setPrevsuggestions(res)
          setSuggestions(res.length ? res : prevSuggestions)
          setLoading(false)
        })
      }, SUGGEST_DELAY)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSuggestionSelected = (suggestion?: IAddressSuggest | null) => {
    if (!suggestion) {
      clearAddress()
      return
    }
    onSelect({
      address: suggestion.displayName,
      lat: suggestion.lat,
      lon: suggestion.lon,
    })
  }

  const handleInput = (newValue = '') => {
    handleSuggestionsFetchRequested(newValue)
    if (newValue === '') clearAddress()
    else onChangeInput?.(newValue)
  }

  const renderSuggestion = ({
    item,
    inputValue,
    isHighlighted,
    ...rest
  }: {
    item: IAddressSuggest
    inputValue: string
    isHighlighted: boolean
  }) => {
    const displayName = item.displayName
    const suggestClassName = cn(styles.suggestions_item, {
      [styles.suggestions_item___highlighted]: isHighlighted,
    })
    const suggestProps = { key: displayName, className: suggestClassName, ...rest }

    return <div {...suggestProps}>{displayName}</div>
  }

  useEffect(() => {
    handleSuggestionsFetchRequested(addressData.address)
  }, [addressData.address, handleSuggestionsFetchRequested])

  return (
    <Suggest<IAddressSuggest>
      itemToString={(item) => item?.displayName ?? ''}
      onInput={handleInput}
      placeholder={placeholder}
      onSelect={handleSuggestionSelected}
      renderItem={renderSuggestion}
      items={suggestions.length > 0 ? [{ title: '', items: suggestions }] : []}
      isLoading={loading}
      defaultInputValue={addressData.address}
      error={error}
    />
  )
}
