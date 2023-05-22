import { getPgTokenData } from '@/api/cakes/getPgTokenData';
import ButtonBox from '@/components/button/buttonBox';
import SuccessItemBox from '@/components/cakes/approve/successItemBox';
import SuccessMsgBox from '@/components/cakes/approve/successMsgBox';
import { QUERY_KEY } from '@/constant/queryKey';
import { CakesData } from '@/reocil/cakes/cakesData';
import theme from '@/styles/theme';
import { CakesDataType } from '@/types/cakes/cakesDataType';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

export default function approve() {
  const globalValue = useRecoilValue(CakesData);
  const [cakesData, setCakesData] = useState<CakesDataType>();

  const router = useRouter();

  useEffect(() => {
    setCakesData({ ...globalValue });

    if (!router.isReady) return;

    setCakesData((prevData) => ({
      ...prevData,
      pgToken: router.query.pg_token,
    }));
  }, [router.isReady]);

  const { data } = useQuery(QUERY_KEY.pgToken, async () => getPgTokenData(cakesData?.pgToken), {});

  const handleClick = () => {
    console.log('hello');
  };

  return (
    <>
      <SuccessMsgBox cakesData={cakesData} />
      <SuccessItemBox cakesData={cakesData} />
      {/* 게이지바 */}
      <ButtonBox
        backgroundColor={theme.colors.main_blue}
        fontColor={theme.colors.white}
        handleClick={handleClick}
      >
        당신도 받고 싶은 선물이 있나요?
      </ButtonBox>
    </>
  );
}
