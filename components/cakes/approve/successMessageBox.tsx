import { CakesData } from '@/recoil/cakes/cakesData';
import theme from '@/styles/theme';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

export default function SuccessMessageBox() {
  const cakesData = useRecoilValue(CakesData);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Styled.Container>
      {isClient && (
        <>
          <span>{cakesData.wishesName}님께</span>
          <Image
            src={cakesData.selectedCake.thanksImage.src}
            width={cakesData.selectedCake.thanksImage.width}
            height={cakesData.selectedCake.thanksImage.height}
            alt="케이크 감사 이미지"
          />
          <Styled.CakeText>{cakesData.selectedCake.name}</Styled.CakeText>
          <span>선물이 완료 되었어요!</span>
        </>
      )}
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
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
