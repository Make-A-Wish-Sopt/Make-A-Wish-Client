import { getWishesData } from '@/api/cakes/getWishesData';
import { CAKE_LIST } from '@/constant/cakeList';
import useInput from '@/hooks/common/useInput';
import useRequestPayReady from '@/hooks/queries/cakes/useRequestPayReady';
import { CakesData } from '@/recoil/cakes/cakesData';
import { CakesDataType } from '@/types/cakes/cakesDataType';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import TextareaBox from '../common/input/textareaBox';
import InputContainer from '../common/input/inputContainer';
import CakesHeader from './cakesHeader';
import InputBox from '../common/input/inputBox';
import Image from 'next/image';
import { convertMoneyText } from '@/utils/common/convertMoneyText';
import styled from 'styled-components';
import theme from '@/styles/theme';
import { LIMIT_TEXT } from '@/constant/limitText';
import ButtonBox from '../common/button/buttonBox';
import LargeBox from '../common/box/LargeBox';
import { CakeListType } from '@/types/cakes/cakeListType';

export default function CakesContainer() {
  const [giverName, changeGiverName] = useInput('');
  const [letter, changeLetter] = useInput('', LIMIT_TEXT.DESCRIPTION);
  const [selectedCake, setSelectedCake] = useState<CakeListType>(CAKE_LIST[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const setCakesData = useSetRecoilState<CakesDataType>(CakesData);
  const [wishesId, setWishesId] = useState<string | string[] | undefined>('');
  const router = useRouter();

  const { data, mutate, isSuccess } = useRequestPayReady(giverName, selectedCake.cakeNumber);

  useEffect(() => {
    if (!router.isReady) return;
    setWishesId(router.query.id);
  }, [router.isReady]);

  useEffect(() => {
    if (isSuccess) {
      const nextLink = data?.data.data.next_redirect_pc_url;
      const tid = data?.data.data.tid;
      setCakesData((prevData) => ({
        ...prevData,
        tid: tid,
      }));

      router.replace(nextLink);
    }
  }, [isSuccess]);

  const { data: wishesData } = useQuery('wished', async () => getWishesData(wishesId), {
    enabled: wishesId !== '',
  });

  const resetCakesData = useResetRecoilState(CakesData);

  useEffect(() => {
    resetCakesData();
  }, []);

  const selectCake = (index: number) => {
    setSelectedCake(CAKE_LIST[index]);
    setSelectedIndex(index);
  };

  const saveReocilData = () => {
    setCakesData((prevData) => ({
      ...prevData,
      giverName: giverName,
      wishesName: wishesData?.name,
      cake: selectedIndex,
      message: letter,
      wishId: 7, //값 수정해야됩니다. query 값으로 수정해야됨!
      selectedCake: selectedCake,
    }));
  };

  const handleClick = () => {
    saveReocilData();
    selectedCake.cakeNumber === 1 ? router.replace('cakes/approve') : mutate();
  };

  return (
    <>
      <CakesHeader dayCount={wishesData?.dayCount} />

      <Styled.Title>{wishesData?.title}</Styled.Title>

      {/* API 데이터 */}
      <InputContainer title={`${wishesData?.name}님이 남긴 선물에 대한 힌트`}>
        <TextareaBox value={wishesData?.hint} readOnly={true} />
      </InputContainer>

      <InputContainer title={'본인의 실명 작성하기'}>
        <InputBox
          handleChangeValue={changeGiverName}
          value={giverName}
          placeholder="성과 이름 모두 정확하게 작성해주세요. ex. 홍길동"
        />
      </InputContainer>

      <InputContainer title={'보내고 싶은 케이크 선택하기'}>
        <Styled.CakeContainer>
          {CAKE_LIST.map((cake, index) => (
            <Styled.CakeBox
              onClick={() => selectCake(index)}
              index={index}
              selectedIndex={selectedIndex}
              key={cake.name}
            >
              <Image src={cake.cakeImage} alt={`${cake.name}이미지`} />
            </Styled.CakeBox>
          ))}
        </Styled.CakeContainer>

        <LargeBox bgColor={theme.colors.pastel_blue}>
          <Styled.CakesImageWrapper>
            <Image src={selectedCake.detailImage} alt="케이크 상세 이미지" />
          </Styled.CakesImageWrapper>
        </LargeBox>

        <Styled.CakeInfo>
          {selectedCake.name} {convertMoneyText(selectedCake.price)}원
        </Styled.CakeInfo>
      </InputContainer>

      <InputContainer title={'친구에게 편지 남기기'}>
        <TextareaBox
          handleChangeValue={changeLetter}
          value={letter}
          placeholder={`ex. 너 도대체 원하는 게 모야?\n나 넘 궁금해. 일단 몸보신 한우 케이크 보태겠어`}
        ></TextareaBox>
      </InputContainer>

      <ButtonBox
        backgroundColor={theme.colors.main_blue}
        fontColor={theme.colors.white}
        handleClick={handleClick}
      >
        케이크 보내기
      </ButtonBox>
    </>
  );
}

const Styled = {
  Title: styled.h1`
    ${theme.fonts.headline24_100};
    color: ${theme.colors.main_blue};
    margin: 2.4rem 0 3rem;
  `,
  InputText: styled.input`
    width: 100%;

    color: ${theme.colors.dark_blue};
    ${theme.fonts.body12};
  `,
  TextareaText: styled.textarea`
    width: 100%;
    height: 10.5rem;

    color: ${theme.colors.dark_blue};
    ${theme.fonts.body12};
    resize: none;
  `,
  CakesImageWrapper: styled.div`
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
  `,
  TextareaLengthWrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  CakeContainer: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-column-gap: 1.2rem;
    grid-row-gap: 1rem;

    margin-bottom: 2rem;
  `,

  CakeInfo: styled.span`
    ${theme.fonts.button18};
    color: ${theme.colors.main_blue};

    display: flex;
    justify-content: center;

    margin-top: 1rem;
  `,

  ButtonText: styled.div`
    ${theme.fonts.button18};
    color: ${theme.colors.white};
  `,

  CakeBox: styled.div<{ index: number; selectedIndex: number }>`
    width: 7.4rem;
    height: 4.6rem;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0.8rem 1.4rem;
    border: 0.1rem solid ${theme.colors.main_blue};
    background-color: ${(props) =>
      props.index === props.selectedIndex ? theme.colors.main_blue : theme.colors.pastel_blue};
    border-radius: 0.6rem;

    cursor: pointer;
  `,
};
