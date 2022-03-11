import cn from 'classnames'
import { VFC } from 'react'

import { WidgetFields, isTextField, isStackField } from '@/modules/widgets'
import { Container } from '@/uikit'

import styles from './conditions-list.module.scss'
import { getIcons } from './get-icons'

export interface ConditionsListProps {
  fields: WidgetFields
}

export const ConditionsList: VFC<ConditionsListProps> = ({ fields }) => {
  const { firstTitle, firstList, secondTitle, secondList, thirdTitle, thirdList } = fields

  const firstHeading = isTextField(firstTitle) ? firstTitle.value : ''
  const firstArrya = isStackField(firstList) ? firstList.stack : []

  const secondHeading = isTextField(secondTitle) ? secondTitle.value : ''
  const secondArrya = isStackField(secondList) ? secondList.stack : []

  const thirdHeading = isTextField(thirdTitle) ? thirdTitle.value : ''
  const thirdArrya = isStackField(thirdList) ? thirdList.stack : []

  const isLessFiveItem = thirdArrya.length < 5

  return (
    <section className={styles.conditions}>
      <div className={styles.first}>
        <Container>
          <h5
            className={styles.conditions_title}
            dangerouslySetInnerHTML={{ __html: firstHeading }}
          />
          <ul className={styles.conditions_list}>
            {firstArrya.map((el, index) => {
              const description = isTextField(el.title) ? el.title.value : ''
              return (
                <li key={description} className={styles.conditions_item}>
                  <span className={styles.conditions_icon}>{index + 1}</span>
                  <span
                    className={styles.conditions_description}
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </li>
              )
            })}
          </ul>
        </Container>
      </div>
      <div className={styles.second}>
        <Container>
          <h5
            className={styles.conditions_title}
            dangerouslySetInnerHTML={{ __html: secondHeading }}
          />
          <ul className={styles.conditions_list}>
            {secondArrya.map((el, i) => {
              const description = isTextField(el.title) ? el.title.value : ''
              const icon = isTextField(el.icon) ? el.icon.value : ''
              return (
                <li key={description} className={styles.conditions_item}>
                  <span className={styles.conditions_icon}>{getIcons(icon)}</span>
                  <span
                    className={styles.conditions_description}
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </li>
              )
            })}
          </ul>
        </Container>
      </div>
      <div
        className={cn(styles.third, {
          [styles.third___less_five]: isLessFiveItem,
        })}
      >
        <Container>
          <h5
            className={styles.conditions_title}
            dangerouslySetInnerHTML={{ __html: thirdHeading }}
          />
          <ul className={styles.conditions_list}>
            {thirdArrya.map((el, i) => {
              const description = isTextField(el.title) ? el.title.value : ''
              const icon = isTextField(el.icon) ? el.icon.value : ''
              return (
                <li key={description} className={styles.conditions_item}>
                  <span className={styles.conditions_icon}>{getIcons(icon)}</span>
                  <span
                    className={styles.conditions_description}
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </li>
              )
            })}
          </ul>
        </Container>
      </div>
    </section>
  )
}
