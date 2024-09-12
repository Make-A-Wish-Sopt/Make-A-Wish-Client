import { CheckedBoxIc, UnCheckedBoxIc } from '@/public/assets/icons';
import theme from '@/styles/theme';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface CheckBoxProps {
  checkBoxState: boolean;
  checkBoxText: string;
  handleClickFn: () => void;
}

export default function CheckBox(props: PropsWithChildren<CheckBoxProps>) {
  const { checkBoxState, checkBoxText, handleClickFn } = props;
  return (
    <Styled.CheckBoxWrapper>
      {checkBoxState ? (
        <Image src={CheckedBoxIc} alt="체크박스 아이콘" onClick={handleClickFn} />
      ) : (
        <Image src={UnCheckedBoxIc} alt="체크박스 아이콘" onClick={handleClickFn} />
      )}
      <Styled.CheckBoxText>{checkBoxText}</Styled.CheckBoxText>
    </Styled.CheckBoxWrapper>
  );
}

const Styled = {
  CheckBoxWrapper: styled.div`
    display: flex;
    align-items: center;

    height: 100%;
  `,

  CheckBoxText: styled.p`
    color: ${theme.colors.main_blue};
    ${theme.fonts.body14};

    margin-left: 0.8rem;
  `,
};
