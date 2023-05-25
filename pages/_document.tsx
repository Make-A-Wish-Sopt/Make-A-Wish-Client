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
          <meta charSet="utf-8" />
          <link
            href="https://cdn.df.nexon.com/img/common/font/DNFBitBit-Regular.woff2"
            rel="stylesheet"
          />
          <link
            href="https://cdn.jsdelivr.net/npm/galmuri@latest/dist/galmuri.css"
            rel="stylesheet"
          />
          <script src="https://developers.kakao.com/sdk/js/kakao.js" async></script>
          <meta
            name="viewport"
            content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
          />
          <meta
            name="description"
            content="마음은 가볍게, 선물은 무겁게. 부담 없는 생일 펀딩 플랫폼 Make A Wish"
          />
          <meta
            name="keywords"
            content="선물하기, 카카오선물, 펀딩, 부담없는 선물, 카카오선물하기"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
