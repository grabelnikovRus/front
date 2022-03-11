import cn from 'classnames'
import Link from 'next/link'
import { useState, VFC } from 'react'
import { useQuery } from 'react-query'

import { Promo } from '@/api'
import { clamp, round } from '@/lib/number'
import { useDebounce } from '@/lib/use-debounce'
import { getApartmentLoan } from '@/modules/apartment/'
import { isTextField, WidgetFields } from '@/modules/widgets'
import { FormattingNumbers, Button, RangeInput } from '@/uikit'

import { analyticEvents } from './analytic-events'
import styles from './calculator.module.scss'

export interface CalculatorProps {
  fields: WidgetFields
  apartmentId: number
  price: number
  discountRate: number | null
  userHasActiveDeals: boolean
}

const MIN_AMOUNT_PERCENT = 0.2
const MAX_AMOUNT_PERCENT = 0.8
const DEFAULT_AMOUNT_PERCENT = MIN_AMOUNT_PERCENT

const MIN_TIME = 3
const MAX_TIME = 30
const DEFAULT_TIME = 20

const STEP_AMOUNT = 100000
const STEP_TIME = 1

const getDiscountPrice = (price: number, discount: number) => price - price * discount

const getPriceToString = (value: number) =>
  value < 1e6 ? `${value.toString().slice(0, 3)} тыс` : `${(value / 1e6).toFixed(1)} млн`

const getPercent = (value: number, minValue: number, price: number) =>
  Math.round(((Number.isNaN(value) ? minValue : value) * 100) / price)

