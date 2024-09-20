// ** React Import
import { Children } from 'react'

// ** Next Import
import Document, { Head, Html, Main, NextScript } from 'next/document'

// ** Emotion Imports
import createEmotionServer from '@emotion/server/create-instance'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils'

class CustomDocument extends Document {
  render() {
    return (
      <Html lang='es'>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
          <link
            href='https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap'
            rel='stylesheet'
          />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
          />
          <link rel='apple-touch-icon' sizes='180x180' href='/images/icons/favicon.ico' />
          <link rel='shortcut icon' href='/images/icons/favicon.ico' />

          <link rel='apple-touch-icon' href='/images/icons/touch-icon-iphone.png' />
          <link rel='apple-touch-icon' sizes='152x152' href='/images/icons/touch-icon-ipad.png' />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/images/icons/touch-icon-iphone-retina.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='167x167'
            href='/images/icons/touch-icon-ipad-retina.png'
          />

          <link rel='manifest' href='/manifest.json' />
          <link rel='mask-icon' href='/images/icons/safari-pinned-tab.svg' color='#5bbad5' />
          <link rel='shortcut icon' href='/images/icons/favicon.ico' />

          <link rel='apple-touch-icon' sizes='57x57' href='/images/icons/apple-icon-57x57.png' />
          <link rel='apple-touch-icon' sizes='60x60' href='/images/icons/apple-icon-60x60.png' />
          <link rel='apple-touch-icon' sizes='72x72' href='/images/icons/apple-icon-72x72.png' />
          <link rel='apple-touch-icon' sizes='76x76' href='/images/icons/apple-icon-76x76.png' />
          <link
            rel='apple-touch-icon'
            sizes='114x114'
            href='/images/icons/apple-icon-114x114.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='120x120'
            href='/images/icons/apple-icon-120x120.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='144x144'
            href='/images/icons/apple-icon-144x144.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='152x152'
            href='/images/icons/apple-icon-152x152.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/images/icons/apple-icon-180x180.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='192x192'
            href='/images/icons/android-icon-192x192.png'
          />
          <link rel='icon' type='image/png' sizes='32x32' href='/images/icons/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='96x96' href='/images/icons/favicon-96x96.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/images/icons/favicon-16x16.png' />

          <meta name='application-name' content='IIPP COMAFI' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content='IIPP COMAFI' />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='msapplication-config' content='/images/icons/browserconfig.xml' />
          <meta name='msapplication-TileColor' content='#2B5797' />
          <meta name='msapplication-tap-highlight' content='no' />
          <meta name='msapplication-TileImage' content='/ms-icon-144x144.png' />
          <meta name='theme-color' content='#000000' />

          <meta name='twitter:card' content='summary' />
          <meta name='twitter:url' content='https://yourdomain.com' />
          <meta name='twitter:title' content='IIPP COMAFI' />
          <meta name='twitter:description' content='IIPP COMAFI' />
          <meta
            name='twitter:image'
            content='https://yourdomain.com/images/icons/android-chrome-192x192.png'
          />
          <meta name='twitter:creator' content='@DavidWShadow' />
          <meta property='og:type' content='website' />
          <meta property='og:title' content='IIPP COMAFI' />
          <meta property='og:description' content='IIPP COMAFI' />
          <meta property='og:site_name' content='IIPP COMAFI' />
          <meta property='og:url' content='https://yourdomain.com' />
          <meta
            property='og:image'
            content='https://yourdomain.com/images/icons/apple-touch-icon.png'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

CustomDocument.getInitialProps = async ctx => {
  const originalRenderPage = ctx.renderPage
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => (
        <App
          {...props} // @ts-ignore
          emotionCache={cache}
        />
      )
    })

  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map(style => {
    return (
      <style
        key={style.key}
        dangerouslySetInnerHTML={{ __html: style.css }}
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
      />
    )
  })

  return {
    ...initialProps,
    styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags]
  }
}

export default CustomDocument
