import { ReactNode } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';

interface InputContainerProps {
  title?: string;
  children: ReactNode;
}

export default function InputContainer(props: InputContainerProps) {
  const { title, children } = props;
  return (
    <Styled.Container>
      {title && <Styled.InputTitle>{title}</Styled.InputTitle>}
      {children}
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.section`
    margin-bottom: 2.4rem;
  `,

  InputTitle: styled.h4`
    ${theme.fonts.body16};
    color: ${theme.colors.main_blue};

    margin-bottom: 1.2rem;
  `,
};
