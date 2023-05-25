import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import GlobalStyle from '../styles/GlobalStyle';
import { useMediaQuery } from 'react-responsive';
import { ThemeProvider } from 'styled-components';
import theme from '@/styles/theme';
import { useEffect } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  // const mobile = useMediaQuery({ query: 'max-width:800px' });
  const isMobile = useMediaQuery({
    query: '(max-width:76.7rem)',
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false,
      },
    },
  });


  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
    }
  }, []);

  return (
    <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Head>
            <title>Make A Wish | 선물고민은 그만!</title>
          </Head>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Component
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
              }}
              {...pageProps}
            />
          </ThemeProvider>
        </QueryClientProvider>
    </RecoilRoot>
  );
}
