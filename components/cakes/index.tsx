import useInput from '@/hooks/common/useInput';
import useRequestPayReady from '@/hooks/queries/cakes/useRequestPayReady';
import { CakesData } from '@/recoil/cakes/cakesData';
import { CakesDataType } from '@/types/cakes/cakesDataType';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState, useResetRecoilState } from 'recoil';
import TextareaBox from '../common/input/textareaBox';
import CakesHeader from './cakesHeader';
import styled from 'styled-components';
import theme from '@/styles/theme';
import { LIMIT_TEXT } from '@/constant/limitText';
import useSelectCakes from '@/hooks/cakes/useSelectCakes';
import SelectCakes from './SelectCakes';
import { getWishesData } from '@/api/cakes/cakesAPI';
import Button from '../common/button';
import Input from '../common/input/input';
import { useForm } from 'react-hook-form';
import { CakesDataInputType } from '@/types/common/input/cakesInput';
import InputContainer from '../common/input/inputContainer';

export default function CakesContainer() {
  const { selectedCake, selectedIndex, selectCake } = useSelectCakes();
  const resetCakesData = useResetRecoilState(CakesData);
  const [cakesData, setCakesData] = useRecoilState<CakesDataType>(CakesData);

  const methods = useForm<CakesDataInputType>({
    defaultValues: {
      giverName: '',
      letter: '',
    },
  });

  const router = useRouter();

  const { data, mutate, isSuccess } = useRequestPayReady(cakesData.wishId, selectedCake.cakeNumber);

  useEffect(() => {
    if (!router.isReady) return;
    setCakesData((prev) => ({
      ...prev,
      wishId: Number(router.query.id),
    }));
  }, [router.isReady]);

  useEffect(() => {
    if (isSuccess) {
      const nextLink = data?.data?.data.next_redirect_pc_url;
      const tid = data?.data?.data.tid;

      setCakesData((prevData) => ({
        ...prevData,
        tid: tid,
      }));
      router.replace(nextLink);
    }
  }, [isSuccess]);

  useEffect(() => {
    resetCakesData();
  }, []);

  const { data: wishesData } = useQuery('wished', getWishesData);

  const saveRecoilData = () => {
    // setCakesData((prevData) => ({
    //   ...prevData,
    //   giverName: giverName,
    //   wishesName: wishesData?.name,
    //   cake: selectedIndex,
    //   message: letter,
    //   selectedCake: selectedCake,
    //   wishId: Number(router.query.id),
    // }));
  };

  const sendCake = () => {
    saveRecoilData();
    selectedCake.cakeNumber === 1 ? router.push('/cakes/approve') : mutate();
  };

  return (
    <Styled.Container>
      <div>
        {/* <CakesHeader dayCount={wishesData?.dayCount} /> */}
        <Styled.Title>{wishesData?.title}</Styled.Title>

        <InputContainer title={`${wishesData?.name}님이 남긴 선물에 대한 힌트`}>
          <TextareaBox value={'wishesData?.hint'} readOnly={true} />
        </InputContainer>

        <InputContainer title={'본인의 실명 작성하기'}>
          <Input
            placeholder="이름을 정확하게 작성해주세요. ex. 홍길동"
            register={methods.register('giverName')}
          />
        </InputContainer>

        <SelectCakes
          selectedCake={selectedCake}
          selectedIndex={selectedIndex}
          selectCake={selectCake}
        />

        <InputContainer title={'친구에게 편지 남기기'}>
          <TextareaBox
            placeholder={`ex. 너 도대체 원하는 게 모야?\n나 넘 궁금해. 일단 몸보신 한우 케이크 보태겠어`}
            inputLength={methods.watch('letter').length}
            limitLength={LIMIT_TEXT.DESCRIPTION}
            register={methods.register('letter')}
          ></TextareaBox>
        </InputContainer>
      </div>

      <Styled.ButtonWrapper>
        <Button boxType="btn--large" colorSystem="mainBlue_white" handleClickFn={sendCake}>
          케이크 주문하기
        </Button>
      </Styled.ButtonWrapper>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100svh;
  `,

  Title: styled.h1`
    ${theme.fonts.headline24_100};
    color: ${theme.colors.main_blue};
    margin: 2.4rem 0 3rem;
  `,

  ButtonWrapper: styled.div`
    padding-bottom: 4.6rem;
  `,
};
