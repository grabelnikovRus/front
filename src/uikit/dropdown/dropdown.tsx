import cn from 'classnames'
import { useSelect } from 'downshift'
import { ReactNode, VFC } from 'react'

import { useBodyScrollLock } from '@/lib/use-body-scroll-lock'
import { Label } from '@/uikit/label/label'
import { SvgArrow, SvgCheck } from '@/uikit/svg'

import styles from './dropdown.module.scss'
import { useListFade } from './use-list-fade'

type Item = {
  id: string
  name: string
}

export interface DropdownProps {
  items: Item[]
  onChange: (id: string) => void
  value: string
  label?: string
  renderSelectedValue?: (item: Item) => string
  renderButton?: (props: { className: string }) => ReactNode
  size?: 'normal' | 'slim'
  theme?: 'white' | 'roundBorders' | 'smallScreenIcon'
  error?: string | undefined
}

const FADE_HEIGHT = 116

export const Dropdown: VFC<DropdownProps> = ({
  items,
  onChange,
  value,
  label,
  renderSelectedValue = (value) => value.name,
  renderButton,
  size,
  theme = 'white',
  error,
}) => {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    selectedItem: items.find(({ id }) => id === value),
    itemToString: (item) => item?.name ?? '',
    onSelectedItemChange: (props) => {
      onChange(props.selectedItem?.id ?? items[0].id)
    },
  })

  const [listRef, fadeStyles] = useListFade(FADE_HEIGHT, isOpen)
  const selectClassName = cn(styles.dropdown, {
    [styles.dropdown___white]: theme === 'white',
    [styles.dropdown___round_borders]: theme === 'roundBorders',
    [styles.dropdown___small_screen_icon]: theme === 'smallScreenIcon',
  })

  useBodyScrollLock(isOpen, listRef)

  return (
    <div className={selectClassName}>
      {label && (
        <Label {...getLabelProps()} screenReadersOnly>
          {label}
        </Label>
      )}
      <div className={styles.dropdown_button___icon}>
        {renderButton?.({ className: styles.dropdown_icon_render, ...getToggleButtonProps() })}
      </div>
      <button
        type="button"
        className={cn(styles.dropdown_button, {
          [styles.dropdown_button___open]: isOpen,
          [styles.dropdown_button___size_slim]: size === 'slim',
          [styles.dropdown_button___error]: error,
        })}
        {...getToggleButtonProps()}
      >
        <div
          className={styles.dropdown_selected_text}
          dangerouslySetInnerHTML={{
            __html: renderSelectedValue(selectedItem ?? items[0]) || '',
          }}
        />
        <SvgArrow className={styles.dropdown__icon} />
      </button>
      {error && <div className={styles.dropdown_error}>{error}</div>}
      <div
        className={cn(styles.dropdown_menu, { [styles.dropdown_menu___open]: isOpen })}
        style={fadeStyles}
        {...getMenuProps()}
      >
        <ul
          className={cn(styles.dropdown_list, { [styles.dropdown_list___open]: isOpen })}
          ref={listRef}
        >
          {isOpen &&
            items.map((item, index) => (
              <li
                key={item.id}
                className={cn(styles.dropdown_item, {
                  [styles.dropdown_item___highlighted]: highlightedIndex === index,
                  [styles.dropdown_item___selected]: value === item.id,
                })}
                {...getItemProps({ item, index })}
              >
                {item.name}
                {value === item.id && <SvgCheck />}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
