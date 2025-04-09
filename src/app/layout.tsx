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
  title: '조물주보다 생일선물주',
  keywords: '생일',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  if (typeof window !== 'undefined' && window.Kakao && !window.Kakao.isInitialized()) {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
  }
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
