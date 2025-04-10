import { Metadata, Viewport } from 'next';
import '../styles/global.css';
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
        url: '/assets/images/Thumbnail.png',
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
  return (
    <html lang="ko" className="bg-background">
      <body>
        {children}
        <div id="modal-root" />
        <Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy="afterInteractive" />
        {process.env.NODE_ENV === 'production' && (
          <>
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_CODE} />
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_CODE} />
          </>
        )}
        <Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
