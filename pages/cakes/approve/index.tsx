import ButtonBox from '@/components/common/button/buttonBox';
import SuccessItemBox from '@/components/cakes/approve/successItemBox';
import { CakesData } from '@/recoil/cakes/cakesData';
import theme from '@/styles/theme';
import { CakesDataType } from '@/types/cakes/cakesDataType';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import SuccessMessageBox from '@/components/cakes/approve/successMessageBox';
import Layout from '@/components/common/layout';

export default function ApprovePage() {
  const setCakesData = useSetRecoilState<CakesDataType>(CakesData);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const pgToken = router.query.pg_token;

    if (pgToken) {
      setCakesData((prevData) => ({
        ...prevData,
        pgToken: pgToken,
      }));
    }
  }, [router.isReady]);

  const moveHome = () => {
    router.replace('/');
  };

  return (
    <Layout>
      <Styled.Container>
        <SuccessMessageBox />
        <SuccessItemBox />
        <Styled.ButtonWrapper>
          <ButtonBox
            backgroundColor={theme.colors.main_blue}
            fontColor={theme.colors.white}
            handleClick={moveHome}
          >
            당신도 받고 싶은 선물이 있나요?
          </ButtonBox>
        </Styled.ButtonWrapper>
      </Styled.Container>
    </Layout>
  );
}

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  ButtonWrapper: styled.div`
    width: 100%;
    margin-bottom: 4.6rem;
  `,
};
