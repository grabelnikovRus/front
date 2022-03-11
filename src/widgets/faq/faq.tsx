import cn from 'classnames'
import { useState, VFC } from 'react'

import { isTextField, isStackField, WidgetFields } from '@/modules/widgets'

import styles from './faq.module.scss'

export interface FaqQuestionProps {
  field: WidgetFields
  isOpen: boolean
  onOpen: () => void
  onAnalyticEvent?: () => void
}

export interface FaqProps {
  fields: WidgetFields
  onAnalyticEvent?: () => void
}

export const FaqItem: VFC<FaqQuestionProps> = ({ field, isOpen, onOpen, onAnalyticEvent }) => {
  const [openAnswer, setOpenAnswer] = useState(false)
  const { question, answer } = field

  const onClickItem = () => {
    setOpenAnswer((prev) => !prev)
    onOpen()
    onAnalyticEvent?.()
  }

  if (!isTextField(question) || !isTextField(answer)) return null

  return (
    <li
      className={cn(styles.faq_item, {
        [styles['faq_item--open']]: openAnswer,
      })}
      onClick={onClickItem}
    >
      <h6
        className={cn(styles.faq_question, {
          [styles['faq_question--open']]: openAnswer,
        })}
      >
        {question.value}
      </h6>
      <button
        className={cn(styles.faq_btn, {
          [styles['faq_btn--open']]: openAnswer,
        })}
      />
      <div
        dangerouslySetInnerHTML={{ __html: answer.value }}
        className={cn(styles.faq_answer, styles.inner_answer, {
          [styles['faq_answer--open']]: openAnswer,
          [styles['faq_answer--no-border']]: isOpen,
        })}
      />
    </li>
  )
}

export const Faq: VFC<FaqProps> = ({ fields: { heading, questions }, onAnalyticEvent }) => {
  const title = isTextField(heading) ? heading.value : undefined
  const list = isStackField(questions) ? questions.stack : []
  const [listOpenItems, setListOpenItems] = useState<{ [key: string]: boolean }>(
    new Array(list.length).fill(null).reduce((acc, _, i) => ({ ...acc, [i]: false }), {}),
  )

  const onOpen = (index: number) => {
    if (index === 0) return
    setListOpenItems((prevList) => ({ ...prevList, [index - 1]: !prevList[index - 1] }))
  }

  return (
    <div className={styles.faq}>
      {title && <h2 className={styles.faq_title}>{title}</h2>}
      <ul className={styles.faq_list}>
        {list.map((field, index) => (
          <FaqItem
            field={field}
            onOpen={() => onOpen(index)}
            isOpen={listOpenItems[index]}
            key={isTextField(field.answer) ? field.answer.value : index}
            onAnalyticEvent={onAnalyticEvent}
          />
        ))}
      </ul>
    </div>
  )
}
