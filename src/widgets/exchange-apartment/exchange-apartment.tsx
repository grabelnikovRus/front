import { VFC } from 'react'

import { isStackField, isTextField, WidgetFields } from '@/modules/widgets'
import { Button } from '@/uikit'

import { ExchangeApartmentSlider } from './components/exchange-apartment-slider'
import styles from './exchange-apartment.module.scss'

export interface ExchangeApartmentProps {
  fields: WidgetFields
}

export const ExchangeApartment: VFC<ExchangeApartmentProps> = ({ fields }) => {
  const {
    firstTitle,
    secondTitle,
    thirdTitle,
    firstList,
    secondList,
    thirdList,
    mainTitle,
    subTitle,
  } = fields

  const title1 = isTextField(firstTitle) ? firstTitle.value : ''
  const title2 = isTextField(secondTitle) ? secondTitle.value : ''
  const title3 = isTextField(thirdTitle) ? thirdTitle.value : ''

  const list1 = isStackField(firstList) ? firstList.stack : []
  const list2 = isStackField(secondList) ? secondList.stack : []
  const list3 = isStackField(thirdList) ? thirdList.stack : []

  const titles = [title1, title2, title3]
  const lists = [list1, list2, list3]

  const onClickBtn = () => window.scrollTo(0, 0)

  return (
    <section className={styles.container}>
      <div className={styles.service}>
        <h4 className={styles.main_title}>{isTextField(mainTitle) ? mainTitle.value : null}</h4>
        <h5 className={styles.sub_title}>{isTextField(subTitle) ? subTitle.value : null}</h5>
        <ExchangeApartmentSlider lists={lists} titles={titles} />
        <Button externalStyles={styles.button} onClick={onClickBtn}>
          Оценить квартиру
        </Button>
      </div>
    </section>
  )
}
