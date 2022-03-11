import {
  LocalizationMap,
  ProgressBar,
  SpecialZoomLevel,
  Viewer,
  Worker,
} from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import { getFilePlugin } from '@react-pdf-viewer/get-file'
import { localeSwitcherPlugin } from '@react-pdf-viewer/locale-switcher'
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail'
import { ToolbarSlot, toolbarPlugin } from '@react-pdf-viewer/toolbar'
import '@react-pdf-viewer/thumbnail/lib/styles/index.css'
import cn from 'classnames'
import { VFC, useRef, useState } from 'react'
import { useToggle } from 'react-use'

import {
  SvgListPdf,
  SvgDownload,
  SvgPrint,
  SvgArrowUp,
  SvgScaleMinus,
  SvgScalePlus,
} from '@/uikit'

import i18nPdf from './i18n-pdf.json'
import styles from './pdf-viewer.module.scss'

export interface PdfViewerProps {
  viewData: string
}

const WORKER_URL = '/js/pdfjs-dist/pdf.worker.min.js'

const PdfViewer: VFC<PdfViewerProps> = ({ viewData }) => {
  const pdfUrl = viewData
  const [pdfLoaded, setPdfLoaded] = useState(false)
  const pdfDocument = useRef<HTMLDivElement>(null)

  const toolbarPluginInstance = toolbarPlugin()
  const { Toolbar } = toolbarPluginInstance

  const thumbnailPluginInstance = thumbnailPlugin()
  const { Thumbnails } = thumbnailPluginInstance
  const [isThumbnailsOpen, toggleThumbnailsOpen] = useToggle(false)

  const localeSwitcherPluginInstance = localeSwitcherPlugin()

  const getFilePluginInstance = getFilePlugin()

  const loadDocument = () => {
    const timeoutId = window.setTimeout(() => {
      const { current } = pdfDocument
      const pages = document.querySelector('.rpv-core__inner-page')

      if (pages && current) {
        const lastChild = current.lastChild as HTMLDivElement
        const height = pages.clientHeight + 15 + 'px'

        current.style.maxHeight = height

        if (lastChild) {
          lastChild.style.maxHeight = '100%'
          lastChild.style.height = 'auto'
        }
      }
      setPdfLoaded(true)
      window.clearTimeout(timeoutId)
    }, 1500)
  }

  return (
    <section className={styles.pdf}>
      <Worker workerUrl={WORKER_URL}>
        <div className={styles.pdf_inner}>
          <div className={styles.pdf_nav_bar}>
            <Toolbar>
              {(props: ToolbarSlot) => {
                const {
                  CurrentPageInput,
                  GoToNextPage,
                  GoToPreviousPage,
                  NumberOfPages,
                  Print,
                  Zoom,
                  ZoomIn,
                  ZoomOut,
                } = props

                return (
                  <div className={styles.toolbar}>
                    <div className={styles.toolbar_item}>
                      <button className={styles.toolbar_btn} onClick={toggleThumbnailsOpen}>
                        <SvgListPdf />
                      </button>
                    </div>

                    <div className={styles.toolbar_item}>
                      <ZoomOut>
                        {(props) => (
                          <button
                            className={cn(styles.toolbar_btn, styles.toolbar_btn___scale_minus)}
                            onClick={props.onClick}
                          >
                            <SvgScaleMinus />
                          </button>
                        )}
                      </ZoomOut>
                      <div className={styles.toolbar_zoom}>
                        <Zoom />
                      </div>
                      <ZoomIn>
                        {(props) => (
                          <button className={styles.toolbar_btn} onClick={props.onClick}>
                            <SvgScalePlus />
                          </button>
                        )}
                      </ZoomIn>
                      <div className={styles.toolbar_pagination}>
                        <GoToPreviousPage>
                          {(props) => (
                            <button className={styles.toolbar_btn} onClick={props.onClick}>
                              <SvgArrowUp />
                            </button>
                          )}
                        </GoToPreviousPage>
                        <div className={styles.toolbar_input}>
                          <CurrentPageInput /> из <NumberOfPages />
                        </div>
                        <GoToNextPage>
                          {(props) => (
                            <button
                              className={cn(styles.toolbar_btn, styles.toolbar_btn___arrow_down)}
                              onClick={props.onClick}
                            >
                              <SvgArrowUp />
                            </button>
                          )}
                        </GoToNextPage>
                      </div>
                    </div>

                    <div className={styles.toolbar_item}>
                      {pdfUrl && (
                        <a
                          className={cn(styles.toolbar_btn, styles.toolbar_btn___download)}
                          href={pdfUrl}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <SvgDownload />
                        </a>
                      )}
                      <Print>
                        {(props) => (
                          <button className={styles.toolbar_btn} onClick={props.onClick}>
                            <SvgPrint />
                          </button>
                        )}
                      </Print>
                    </div>
                  </div>
                )
              }}
            </Toolbar>
          </div>
          <div
            className={cn(styles.pdf_area, {
              isLoadedPDF: pdfLoaded,
            })}
            ref={pdfDocument}
          >
            <div
              className={cn(styles.pdf_area_thumbnails, {
                [styles.pdf_area_thumbnails___open]: isThumbnailsOpen,
              })}
            >
              {isThumbnailsOpen && <Thumbnails />}
            </div>
            {pdfUrl && (
              <Viewer
                localization={i18nPdf as unknown as LocalizationMap}
                defaultScale={window.innerWidth < 768 ? SpecialZoomLevel.PageWidth : undefined}
                fileUrl={pdfUrl}
                onDocumentLoad={loadDocument}
                plugins={[
                  toolbarPluginInstance,
                  thumbnailPluginInstance,
                  localeSwitcherPluginInstance,
                  getFilePluginInstance,
                ]}
                renderLoader={(percentages: number) => (
                  <div className={styles.progress_bar}>
                    <ProgressBar progress={Math.round(percentages)} />
                  </div>
                )}
              />
            )}
          </div>
        </div>
      </Worker>
    </section>
  )
}

export default PdfViewer
