import GlobalRegistry from '@/lib/registry';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '조물주 보다 생일 선물주',
  keywords: '생일',
  description: 'Generated by Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GlobalRegistry>{children}</GlobalRegistry>
      </body>
    </html>
  );
}