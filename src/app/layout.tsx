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
  openGraph: {
    title: '조물주보다 생일선물주',
    description: '생일선물 플랫폼 조물주보다 생일선물주를 소개합니다.',
    images: [
      {
        url: '../../public/assets/images/mainCakeListImg.png',
        width: 1200, // 이미지 너비
        height: 630, // 이미지 높이
        alt: '생일선물 플랫폼 미리보기 이미지',
      },
    ],
    url: 'https://sunmulzu.com', // 페이지의 기본 URL
    siteName: '조물주보다 생일선물주',
  },
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
