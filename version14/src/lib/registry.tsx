'use client';

import React, { Suspense, useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from 'styled-components';
import GlobalStyle from '@/styles/GlobalStyle';
import { RecoilRoot } from 'recoil';
import theme from '@/styles/theme';
import Loading from '@/app/loading';

function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>{children}</StyleSheetManager>
  );
}

export default function GlobalRegistry({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<Loading />}>
          <GlobalStyle />
          {children}
          {/* <StyledComponentsRegistry>{children}</StyledComponentsRegistry> */}
        </Suspense>
      </ThemeProvider>
    </RecoilRoot>
  );
}