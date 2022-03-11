import cn from 'classnames'
import Link from 'next/link'
import { MouseEvent, VFC, useMemo } from 'react'

import { Widget } from '@/api'
import { getInitialPhone } from '@/lib/phone'
import { trackEvent } from '@/lib/tracking'
import { ContactsEntity } from '@/modules/contacts'
import { MenuItemEntity } from '@/modules/menu'
import { PagesEntity } from '@/modules/pages'
import { isTextField } from '@/modules/widgets'
import { FormattingNumbers, Logo } from '@/uikit'
import { Complaint } from '@/widgets/complaint/complaint'

import { FooterInform } from './footer-inform/footer-inform'
import styles from './footer.module.scss'

export interface FooterProps {
  contacts: ContactsEntity
  menuSocial: MenuItemEntity
  widget?: Widget
  pages: PagesEntity
  widgetComplain?: Widget
}

export const Footer: VFC<FooterProps> = ({
  menuSocial,
  widget,
  pages,
  contacts,
  widgetComplain,
}) => {
  const phone = getInitialPhone(contacts)?.number
  const info = widget?.fields
  const termsLink = isTextField(info?.terms_link) ? info?.terms_link.value : undefined
  const alias = pages.find((page) => page.slug === termsLink)?.alias

  const onClickContactPhoneNumber = () => {
    trackEvent({
      category: 'Phone',
      label: 'Phone in the Footer',
      name: 'Clicked on the Phone in the Footer',
    })
  }

  const onClickSocialGroup = ({ currentTarget }: MouseEvent<HTMLAnchorElement>) => {
    const socialName =
      currentTarget.dataset.socialGroup === 'Почта' ? 'Mail' : currentTarget.dataset.socialGroup

    trackEvent({
      category: 'Social',
      label: `${socialName} icon`,
      name: `Clicked on the ${socialName} icon`,
    })
  }

  const termLinkAndPhone = useMemo(
    () => (
      <>
        <div className={styles.phone_block}>
          <a href={'tel:' + phone} onClick={onClickContactPhoneNumber}>
            <FormattingNumbers value={phone} mode="phone" />
          </a>
        </div>
        <div className={styles.phone_text}>Бесплатный звонок</div>
        <div className={styles.footer_terms}>
          Набирая наш номер телефона,&nbsp; вы соглашаетесь на получение &nbsp;
          <Link href="/mailing-list">
            <a
              className={styles.footer_link}
              rel="nofollow noreferrer"
              target="_blank"
              draggable="false"
            >
              рассылки
            </a>
          </Link>
        </div>
      </>
    ),
    [phone],
  )

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        <FooterInform fields={info} />
        <div className={styles.footer_content}>
          <div className={styles.footer_top}>
            <div className={styles.inform}>
              <div className={styles.inform_logo}>
                <Logo />
              </div>
              <div className={styles.inform_address}>
                <p>
                  г.&nbsp;Москва, Пресненская&nbsp;наб., 8, стр.&nbsp;1 башня
                  &ldquo;Москва&rdquo;, Этаж&nbsp;2, оф.&nbsp;6
                </p>
                <br />
                <p>
                  Юридический адрес: 123242, г.&nbsp;Москва, ул.&nbsp;Баррикадная, д.&nbsp;19,
                  стр.&nbsp;1, эт.&nbsp;1, пом.&nbsp;VII, ком.&nbsp;22
                </p>
              </div>
              <ul className={styles.inform_shedule}>
                <li className={styles.inform_shedule__element}>
                  <p className={styles.inform_shedule__text}>Офис</p>
                  <time className={styles.inform_shedule__time}>10:00 - 19:00, ПН-ПТ</time>
                </li>
                <li className={styles.inform_shedule__element}>
                  <p className={styles.inform_shedule__text}>Колл-центр</p>
                  <time className={styles.inform_shedule__time}>08:00 - 22:00, ПН-ВС</time>
                </li>
              </ul>
            </div>
            <div className={cn('hidden_on_desktop', styles.footer_inform_phone)}>
              {termLinkAndPhone}
            </div>
            <div className={styles.complaint}>
              <div className={styles.complaint_title}>Что-то пошло не так?</div>
              <div className={styles.complaint_subtitle}>Расскажите нам об этом!</div>
              {widgetComplain?.name && (
                <Complaint fields={widgetComplain.fields} widget={widgetComplain} />
              )}
            </div>
            <div className={styles.social_block}>
              {menuSocial.map((item) => (
                <a
                  data-social-group={item.title}
                  draggable="false"
                  key={item.slug}
                  className={styles.social_block_item}
                  href={item.href}
                  onClick={onClickSocialGroup}
                  rel="nofollow noreferrer"
                  target="_blank"
                >
                  {item.title}
                </a>
              ))}
              <div className="hidden_on_mobile">{termLinkAndPhone}</div>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.footer_content}>
            <div className={styles.footer_bottom}>
              {isTextField(info?.copyright) && (
                <div className={styles.footer_bottom_right}>
                  <p>{info?.copyright.value}</p>
                  <p>
                    ОГРН 1197746011253, <br className={styles['footer_bottom_right--hide_br']} />
                    ИНН 7703469230
                  </p>
                </div>
              )}
              {isTextField(info?.terms_text) && (
                <Link href={'/' + alias}>
                  <a className={styles.footer_bottom_link}>{info?.terms_text.value}</a>
                </Link>
              )}
              {isTextField(info?.text) && (
                <div className={styles.footer_bottom_inform}>{info?.text.value}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
