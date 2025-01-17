import { Metadata, Viewport } from 'next';
import '../styles/global.css';
import { Suspense } from 'react';
import Loading from './loading';
import Script from 'next/script';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

declare global {
  interface Window {
    Kakao: any;
  }
}

export const metadata: Metadata = {
  title: '조물주보다 생일선물주',
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
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_CODE} />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_CODE} />
      </body>
    </html>
  );
}
