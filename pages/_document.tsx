import { ServerStyleSheets } from '@material-ui/core/styles'
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import { Children, ReactElement } from 'react'

import { config, scripts } from '@/config'

export default class CustomDocument extends Document {
  static getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps> => {
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      })

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: [...Children.toArray(initialProps.styles), sheets.getStyleElement()],
    }
  }

  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          {/* Yandex Maps /*/}
          <script dangerouslySetInnerHTML={{ __html: scripts.ymaps }} />
          {/*/ Yandex Maps */}
          {/* Google Tag Manager */}
          {config.gtmId !== undefined && (
            <>
              <script dangerouslySetInnerHTML={{ __html: scripts.gtmInit }} />
              <script dangerouslySetInnerHTML={{ __html: scripts.gtm }} />
            </>
          )}
          {/*/ Google Tag Manager */}
          {/* SegmentStream /*/}
          {config.domain === 'pik-broker.ru' && config.segmentStreamApiKey !== undefined && (
            <script dangerouslySetInnerHTML={{ __html: scripts.segmentStream }} />
          )}
          {/*/ SegmentStream */}
          {/* Sourcebuster /*/}
          {config.isProd && (
            <>
              <script async src="/js/sourcebuster.min.js" />
              <script dangerouslySetInnerHTML={{ __html: scripts.sourcebuster }} />
            </>
          )}
          {/*/ Sourcebuster */}
        </Head>
        <body>
          {/* Google Tag Manager */}
          {config.gtmId !== undefined && (
            <noscript>
              <iframe
                width="0"
                height="0"
                style={{ display: 'none', visibility: 'hidden' }}
                src={scripts.gtmIframeSrc}
              />
            </noscript>
          )}
          {/*/ Google Tag Manager */}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
