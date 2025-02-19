import { PropsWithChildren } from 'react';

interface InputFormProps {
  title: string;
  textCenter?: boolean;
}

export default function InputForm(props: PropsWithChildren<InputFormProps>) {
  const { title, textCenter, children } = props;

  return (
    <div className="mb-30">
      <p
        className={`font-bitbit text-white text-[20px] leading-tight mb-12 whitespace-pre-line ${textCenter && 'text-center'}`}
      >
        {title}
      </p>
      {children}
    </div>
  );
}
