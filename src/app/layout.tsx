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
  generator: 'sunmulzu',
  applicationName: '조물주보다 생일선물주',
  referrer: 'origin-when-cross-origin',
  authors: [{ name: 'hongmh' }, { name: 'sunmulzu', url: 'https://sunmulzu.com' }],
  creator: 'sunmulzu',
  publisher: 'sunmulzu',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  title: '조물주보다 생일선물주',
  keywords: ['생일', '선물', '선물편지', '생일잔치', '생일편지'],
  openGraph: {
    title: '조물주보다 생일선물주',
    description: '생일선물 플랫폼 조물주보다 생일선물주를 소개합니다.',
    images: [
      {
        url: '/assets/images/ThumbnailImg.png',
        width: 1200,
        height: 630,
        alt: '생일선물 플랫폼 미리보기 이미지',
      },
    ],
    url: 'https://sunmulzu.com',
    siteName: '조물주보다 생일선물주',
  },
  metadataBase: new URL('https://sunmulzu.com'),
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <html lang="ko" className="bg-background">
      <body>
        <Suspense fallback={<Loading />}>{children}</Suspense>
        <Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy="afterInteractive" />
        {isProduction && (
          <>
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_CODE} />
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_CODE} />
          </>
        )}
      </body>
    </html>
  );
}
