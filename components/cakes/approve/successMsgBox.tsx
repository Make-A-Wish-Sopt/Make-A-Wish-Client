import theme from '@/styles/theme';
import { CakesDataType } from '@/types/cakes/cakesDataType';
import Image from 'next/image';
import styled from 'styled-components';

interface SuccessMsgBoxProps {
  cakesData: CakesDataType | undefined;
}

export default function SuccessMsgBox(props: SuccessMsgBoxProps) {
  const { cakesData } = props;

  return (
    <Styled.CompleteMessageBox>
      <span>{cakesData?.wishesName}님께</span>

      <Image
        src={cakesData?.selectedCake.thanksImage.src}
        width={cakesData?.selectedCake.thanksImage.width}
        height={cakesData?.selectedCake.thanksImage.height}
        alt="케이크 감사 이미지"
      />
      <Styled.CakeText>{cakesData?.selectedCake.name}</Styled.CakeText>
      <span>선물이 완료 되었어요!</span>
    </Styled.CompleteMessageBox>
  );
}

const Styled = {
  CompleteMessageBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    ${theme.fonts.headline30};

    margin-top: 9.5rem;
    margin-bottom: 5rem;
  `,
  CakeText: styled.span`
    color: ${theme.colors.main_blue};
  `,
};
