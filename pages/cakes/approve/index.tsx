import { getPgTokenData } from '@/api/cakes/getPgTokenData';
import ButtonBox from '@/components/common/button/buttonBox';
import SuccessItemBox from '@/components/cakes/approve/successItemBox';
import { QUERY_KEY } from '@/constant/queryKey';
import { CakesData } from '@/recoil/cakes/cakesData';
import theme from '@/styles/theme';
import { CakesDataType } from '@/types/cakes/cakesDataType';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import SuccessMessageBox from '@/components/cakes/approve/successMessageBox';

export default function ApprovePage() {
  const [cakesData, setCakesData] = useRecoilState<CakesDataType>(CakesData);

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

  const { data } = useQuery(QUERY_KEY.PG_TOKEN, async () => getPgTokenData(cakesData?.pgToken), {});

  const handleClick = () => {
    router.replace('/');
  };

  return (
    <Box>
      <SuccessMessageBox />
      <SuccessItemBox/>
      <ButtonBox
        backgroundColor={theme.colors.main_blue}
        fontColor={theme.colors.white}
        handleClick={handleClick}
      >
        당신도 받고 싶은 선물이 있나요?
      </ButtonBox>
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
