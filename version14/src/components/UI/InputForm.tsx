'use client';

import { PropsWithChildren } from 'react';
import Text from '../Common/Text';

interface InputFormProps {
  title: string;
}

export default function InputForm(props: PropsWithChildren<InputFormProps>) {
  const { title, children } = props;

  return (
    <>
      <Text as="h3" font="body16" color="main_blue" style={{ marginBottom: '1.2rem' }}>
        {title}
      </Text>
      {children}
    </>
  );
}
