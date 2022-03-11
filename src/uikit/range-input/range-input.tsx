import { VFC } from 'react'

import styles from './range-input.module.scss'

import { InputText, InputTextProps } from '../filter/input-text/input-text'

export interface RangeInputProps extends InputTextProps {
  label?: string
  dynamicLabel?: string
  firstText?: string
  secondText?: string
  disabledMinus?: boolean
  disabledPlus?: boolean
  onClickPlus: () => void
  onClickMinus: () => void
}

export const RangeInput: VFC<RangeInputProps> = ({
  label,
  dynamicLabel,
  firstText,
  secondText,
  disabledMinus = false,
  disabledPlus = false,
  onClickMinus,
  onClickPlus,
  ...rest
}) => (
  <div className={styles.container}>
    <label htmlFor={rest.id} className={styles.label}>
      {label && <span className={styles.label_text}>{label}</span>}
      {dynamicLabel && <span className={styles.label_dynamic}>{dynamicLabel}</span>}
    </label>
    <div className={styles.input}>
      <InputText
        className={styles.input_value}
        textHead={
          <button
            className={styles.input_minus}
            onClick={onClickMinus}
            disabled={disabledMinus}
          />
        }
        textTail={
          <button className={styles.input_plus} onClick={onClickPlus} disabled={disabledPlus} />
        }
        {...rest}
      />
    </div>
    <div className={styles.footer}>
      {firstText && <span>{firstText}</span>}
      {secondText && <span>{secondText}</span>}
    </div>
  </div>
)
