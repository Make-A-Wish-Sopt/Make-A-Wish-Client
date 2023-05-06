import theme from '@/styles/theme';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface TextareaBoxProps {
  children: ReactNode;
}

export default function TextareaBox(props: TextareaBoxProps) {
  const { children } = props;
  return <Styled.Box>{children}</Styled.Box>;
}

const Styled = {
  Box: styled.section`
    width: 100%;
    height: 15rem;

    ${theme.fonts.body12};
    color: ${theme.colors.dark_blue};

    padding: 1.2rem;
    background-color: ${theme.colors.pastel_blue};
    border: 0.1rem solid ${theme.colors.main_blue};
    border-radius: 1rem;
  `,
};
