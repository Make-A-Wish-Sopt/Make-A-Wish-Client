import { Metadata, Viewport } from 'next';
import '../styles/global.css';
import { Suspense } from 'react';
import Loading from './loading';
import Script from 'next/script';

declare global {
  interface Window {
    Kakao: any;
  }
}

export const metadata: Metadata = {
  title: '조물주 보다 생일 선물주',
  keywords: '생일',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="bg-background">
      <body>
        <Suspense fallback={<Loading />}>{children}</Suspense>
        <Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
