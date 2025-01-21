'use client';

import { useEffect, useState } from 'react';
import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

export default function ModalPortal({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const modalRoot =
    document.getElementById('modal-root') ||
    (() => {
      const element = document.createElement('div');
      element.id = 'modal-root';
      document.body.appendChild(element);
      return element;
    })();

  return createPortal(<>{children}</>, modalRoot);
}
