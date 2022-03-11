import cn from 'classnames'
import { useCombobox } from 'downshift'
import { ReactElement, ReactNode, useEffect } from 'react'

import styles from './suggest.module.scss'

import { SvgClose, SvgPreloader, SvgSearch } from '../svg'

interface Section<Item> {
  title: string
  items: Item[]
}

interface ReducedItems {
  sections: ReactNode[]
  itemIndex: number
}

interface RenderItemProps<Item> {
  item: Item
  inputValue: string
  isHighlighted: boolean
}

export interface SuggestProps<Item> {
  label?: string
  placeholder?: string
  items: Array<Section<Item>>
  isLoading?: boolean
  defaultInputValue?: string
  itemToString?: (item: Item | null) => string
  onSelect: (item?: Item | null) => void
  onInput: (value?: string) => void
  renderItem?: (props: RenderItemProps<Item>) => ReactNode
  renderSectionTitle?: (section: Section<Item>) => ReactNode
  testId?: string
  error?: string
  value?: string
}

const renderSectionTitleFn = <Item,>({ title }: Section<Item>) => (
  <div className={styles.suggest_title}>{title}</div>
)

const renderItemFn = <Item,>({ item, isHighlighted, ...rest }: RenderItemProps<Item>) => (
  <div
    key={item as unknown as string}
    className={cn(styles.suggest_item, {
      [styles.suggest_item___highlighted]: isHighlighted,
    })}
    {...rest}
  >
    {item as unknown as string}
  </div>
)

export const Suggest = <Item,>({
  label,
  placeholder,
  items,
  isLoading,
  itemToString,
  renderSectionTitle = renderSectionTitleFn,
  renderItem = renderItemFn,
  onSelect,
  onInput,
  defaultInputValue = '',
  testId,
  error,
  value,
}: SuggestProps<Item>): ReactElement => {
  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    reset,
    inputValue,
    openMenu,
    setInputValue,
    closeMenu,
  } = useCombobox<Item>({
    items: items.reduce((acc, cur) => acc.concat(cur.items), [] as Item[]),
    onInputValueChange: ({ inputValue, type }) => {
      if (type === useCombobox.stateChangeTypes.InputChange) {
        onInput(inputValue)
      }
      if (type === useCombobox.stateChangeTypes.FunctionReset) {
        onInput('')
      }
    },
    itemToString,
  })

  useEffect(() => {
    setInputValue(defaultInputValue)
  }, [defaultInputValue]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value)
    }
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.suggest}>
      <label className={styles.suggest_label} {...getLabelProps()}>
        {label}
      </label>
      <div className={cn({ [styles.suggest___error]: error })}>
        <div className={styles.suggest_combobox} {...getComboboxProps()}>
          <div className={styles.suggest_icon}>
            {isLoading ? <SvgPreloader /> : <SvgSearch />}
          </div>
          <input
            className={styles.suggest_input}
            placeholder={placeholder}
            data-testid={testId}
            {...getInputProps({ onFocus: openMenu })}
          />
          {inputValue.length > 2 && (
            <button type="button" className={cn(styles.suggest_reset)} onClick={reset}>
              <SvgClose />
            </button>
          )}
        </div>
        {error && <div className={styles.suggest_error_text}>{error}</div>}
      </div>
      <div className={styles.suggest_menu} {...getMenuProps()}>
        {isOpen &&
          inputValue !== '' &&
          items.reduce(
            (result, section) => {
              result.sections.push(
                <div key={section.title}>
                  {renderSectionTitle(section)}
                  {section.items.map((item) => {
                    const index = result.itemIndex++
                    const rest = getItemProps({ item, index })
                    const onClick = rest.onClick
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    rest.onClick = (...args: any[]) => {
                      onClick?.(...args)
                      onSelect(item)
                      closeMenu()
                    }

                    return renderItem({
                      item,
                      inputValue,
                      isHighlighted: highlightedIndex === index,
                      ...rest,
                    })
                  })}
                </div>,
              )
              return result
            },
            { sections: [], itemIndex: 0 } as ReducedItems,
          ).sections}
      </div>
    </div>
  )
}
