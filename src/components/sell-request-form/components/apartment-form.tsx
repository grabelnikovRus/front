/* eslint-disable max-lines */

import cn from 'classnames'
import { useMemo, VFC, useState } from 'react'
import { FormRenderProps } from 'react-final-form'

import { IAddressFormData } from '@/components/sell-request-form/sell-request-form.types'
import { SuggestAddress } from '@/components/suggest-address/suggest-address'
import { Field, FieldArray } from '@/lib/forms'
import { checkCoords } from '@/modules/coords'
import { isTextField, WidgetFields } from '@/modules/widgets'
import { Button, InputBox, Dropdown, Tooltip } from '@/uikit'
import { CheckboxGroup } from '@/uikit/filter/checkbox-group/checkbox-group'
import { InputText } from '@/uikit/filter/input-text/input-text'
import { RadioGroup } from '@/uikit/radio-group/radio-group'

import styles from './apartment-form.module.scss'

import { analyticEvents } from '../analytic-events'
import { checklistSettings } from '../checklist-settings'

export interface ApartmentFormValues {
  address: string
  area: number
  floor: number
  isInOperation: ['true' | 'false']
  isOwnership?: ['true' | 'false']
  isTransferAcceptanceCertificate?: ['true' | 'false']
  isMortgage: ['true' | 'false']
  objectType: ['flat' | 'apartment']
  price: number
  renovationType: ['fresh' | 'cosmetic' | 'none']
  renovationYear?: number
  roomType: ['0' | '1' | '2' | '3']
  peculiarities?: string[]
  releaseYear?: number
  releaseQuarter?: '1' | '2' | '3' | '4'
  developer?: string[]
}

export type ApartmentFormProps = FormRenderProps<ApartmentFormValues> & {
  settings: typeof checklistSettings
  fields: WidgetFields
}

