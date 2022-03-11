import cn from 'classnames'
import Link from 'next/link'
import { Fragment, VFC } from 'react'

import { isStackField, isTextField, WidgetFields } from '@/modules/widgets'
import { Container } from '@/uikit'

import { getIcon } from './get-icon'
import styles from './legal-purity.module.scss'

export interface LegalPurityProps {
  fields: WidgetFields
  linkOn?: 'primary' | 'secondary'
  isHaveNewText?: boolean
}

const DEFAULT_LINK = '/guarantee-primary'

export const LegalPurity: VFC<LegalPurityProps> = ({
  fields,
  linkOn = 'primary',
  isHaveNewText = false,
}) => {
  const { buttonText, buttonIcon, linkPrimary, linkSecondary, features } = fields

  const list = isStackField(features) ? features.stack : []
  const text = isTextField(buttonText) ? buttonText.value : null
  const icon = isTextField(buttonIcon) ? buttonIcon.value : null
  const primary = isTextField(linkPrimary) ? linkPrimary.value : DEFAULT_LINK
  const secondary = isTextField(linkSecondary) ? linkSecondary.value : DEFAULT_LINK

  const Button = (
    <Link href={linkOn === 'primary' ? primary : secondary}>
      <a className={cn(styles.legal_item, styles.legal_link)} target="_blank">
        <span className={styles.legal_icon}>{getIcon(icon)}</span>
        <span className={styles.legal_text}>{text}</span>
      </a>
    </Link>
  )

  return (
    <Container>
      <section className={styles.legal}>
        {list.map((el, index) => {
          const iconItem = isTextField(el.icon) ? el.icon.value : null
          const textItem = isTextField(el.title) ? el.title.value : ''

          if (index === 1) {
            return (
              <Fragment key={textItem || index}>
                <div className={styles.legal_item}>
                  <span className={styles.legal_icon}>{getIcon(iconItem)}</span>
                  {isHaveNewText ? (
                    <span className={styles.legal_text}>В собственности у физ лица</span>
                  ) : (
                    <span
                      className={styles.legal_text}
                      dangerouslySetInnerHTML={{ __html: textItem }}
                    />
                  )}
                </div>
              </Fragment>
            )
          }
          return (
            <Fragment key={textItem || index}>
              <div className={styles.legal_item}>
                <span className={styles.legal_icon}>{getIcon(iconItem)}</span>
                <span
                  className={styles.legal_text}
                  dangerouslySetInnerHTML={{ __html: textItem }}
                />
              </div>
              {index === 0 && Button}
            </Fragment>
          )
        })}
      </section>
    </Container>
  )
}
