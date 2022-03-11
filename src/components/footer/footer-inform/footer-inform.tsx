import { VFC } from 'react'

import { config } from '@/config'
import { interpolate } from '@/lib/string'
import { trackEvent } from '@/lib/tracking'
import { isTextField, isStackField, WidgetFields } from '@/modules/widgets'
import { Container } from '@/uikit'

import styles from './footer-inform.module.scss'

export interface FooterInfromProps {
  fields?: WidgetFields
}

export const FooterInform: VFC<FooterInfromProps> = ({ fields }) => {
  const list = fields && isStackField(fields.cards) ? fields.cards.stack : []

  if (list.length === 0) return null

  const onClickBtn = () => {
    trackEvent({
      category: 'Developers',
      label: 'Developers button',
      name: 'Clicked on the Developers button',
    })
  }

  return (
    <Container>
      {list.length === 1 && (
        <div className={styles.block}>
          <div className={styles.block_group}>
            {isTextField(list[0].description) && isTextField(list[0].title) && (
              <div className={styles.block_description}>
                {list[0].title.value}: {list[0].description.value}
              </div>
            )}
            {isTextField(list[0].btnTitle) && (
              <a
                className={styles.block_btn}
                href={
                  isTextField(list[0].btnLink)
                    ? interpolate(list[0].btnLink.value, { source: config.domain })
                    : undefined
                }
                target="_blank"
                rel="noreferrer"
                onClick={onClickBtn}
              >
                {list[0].btnTitle.value}
              </a>
            )}
          </div>
        </div>
      )}
      {list.length === 2 && (
        <div className={styles.list}>
          {list.map(({ title, description, btnLink, btnTitle }, index) => (
            <div key={isTextField(title) ? title.value : index} className={styles.list_item}>
              {isTextField(title) && <div className={styles.list_title}>{title.value}</div>}
              <div className={styles.list_group}>
                {isTextField(description) && (
                  <div className={styles.list_description}>{description.value}</div>
                )}
                {isTextField(btnTitle) && (
                  <a
                    className={styles.list_btn}
                    href={
                      isTextField(btnLink)
                        ? interpolate(btnLink.value, { source: config.domain })
                        : undefined
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    {btnTitle.value}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  )
}
