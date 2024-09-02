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
      <Text as="h3" font="headline20" color="white" style={{ marginBottom: '1.2rem' }}>
        {title}
      </Text>
      {children}
    </>
  );
}
