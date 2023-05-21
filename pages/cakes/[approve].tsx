import InputLargeBox from '@/components/common/input/inputLargeBox';
import { CakesData } from '@/reocil/cakes/cakesData';
import theme from '@/styles/theme';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

export default function approve() {
  const cakesData = useRecoilValue(CakesData);
  console.log(cakesData);
  return (
    <>
      <Styled.CompleteMessageBox>
        {/* <span>{cakesData.wishesName}님께</span> */}
        <Image src={cakesData.selectedCake.thanksImage} alt="케이크 감사 이미지" />
        {/* <Styled.CakeText>{cakesData.selectedCake.name}</Styled.CakeText> */}
        <span>선물이 완료 되었어요!</span>
      </Styled.CompleteMessageBox>

      <InputLargeBox>
        {/* <Image src={cakesData.selectedCake.detailImage} alt="실제 선물 이미지" /> */}
      </InputLargeBox>
    </>
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
