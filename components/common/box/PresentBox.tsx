import theme from '@/styles/theme';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

export default function PresentBox(props: PropsWithChildren) {
  const { children } = props;
  return <Styled.Container>{children}</Styled.Container>;
}

const Styled = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 33.1rem;
    height: 16rem;

    border: 0.1rem solid ${theme.colors.main_blue};
    background-color: ${theme.colors.white};
    border-radius: 1.6rem;
  `,
};