export const ApartmentForm: VFC<ApartmentFormProps> = ({
  handleSubmit,
  submitting,
  settings,
  submitError,
  values,
  fields,
  errors,
}) => {
  const { address_placeholder, titleFirstStage, textBtnFirstStage } = fields
  const placeholder = isTextField(address_placeholder) ? address_placeholder.value : ''
  const title = isTextField(titleFirstStage) ? titleFirstStage.value : ''
  const textBtn = isTextField(textBtnFirstStage) ? textBtnFirstStage.value : ''
  const [isDisabledForm, setIsDisabledForm] = useState(false)

  const validateAddress = async (value: IAddressFormData) => {
    setIsDisabledForm(false)

    try {
      if (!value.lon || !value.lat) {
        return
      }

      const { body } = await checkCoords({
        longitude: value?.lon,
        latitude: value?.lat,
      })
      const { typeOfZone } = body

      if (typeOfZone === 'notBuyoutZone') {
        setIsDisabledForm(true)
        return
      }
    } catch (err) {
      setIsDisabledForm(false)
    }
  }

  const validateQuarter = useMemo(() => {
    const quarter = Number(values.releaseQuarter ?? 0)
    const year = Number(values.releaseYear ?? 0)

    if (!values.releaseQuarter || !values.releaseYear) return undefined
    const now = new Date()
    const _month = now.getMonth()
    const _year = now.getFullYear()

    if (year < _year) {
      return undefined
    }

    if (year === _year) {
      const quarters = [2, 5, 8, 11]
      const validation = quarters[quarter - 1] >= _month

      return validation ? undefined : 'Квартал не может быть меньше текущего'
    }

    return undefined
  }, [values?.releaseQuarter, values?.releaseYear])

  const isNotPeculiarities = !values?.peculiarities || values.peculiarities.length < 2
  const isNotFire = !values?.peculiarities || !values.peculiarities.includes('fire')

  return (
    <form className={styles.form} method="dialog" onSubmit={handleSubmit}>
      <div className={cn('container', styles.form_wrapper)}>
        <div className={styles.form_first_block}>
          <h1 className={styles.form_title} dangerouslySetInnerHTML={{ __html: title }} />
          <div className={styles.form_autosagest}>
            <Field
              name="address"
              validation={settings.address.validation}
              render={({ input, meta }) => (
                <>
                  <SuggestAddress
                    addressData={{ address: input.value }}
                    placeholder={placeholder}
                    onSelect={(value) => {
                      validateAddress(value)
                      input.onChange(value.address)
                      analyticEvents.address()
                    }}
                    error={meta.submitFailed && (meta.error || meta.submitError)}
                  />
                  {isDisabledForm && (
                    <div className={styles.form_error}>
                      К сожалению, мы не выкупаем квартиры по данному адресу. Объект находится вне
                      зоны оценки
                    </div>
                  )}
                </>
              )}
            />
          </div>
          <div>
            <FieldArray
              name="objectType"
              validation={settings.objectType.validation}
              render={(props) => (
                <RadioGroup
                  theme="buttons"
                  options={settings.objectType.options}
                  layout={settings.objectType.layout}
                  label={settings.objectType.title}
                  onClick={(value) => analyticEvents.objectType(value)}
                  {...props}
                />
              )}
            />
          </div>
          <div>
            <FieldArray
              name="roomType"
              validation={settings.roomType.validation}
              render={(props) => (
                <CheckboxGroup
                  {...props}
                  {...settings.roomType}
                  label="Комнат"
                  theme="opaque"
                  disabledRepeatedClick
                  onClick={(value) => analyticEvents.roomType(value)}
                />
              )}
            />
          </div>
          <div className={styles.form_area_floor}>
            <Field
              name="area"
              mask="decimal"
              validation={settings.area.validation}
              render={({ input, meta }) => (
                <InputBox
                  htmlFor="area"
                  label="Площадь"
                  unit="м²"
                  tooltip={
                    <Tooltip
                      title="Площадь квартиры"
                      body="Укажите площадь, которая обозначена в документах. Балконы и лоджии не учитываются."
                    />
                  }
                  theme="opaque"
                  error={meta.submitFailed && (meta.error || meta.submitError)}
                >
                  <InputText
                    {...input}
                    placeholder={settings.area.placeholder}
                    id="area"
                    type="text"
                    inputMode="decimal"
                    onBlur={analyticEvents.area}
                  />
                </InputBox>
              )}
            />
            <Field
              name="floor"
              mask="floor"
              validation={settings.floor.validation}
              render={({ input, meta }) => (
                <InputBox
                  htmlFor="floor"
                  label="Этаж"
                  theme="opaque"
                  error={meta.submitFailed && (meta.error || meta.submitError)}
                >
                  <InputText
                    {...input}
                    placeholder={settings.floor.placeholder}
                    id="floor"
                    type="text"
                    inputMode="numeric"
                    onBlur={analyticEvents.floor}
                  />
                </InputBox>
              )}
            />
          </div>
          <FieldArray
            name="isInOperation"
            validation={settings.isInOperation.validation}
            render={(props) => (
              <RadioGroup
                theme="switcher"
                options={settings.isInOperation.options}
                layout={settings.isInOperation.layout}
                label={settings.isInOperation.title}
                onClick={(value) => analyticEvents.isInOperation(value)}
                {...props}
              />
            )}
          />
          {values?.isInOperation?.[0] === 'true' && (
            <>
              <FieldArray
                name="isOwnership"
                validation={settings.isOwnership.validation}
                render={(props) => (
                  <RadioGroup
                    theme="switcher"
                    options={settings.isOwnership.options}
                    layout={settings.isOwnership.layout}
                    label={settings.isOwnership.title}
                    onClick={(value) => analyticEvents.isOwnership(value)}
                    {...props}
                  />
                )}
              />
              {values?.isOwnership?.[0] === 'false' ? (
                <FieldArray
                  name="isTransferAcceptanceCertificate"
                  validation={settings.isTransferAcceptanceCertificate.validation}
                  render={(props) => (
                    <RadioGroup
                      theme="switcher"
                      hideError={values?.isTransferAcceptanceCertificate?.[0] === 'true'}
                      options={settings.isTransferAcceptanceCertificate.options}
                      layout={settings.isTransferAcceptanceCertificate.layout}
                      label={settings.isTransferAcceptanceCertificate.title}
                      onClick={(value) => analyticEvents.isTransferAcceptanceCertificate(value)}
                      {...props}
                    />
                  )}
                />
              ) : (
                <div className={styles.hide_on_mobile} />
              )}
            </>
          )}
          {values?.isInOperation?.[0] === 'true' &&
            values?.isOwnership?.[0] === 'false' &&
            values?.isTransferAcceptanceCertificate?.[0] === 'true' && (
              <div className={styles.error_block}>
                Мы не выкупаем квартиры, если акт приема-передачи подписан, а право собственности
                еще не оформлено. Вы сможете оценить эту квартиру после регистрации
              </div>
            )}
          {values?.isInOperation?.[0] === 'false' && (
            <>
              <Field
                name="releaseYear"
                mask="year"
                validation={settings.releaseYear.validation}
                render={({ input, meta }) => (
                  <InputBox
                    htmlFor="releaseYear"
                    label="Год сдачи"
                    theme="opaque"
                    error={meta.submitFailed && (meta.error || meta.submitError)}
                  >
                    <InputText
                      {...input}
                      placeholder={settings.releaseYear.placeholder}
                      id="releaseYear"
                      type="text"
                      inputMode="numeric"
                      onBlur={analyticEvents.releaseYear}
                    />
                  </InputBox>
                )}
              />
              <Field
                name="releaseQuarter"
                validation={settings.releaseQuarter.validation}
                render={(props) => (
                  <Dropdown
                    items={settings.releaseQuarter.options}
                    label={settings.releaseQuarter.title}
                    onChange={(value) => {
                      props.input.onChange(value)
                      analyticEvents.releaseQuarter()
                    }}
                    value={props.input.value}
                    renderSelectedValue={(value) => value.name || ''}
                    theme="roundBorders"
                    error={validateQuarter}
                  />
                )}
              />
            </>
          )}
          <Field
            name="price"
            mask="price"
            validation={settings.price.validation}
            render={({ input, meta }) => (
              <InputBox
                htmlFor="price"
                label="Желаемая стоимость"
                unit="₽"
                theme="opaque"
                error={meta.submitFailed && (meta.error || meta.submitError)}
              >
                <InputText
                  {...input}
                  placeholder={settings.price.placeholder}
                  id="price"
                  type="text"
                  inputMode="numeric"
                  onBlur={analyticEvents.price}
                />
              </InputBox>
            )}
          />
          {((values?.isInOperation?.[0] === 'true' && isNotPeculiarities && isNotFire) ||
            !values?.isInOperation) && (
            <div className={styles.form_renovation}>
              <FieldArray
                name="renovationType"
                validation={settings.renovationType.validation}
                render={(props) => (
                  <CheckboxGroup
                    theme="opaque"
                    options={settings.renovationType.options}
                    layout={settings.renovationType.layout}
                    label={settings.renovationType.title}
                    strategy={settings.renovationType.strategy}
                    onClick={(value) => analyticEvents.renovationType(value)}
                    {...props}
                  />
                )}
              />
            </div>
          )}
          {values?.isInOperation?.[0] === 'true' &&
            isNotPeculiarities &&
            isNotFire &&
            (values?.renovationType?.[0] === 'fresh' ||
              values?.renovationType?.[0] === 'cosmetic') && (
              <>
                <Field
                  name="renovationYear"
                  mask="year"
                  validation={settings.renovationYear.validation}
                  render={({ input, meta }) => (
                    <InputBox
                      htmlFor="renovationYear"
                      label={settings.renovationYear.title}
                      theme="opaque"
                      error={meta.submitFailed && (meta.error || meta.submitError)}
                    >
                      <InputText
                        {...input}
                        placeholder={settings.renovationYear.placeholder}
                        id="renovationYear"
                        type="text"
                        inputMode="numeric"
                        onBlur={analyticEvents.renovationYear}
                      />
                    </InputBox>
                  )}
                />
                <div className={styles.hide_on_mobile} />
              </>
            )}
        </div>
        <div className={styles.form_second_block}>
          <h2 className={cn(styles.form_subtitle, styles.second_block_subtitle)}>Ипотека</h2>
          <div className={cn(styles.form_text, styles.second_block_text)}>
            Сообщите, если квартира в ипотеке. Это выяснится на этапе юридической проверки. При
            указании недостоверной информации цена на квартиру может быть снижена
          </div>
          <FieldArray
            name="isMortgage"
            validation={settings.isMortgage.validation}
            render={(props) => (
              <RadioGroup
                theme="switcher"
                options={settings.isMortgage.options}
                layout={settings.isMortgage.layout}
                label={settings.isMortgage.title}
                onClick={(value) => analyticEvents.isMortgage(value)}
                {...props}
              />
            )}
          />
        </div>
        {values?.isInOperation?.[0] === 'false' && (
          <div>
            <h2 className={styles.form_subtitle}>Застройщик</h2>
            <div className={styles.form_text}>
              Мы выкупаем квартиры в несданных домах только у следующих застройщиков:
            </div>
            <FieldArray
              name="developer"
              validation={settings.developer.validation}
              render={(props) => (
                <RadioGroup
                  theme="list"
                  hideError={values?.developer?.[0] === 'other'}
                  options={settings.developer.options}
                  layout={settings.developer.layout}
                  onClick={(value) => analyticEvents.developer(value)}
                  {...props}
                />
              )}
            />
            {values?.developer?.[0] === 'other' && (
              <div className={styles.error_block}>
                Мы выкупаем квартиры в несданных домах только у следующих застройщиков: ГК ПИК,
                Самолёт, А 101, Инград и Level Group
              </div>
            )}
          </div>
        )}
        {values?.isInOperation?.[0] === 'true' && (
          <div>
            <h2 className={styles.form_subtitle}>Особенности</h2>
            <div className={styles.form_text}>
              Максимально честно укажите особенности квартиры, это будет проверено после
              заключения договора и повлияет на расходы на ремонт, которые вы вынуждены будете
              компенсировать
            </div>
            <FieldArray
              name="peculiarities"
              validation={settings.peculiarities.validation}
              render={(props) => (
                <CheckboxGroup
                  {...props}
                  {...settings.peculiarities}
                  label=""
                  theme="classic"
                  onClick={analyticEvents.peculiarities}
                />
              )}
            />
          </div>
        )}
        <div className={styles.form_button}>
          <Button
            type="submit"
            size="full"
            disabled={
              isDisabledForm || submitting || (submitError && Object.keys(submitError).length > 0)
            }
            externalStyles={styles.form_submit}
            onClick={() => analyticEvents.nextFirstStep(errors)}
          >
            {textBtn}
          </Button>
        </div>
      </div>
    </form>
  )
}
