import { Metadata } from 'next';
import '../styles/global.css';
import { Suspense } from 'react';
import Loading from './loading';

export const metadata: Metadata = {
  title: '조물주 보다 생일 선물주',
  keywords: '생일',
  description: 'Generated by Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-background">
      <body>
        <Suspense fallback={<Loading />}>{children}</Suspense>
        {/* {children} */}
      </body>
    </html>
  );
}