import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import GlobalStyle from '../styles/GlobalStyle';
import styled, { ThemeProvider } from 'styled-components';
import theme from '@/styles/theme';
import { useEffect } from 'react';
import Script from 'next/script';
import Loading from '@/components/Common/Loading/Loading';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false,
      },
    },
  });

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
    }
  }, []);

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=GTM-TMZ7P9S5`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GTM-TMZ7P9S5', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <RecoilRoot>
        <React.Suspense fallback={<Loading />}>
          <QueryClientProvider client={queryClient}>
            <Head>
              <title>조물주보다 생일선물주</title>
            </Head>

            <ThemeProvider theme={theme}>
              <GlobalStyle />
              <RootLayout>
                <Component {...pageProps} />
              </RootLayout>
            </ThemeProvider>
          </QueryClientProvider>
        </React.Suspense>
      </RecoilRoot>
    </>
  );
}

const RootLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;
