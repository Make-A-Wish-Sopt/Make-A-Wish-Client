import { CakesData } from '@/recoil/cakes/cakesData';
import { CakesDataType } from '@/types/cakes/cakesDataType';
import { useEffect, useState } from 'react';
import { useResetRecoilState } from 'recoil';
import TextareaBox from '../common/input/textareaBox';
import styled from 'styled-components';
import theme from '@/styles/theme';
import { LIMIT_TEXT } from '@/constant/limitText';
import useSelectCakes from '@/hooks/cakes/useSelectCakes';
import SelectCakes from './SelectCakes';
import Button from '../common/button';
import Input from '../common/input/input';
import { useForm } from 'react-hook-form';
import InputContainer from '../common/input/inputContainer';
import { CakesDataInputType } from '@/types/common/input/cakesInput';
import { useGetPublicWishes } from '@/hooks/queries/public';
import { useRouter } from 'next/router';
import { StyledBox } from '../common/box';
import BackBtn from '../common/button/backBtn';

export default function CakesContainer() {
  const { selectedCake, selectedIndex, selectCake } = useSelectCakes();
  const resetCakesData = useResetRecoilState(CakesData);
  const [wishesId, setWishesId] = useState<string | string[] | undefined>('');

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    setWishesId(router.query.id);
  }, [router.isReady]);

  const methods = useForm<CakesDataInputType>({
    defaultValues: {
      giverName: '',
      letter: '',
    },
  });

  // useEffect(() => {
  //   if (!router.isReady) return;
  //   setCakesData((prev) => ({
  //     ...prev,
  //     wishId: Number(router.query.id),
  //   }));
  // }, [router.isReady]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     const nextLink = data?.data?.data.next_redirect_pc_url;
  //     const tid = data?.data?.data.tid;

  //     setCakesData((prevData) => ({
  //       ...prevData,
  //       tid: tid,
  //     }));
  //     router.replace(nextLink);
  //   }
  // }, [isSuccess]);

  useEffect(() => {
    resetCakesData();
  }, []);

  const { publicWishesData } = useGetPublicWishes(wishesId);

  const sendCake = () => {};

  return (
    <Styled.Container>
      <div>
        <Styled.Header>
          <BackBtn />
          {`D-${publicWishesData?.dayCount}`}
        </Styled.Header>

        <Styled.Title>{publicWishesData?.title}</Styled.Title>

        <InputContainer title={`${publicWishesData?.name}님이 남긴 선물에 대한 힌트`}>
          <Styled.HintBox className={'pastelBlue_darkBlue'}>
            {publicWishesData?.hint}
          </Styled.HintBox>
          {/* <TextareaBox value={publicWishesData?.hint} readOnly /> */}
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
  Header: styled.header`
    display: flex;
    justify-content: space-between;

    width: 100%;

    color: ${theme.colors.main_blue};
    ${theme.fonts.headline20};
  `,

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

  HintBox: styled(StyledBox)`
    width: 100%;
    height: 12.6rem;

    ${theme.fonts.body14};

    padding: 1.2rem 1rem 1.2rem 1.2rem;
  `,

  ButtonWrapper: styled.div`
    padding-bottom: 4.6rem;
  `,
};
