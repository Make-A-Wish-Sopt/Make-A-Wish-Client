import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import GlobalStyle from '../styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from '@/styles/theme';
import { useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';

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

  const router = useRouter();

  // const setVh = () => {
  //   document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
  // };

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
    }
    //높이 resize
    // window.addEventListener('resize', setVh);
    // setVh();
  }, []);

  // useEffect(() => {
  //   const handleRouteChange = (url: string) => {
  //     gtag.pageview(url);
  //   };
  //   router.events.on('routeChangeComplete', handleRouteChange);
  //   router.events.on('hashChangeComplete', handleRouteChange);
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange);
  //     router.events.off('hashChangeComplete', handleRouteChange);
  //   };
  // }, [router.events]);

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
        <QueryClientProvider client={queryClient}>
          <Head>
            <title>조물주보다 생일선물주</title>
          </Head>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Component {...pageProps} />
          </ThemeProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}