export const Calculator: VFC<CalculatorProps> = ({
  fields,
  apartmentId,
  price,
  discountRate,
  userHasActiveDeals,
}) => {
  const [toggle, setToggle] = useState<'cash' | 'loan'>('loan')

  const haveCashOption = discountRate !== null

  const minAmount = round(price * MIN_AMOUNT_PERCENT)
  const maxAmount = round(price * MAX_AMOUNT_PERCENT)
  const defaultAmount = round(price * DEFAULT_AMOUNT_PERCENT)

  const [amount, setAmount] = useState(defaultAmount)
  const [amountValue, setAmountValue] = useState(String(defaultAmount))

  const [time, setTime] = useState(DEFAULT_TIME)
  const [timeValue, setTimeValue] = useState(String(DEFAULT_TIME))

  const debouncedAmount = useDebounce(amount)
  const debouncedTime = useDebounce(time)

  const { textLoan, textCash, textLinkLoan, textLinkCash, linkLoan, linkCash } = fields
  const loanDescription = isTextField(textLoan) ? textLoan.value : ''
  const cashDescription = isTextField(textCash) ? textCash.value : ''
  const nameLinkLoan = isTextField(textLinkLoan) ? textLinkLoan.value : ''
  const nameLinkCash = isTextField(textLinkCash) ? textLinkCash.value : ''
  const pathLinkLoan = isTextField(linkLoan) ? linkLoan.value : ''
  const pathLinkCash = isTextField(linkCash) ? linkCash.value : ''

  const resetState = () => {
    setAmount(defaultAmount)
    setAmountValue(String(defaultAmount))
    setTime(DEFAULT_TIME)
    setTimeValue(String(DEFAULT_TIME))
  }

  const { data: loan, isError } = useQuery(
    ['loan', apartmentId, debouncedAmount, debouncedTime],
    () =>
      getApartmentLoan(
        apartmentId,
        debouncedAmount,
        debouncedTime,
        userHasActiveDeals ? Promo.ExMax : Promo.Default,
      ),
    { keepPreviousData: true, retry: false, onError: resetState },
  )

  const handleAmountChange = (value?: number | string) => {
    let numAmount = value ?? minAmount
    if (value && value >= price * MAX_AMOUNT_PERCENT) {
      numAmount = price * MAX_AMOUNT_PERCENT
      setAmount(clamp(numAmount, minAmount, maxAmount))
      setAmountValue(String(numAmount - 1))
    } else {
      setAmount(clamp(Number(numAmount), minAmount, maxAmount))
      setAmountValue(String(value) ?? '')
    }
  }

  const handleAmountBlur = () => {
    setAmountValue(String(amount))
    analyticEvents.contribution()
  }

  const handleTimeChange = (value?: number) => {
    const numTime = !value || value < MIN_TIME || value > MAX_TIME ? DEFAULT_TIME : value
    setTime(numTime)
    setTimeValue(String(value))
  }

  const handleTimeBlur = () => {
    setTimeValue(String(time))
    analyticEvents.time()
  }

  if (loan === undefined && !isError) {
    return null
  }

  return (
    <div className={styles.calculator}>
      <header className={styles.calculator_header}>
        <h1 className={styles.calculator_title}>Калькулятор стоимости</h1>
        {haveCashOption && (
          <div className={styles.calculator_btn_group}>
            <Button
              className={cn(styles.calculator_btn, {
                [styles.calculator_btn___active]: toggle === 'loan',
              })}
              onClick={() => setToggle('loan')}
            >
              Ипотека
            </Button>
            <Button
              className={cn(styles.calculator_btn, {
                [styles.calculator_btn___active]: toggle === 'cash',
              })}
              onClick={() => {
                setToggle('cash')
                analyticEvents.toggleTabs()
              }}
            >
              Свои средства
            </Button>
          </div>
        )}
      </header>
      {toggle === 'loan' && (
        <>
          <div className={styles.calculator_price}>
            <FormattingNumbers value={price} mode="money" />
          </div>
          <div className={styles.calculator_container}>
            <div className={styles.calculator_form}>
              <RangeInput
                id="contribution"
                name="contribution"
                inputMode="numeric"
                mode="rangeInput"
                label="Первоначальный взнос"
                dynamicLabel={`${getPercent(Number(amountValue), minAmount, price)}%`}
                suffix=" ₽"
                type="text"
                firstText={getPriceToString(minAmount)}
                secondText={getPriceToString(maxAmount)}
                onChange={handleAmountChange}
                onBlur={handleAmountBlur}
                onFocus={() => null}
                onClickMinus={() => {
                  handleAmountChange(Number(amountValue) - STEP_AMOUNT)
                  analyticEvents.contributionOnClickMinus()
                }}
                onClickPlus={() => {
                  handleAmountChange(Number(amountValue) + STEP_AMOUNT)
                  analyticEvents.contributionOnClickPlus()
                }}
                disabledMinus={Number(amountValue) <= minAmount}
                disabledPlus={Number(amountValue) >= maxAmount}
                value={amountValue}
                thousandSeparator
              />
              <RangeInput
                id="time"
                name="time"
                label="Срок кредита"
                firstText={`${MIN_TIME} года`}
                secondText={`${MAX_TIME} лет`}
                onChange={handleTimeChange}
                onBlur={handleTimeBlur}
                onFocus={() => null}
                onClickMinus={() => {
                  handleTimeChange(Number(timeValue) - STEP_TIME)
                  analyticEvents.timeOnClickMinus()
                }}
                onClickPlus={() => {
                  handleTimeChange(Number(timeValue) + STEP_TIME)
                  analyticEvents.timeOnClickPlus()
                }}
                disabledMinus={Number(timeValue) <= MIN_TIME}
                disabledPlus={Number(timeValue) >= MAX_TIME}
                value={timeValue}
              />
              <RangeInput
                id="payment"
                name="payment"
                label="Ежемесячный платеж"
                onChange={() => null}
                onBlur={() => null}
                onFocus={() => null}
                onClickMinus={() => {
                  handleTimeChange(Number(timeValue) + STEP_TIME)
                  analyticEvents.paymentOnClickMinus()
                }}
                onClickPlus={() => {
                  handleTimeChange(Number(timeValue) - STEP_TIME)
                  analyticEvents.paymentOnClickPlus()
                }}
                disabledMinus={Number(timeValue) >= MAX_TIME}
                disabledPlus={Number(timeValue) <= MIN_TIME}
                value={String(loan?.payment ?? 0)}
                disabled
              />
            </div>
            <div className={styles.inform}>
              <section className={styles.table}>
                <span className={styles.table_text}>Стоимость квартиры</span>
                <span className={styles.table_price}>
                  <FormattingNumbers value={price} mode="money" />
                </span>
              </section>
              <section className={styles.table}>
                <div className={styles.table_percent}>
                  <span className={styles.table_text}>Ставка</span>
                  {loan?.rate && (
                    <span className={styles.table_value}>{`${(loan?.rate * 100).toFixed(
                      1,
                    )} %`}</span>
                  )}
                </div>
                <div className={styles.table_sum}>
                  <span className={styles.table_text}>Сумма кредита</span>
                  <span className={styles.table_value}>
                    <FormattingNumbers value={price - Number(amountValue)} mode="money" />
                  </span>
                </div>
              </section>
              <div className={styles.inform_text}>{loanDescription}</div>
              <Link href={pathLinkLoan}>
                <a className={styles.inform_link} target="_blank">
                  {nameLinkLoan}
                </a>
              </Link>
            </div>
          </div>
        </>
      )}
      {toggle === 'cash' && (
        <div className={styles.cash}>
          <section className={styles.cash_discount}>
            <span className={styles.cash_price}>
              <FormattingNumbers value={price} mode="money" />
            </span>
            <span className={styles.cash_new_price}>
              <FormattingNumbers
                value={getDiscountPrice(price, discountRate ?? 0)}
                mode="money"
              />
            </span>
            <span className={styles.cash_percent}>{`Скидка ${(discountRate || 0) * 100}%`}</span>
          </section>
          <div className={styles.cash_text}>{cashDescription}</div>
          <Link href={pathLinkCash}>
            <a className={styles.cash_link} target="_blank">
              {nameLinkCash}
            </a>
          </Link>
        </div>
      )}
    </div>
  )
}
