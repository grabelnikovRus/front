import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import cn from 'classnames'
import dynamic from 'next/dynamic'
import { useEffect, useState, useCallback, useMemo, VFC, ChangeEvent } from 'react'

import { WidgetFieldsStack } from '@/api'
import { MenuEntity, MenuItemEntity } from '@/modules/menu'
import {
  isStackField,
  isPdfField,
  isTextField,
  WidgetsEntity,
  WidgetFields,
} from '@/modules/widgets'
import { SvgArrow, Switcher } from '@/uikit'
import { Exclamation } from '@/widgets/exclamation/exclamation'

import styles from './legal.module.scss'

const PdfViewer = dynamic(import('../../components/pdf-viewer/pdf-viewer'), {
  ssr: false,
})

interface LegalProps {
  menus: MenuEntity
  slug: string
  widgets: WidgetsEntity
}

export const Legal: VFC<LegalProps> = ({ menus, slug, widgets }) => {
  const legalWidget = widgets.find(({ name }) => /^contract/.test(name))
  const guaranteeWidget = widgets.find(({ name }) => /guarantee/.test(name))
  const exclamationBlock = widgets.find(({ name }) => /^exclamation/.test(name))
  const [activePdfName, setActivePdfName] = useState<string>()
  const [activeData, setActiveData] = useState<WidgetFieldsStack | string>()
  const [legalMenu, setLegalMenu] = useState<MenuItemEntity>()
  const [isPdfFile, setIsPdfFile] = useState(false)
  const [selectedPage, setSelectedPage] = useState('')
  const [widgetsData, setWidgetsData] = useState<WidgetFields[]>([])
  const menuProps = {
    anchorOrigin: {
      horizontal: 'center' as number | 'center' | 'left' | 'right',
      vertical: 'bottom' as number | 'bottom' | 'center' | 'top',
    },
    getContentAnchorEl: null,
    transformOrigin: {
      horizontal: 'center' as number | 'center' | 'left' | 'right',
      vertical: 'top' as number | 'bottom' | 'center' | 'top',
    },
  }
  const onChangePage = (event: ChangeEvent<{ value: unknown }>) => {
    setSelectedPage(event.target.value as string)
    window.location.href = '/' + event.target.value
  }
  const selectDocument = (name: string) => {
    setActivePdfName(name)
    if (widgetsData) {
      const activeData = widgetsData.find((x) => isPdfField(x.pdf) && x.pdf.title === name)

      if (!activeData) return

      if (isPdfField(activeData.pdf)) {
        setActiveData(activeData.pdf)
      }
    }
  }
  const onChangePdf = (name: string) => {
    if (selectDocument) selectDocument(name)
  }
  const init = useCallback(() => {
    const type = legalWidget?.fields?.text ? 'text' : legalWidget?.fields?.pdf_list ? 'pdf' : null

    if (!type) return

    if (type === 'text') {
      const text = isTextField(legalWidget?.fields.text) ? legalWidget?.fields.text.value : ''
      setActiveData(text)
    }

    if (type === 'pdf') {
      const pdfList = isStackField(legalWidget?.fields.pdf_list)
        ? legalWidget?.fields.pdf_list.stack
        : []

      if (!pdfList) return
      if (!pdfList.length) return

      const lastActive = pdfList.length - 1

      const pdf = pdfList[lastActive]?.pdf
      if (isPdfField(pdf)) {
        setActivePdfName(pdf.title)
        setActiveData(pdf)
        setIsPdfFile(true)
        setWidgetsData(pdfList)
      }
    }

    if (menus && slug) {
      setLegalMenu(menus.policy)
      setSelectedPage(slug)
    }
  }, [legalWidget?.fields, menus, slug, setSelectedPage])

  useEffect(() => {
    init()
  }, [legalWidget?.fields, init])

  const document = useMemo(() => {
    if (!activeData) return '...'

    if (typeof activeData === 'string') {
      return (
        <div className={styles.policy_text___default}>
          <div
            className={styles.policy_content}
            dangerouslySetInnerHTML={{ __html: activeData || '' }}
          />
          {exclamationBlock && (
            <div className={styles.policy_exclamation}>
              <Exclamation fields={exclamationBlock?.fields} />
            </div>
          )}
        </div>
      )
    }

    if (isPdfField(activeData)) {
      return <PdfViewer viewData={activeData?.src} />
    }
  }, [activeData, exclamationBlock])

  return (
    <div className={cn('container', styles.policy)}>
      <div className={styles.header_container}>
        <h1 className={styles.header_title}>
          {isTextField(legalWidget?.fields.heading)
            ? legalWidget?.fields.heading.value
            : 'Документы'}
        </h1>
        {isTextField(legalWidget?.fields.description) && (
          <div className={styles.header_text}>{legalWidget?.fields.description.value}</div>
        )}
      </div>
      <div className={styles.policy_container}>
        {guaranteeWidget ? (
          <Switcher
            theme="neutral"
            buttons={[
              { mode: 'link', path: '/guarantee-primary', text: 'Первичка', slug: 'primary' },
              { mode: 'link', path: '/guarantee-secondary', text: 'Вторичка', slug: 'secondary' },
            ]}
          />
        ) : (
          <section className={styles.policy_selects}>
            {legalMenu && (
              <div className={styles.select}>
                <div className={styles.select_wrapper}>
                  <Select
                    IconComponent={() => (
                      <div className={styles.select_icon}>
                        <SvgArrow />
                      </div>
                    )}
                    MenuProps={menuProps}
                    classes={{
                      root: cn(styles.select_container, styles.select_container___focus),
                    }}
                    displayEmpty
                    onChange={onChangePage}
                    value={selectedPage}
                    autoWidth
                  >
                    {legalMenu.map(({ title, href }) => (
                      <MenuItem
                        classes={{
                          root: styles.select_option,
                          selected: styles.select_option___active,
                        }}
                        key={title}
                        value={href.slice(1)}
                      >
                        {title}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
            )}
            {isPdfFile && (
              <div className={styles.select}>
                <div className={styles.select_wrapper}>
                  <Select
                    IconComponent={() => (
                      <div className={styles.select_icon}>
                        <SvgArrow />
                      </div>
                    )}
                    MenuProps={menuProps}
                    classes={{
                      root: cn(styles.select_container, styles.select_container___focus),
                    }}
                    displayEmpty
                    value={activePdfName || ''}
                  >
                    {!!widgetsData.length &&
                      widgetsData.map(
                        ({ pdf }) =>
                          isPdfField(pdf) && (
                            <MenuItem
                              classes={{
                                root: styles.select_option,
                                selected: styles.select_option___active,
                              }}
                              key={pdf.title}
                              onClick={() => onChangePdf(pdf.title)}
                              value={pdf.title}
                            >
                              {pdf.title}
                            </MenuItem>
                          ),
                      )}
                  </Select>
                </div>
              </div>
            )}
          </section>
        )}
        <section className={cn(styles.policy_text, { [styles.no_padding]: isPdfFile })}>
          {document}
        </section>
      </div>
    </div>
  )
}
