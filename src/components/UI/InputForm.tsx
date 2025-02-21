import { PropsWithChildren } from 'react';

interface InputFormProps {
  title: string;
}

export default function InputForm(props: PropsWithChildren<InputFormProps>) {
  const { title, children } = props;

  return (
    <div className="mb-30 font-bitbit text-white text-[20px]">
      <p className={'leading-tight mb-12 '}>{title}</p>
      {children}
    </div>
  );
}
