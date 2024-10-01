import { PropsWithChildren } from 'react';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex justify-center">
      <div className="w-full h-full px-22 min-w-375 max-w-500">{children}</div>
    </main>
  );
}
