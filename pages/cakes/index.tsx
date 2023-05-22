import theme from '@/styles/theme';
import styled from 'styled-components';
import useInput from '@/hooks/useInput';
import InputBox from '@/components/common/input/inputBox';
import InputLength from '@/components/common/input/inputLength';
import InputContainer from '@/components/common/input/inputContainer';
import InputTitle from '@/components/common/input/inputTitle';
import TextareaBox from '@/components/common/input/textareaBox';
import { CAKE_LIST } from '@/constant/cakeList';
import { CakeListType } from '@/types/cakeListType';
import Image from 'next/image';
import ButtonBox from '@/components/button/buttonBox';
import { LIMIT_TEXT } from '@/constant/limitText';
import { useEffect, useState } from 'react';
import CakesHeader from '@/components/cakes/cakesHeader';
import { convertMoneyText } from '@/util/common/convertMoneyText';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { QUERY_KEY } from '@/constant/queryKey';
import { getWishesData } from '@/api/cakes/getWishesData';
import { postPayReady } from '@/api/cakes/postPayReady';
import { useRouter } from 'next/router';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { CakesDataType } from '@/types/cakes/cakesDataType';
import { CakesData } from '@/reocil/cakes/cakesData';

export default function Giver() {
  const [giverName, changeGiverName] = useInput('', LIMIT_TEXT.none);
  const [letter, changeLetter] = useInput('', LIMIT_TEXT[300]);
  const [selectedCake, setSelectedCake] = useState<CakeListType>(CAKE_LIST[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const setCakesData = useSetRecoilState<CakesDataType>(CakesData);
  const router = useRouter();

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

  const queryClient = useQueryClient();
  queryClient.invalidateQueries(QUERY_KEY.payReady);

  //관심사 분리해야됨
  // 전달하는 케이크 주인 정보 가져오기
  const { data: wishesData } = useQuery(QUERY_KEY.wishesData, async () => getWishesData(7), {});

  const { mutate } = useMutation(
    QUERY_KEY.payReady,
    () => postPayReady(giverName, selectedCake.cakeNumber),
    {
      onSuccess: (data) => {
        const nextLink = data.data.data.next_redirect_pc_url;
        const tid = data.data.data.tid;

        setCakesData((prevData) => ({
          ...prevData,
          tid: tid,
        }));

        router.replace(nextLink);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  return (
    <>
      <CakesHeader dayCount={wishesData?.dayCount} />

      <Styled.Title>{wishesData?.title}</Styled.Title>

      {/* API 데이터 */}
      <InputContainer>
        <InputTitle title={`${wishesData?.name}님이 남긴 선물에 대한 힌트`} />
        <TextareaBox>{wishesData?.hint}</TextareaBox>
      </InputContainer>

      <InputContainer>
        <InputTitle title={'본인의 실명 작성하기'} />
        <InputBox>
          <Styled.InputText
            onChange={changeGiverName}
            value={giverName}
            placeholder="성과 이름 모두 정확하게 작성해주세요. ex. 홍길동"
          />
        </InputBox>
      </InputContainer>

      <InputContainer>
        <InputTitle title={'보내고 싶은 케이크 선택하기'} />

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
        <TextareaBox>
          <Styled.TextareaImageWrapper>
            <Image src={selectedCake.detailImage} alt="케이크 상세 이미지" />
          </Styled.TextareaImageWrapper>
        </TextareaBox>
        <Styled.CakeInfo>
          {selectedCake.name} {convertMoneyText(selectedCake.price)}원
        </Styled.CakeInfo>
      </InputContainer>

      <InputContainer>
        <InputTitle title={'친구에게 편지 남기기'} />
        <TextareaBox>
          <Styled.TextareaText
            onChange={changeLetter}
            value={letter}
            placeholder={`ex. 너 도대체 원하는 게 모야?\n나 넘 궁금해. 일단 몸보신 한우 케이크 보태겠어`}
          />
          <Styled.TextareaLengthWrapper>
            <div />
            <InputLength inputLength={letter.length} limit={LIMIT_TEXT[300]} />
          </Styled.TextareaLengthWrapper>
        </TextareaBox>
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
  TextareaImageWrapper: styled.div`
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
    ${theme.fonts.button16};
    color: ${theme.colors.main_blue};

    display: flex;
    justify-content: center;

    margin-top: 1rem;
  `,

  ButtonText: styled.div`
    ${theme.fonts.button16};
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
