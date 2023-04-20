import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import GlobalStyle from '../styles/GlobalStyle';
import { useMediaQuery } from 'react-responsive';

export default function App({ Component, pageProps }: AppProps) {
  // const mobile = useMediaQuery({ query: 'max-width:800px' });
  const isMobile = useMediaQuery({
    query: '(max-width:76.7rem)',
  });

  console.log(isMobile);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>Make A Wish | 선물고민은 그만!</title>
        </Head>

        <GlobalStyle />
        <Component
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
          }}
          {...pageProps}
        />
      </QueryClientProvider>
    </RecoilRoot>
  );
}
