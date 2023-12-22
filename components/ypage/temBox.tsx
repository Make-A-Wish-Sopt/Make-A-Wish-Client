import theme from '@/styles/theme';
import styled from 'styled-components';
import { PropsWithChildren } from 'react';
import { StyledBox } from '../ommon/box';
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
