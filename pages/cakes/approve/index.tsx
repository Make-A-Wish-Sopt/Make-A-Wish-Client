import { getPgTokenData } from '@/api/cakes/getPgTokenData';
import ButtonBox from '@/components/common/button/buttonBox';
import SuccessItemBox from '@/components/cakes/approve/successItemBox';
import SuccessMsgBox from '@/components/cakes/approve/successMessageBox';
import { QUERY_KEY } from '@/constant/queryKey';
import { CakesData } from '@/recoil/cakes/cakesData';
import theme from '@/styles/theme';
import { CakesDataType } from '@/types/cakes/cakesDataType';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

export default function ApprovePage() {
  const globalValue = useRecoilValue(CakesData);
  const [cakesData, setCakesData] = useState<CakesDataType>(globalValue);

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

  useEffect(() => {
    setCakesData({ ...globalValue });
  }, []);

  const { data } = useQuery(QUERY_KEY.pgToken, async () => getPgTokenData(cakesData?.pgToken), {});

  const handleClick = () => {
    router.replace('/');
  };

  return (
    <Box>
      <SuccessMsgBox cakesData={cakesData} />
      <SuccessItemBox cakesData={cakesData} />
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
