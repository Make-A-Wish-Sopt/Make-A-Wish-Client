import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        // Useful for wrapping in a per-page basic
        enhanceComponent: (Component) => Component,
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: [
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>,
      ],
    };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* <!-- Google Tag Manager --> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TMZ7P9S5');`,
            }}
          />
          {/* <!-- End Google Tag Manager --> */}
          <meta charSet="utf-8" />
          <link
            href="https://cdn.df.nexon.com/img/common/font/DNFBitBit-Regular.woff2"
            rel="stylesheet"
          />
          <link
            href="https://cdn.jsdelivr.net/npm/galmuri@latest/dist/galmuri.css"
            rel="stylesheet"
          />

          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />
          <script src="https://developers.kakao.com/sdk/js/kakao.min.js" async></script>

          <meta
            name="viewport"
            content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
          />
          <meta name="title" content="조물주보다 생일선물주" />
          <meta
            name="description"
            content="마음은 가볍게, 선물은 무겁게. 부담 없는 생일 펀딩 플랫폼, 조물주보다 생일선물주"
          />
          <meta
            name="keywords"
            content="선물하기, 카카오선물, 펀딩, 부담없는 선물, 카카오선물하기"
          />
        </Head>
        <body>
          {/* <!-- Google Tag Manager (noscript) --> */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TMZ7P9S5"
              height="0" width="0" style="display:none;visibility:hidden"/>`,
            }}
          />
          {/* <!-- End Google Tag Manager (noscript) --> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
