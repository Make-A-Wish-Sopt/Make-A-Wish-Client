'use client';

import { PropsWithChildren } from 'react';

interface InputFormProps {
  title: string;
  textCenter?: boolean;
}

export default function InputForm(props: PropsWithChildren<InputFormProps>) {
  const { title, textCenter, children } = props;

  return (
    <div className="mb-30">
      <h3
        className={`font-bitbit text-white text-[20px] leading-tight mb-12 whitespace-pre-line ${textCenter && 'text-center'}`}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}
