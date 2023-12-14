import theme from '@/styles/theme';
import styled from 'styled-components';
import { PropsWithChildren, ReactNode } from 'react';
import { StyledBox } from '../common/box';
import { ColorSystemType } from '@/types/common/box/boxStyleType';

interface ItemBoxProps {
  handleClickFn?: () => void;
  colorSystem: ColorSystemType;
}

export default function ItemBox(props: PropsWithChildren<ItemBoxProps>) {
  const { handleClickFn, colorSystem, children } = props;

  return (
    <li>
      <MypageItemBox as="button" onClick={handleClickFn} className={colorSystem}>
        {children}
        <span>{'>'}</span>
      </MypageItemBox>
    </li>
  );
}

const MypageItemBox = styled(StyledBox)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 6rem;

  ${theme.fonts.button18};

  padding: 0 2rem;
`;

const Styled = {
  Container: styled.button<{ backgroundColor: string | undefined; color: string | undefined }>`
    width: 100%;
    height: 6rem;
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 0rem 1.5rem;
    border-radius: 1rem;
    margin: 0 0 1rem;
    ${theme.fonts.button18};
    background-color: ${(props) => props.backgroundColor || theme.colors.pastel_blue};
    color: ${(props) => props.color || theme.colors.main_blue};
  `,

  ButtonContainer: styled.div<{ color: string | undefined }>`
    margin-left: auto;
    color: ${(props) => props.color || theme.colors.main_blue};
  `,
};
