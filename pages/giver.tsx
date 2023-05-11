import theme from '@/styles/theme';
import styled from 'styled-components';
import useInput from '@/hooks/useInput';
import InputHeader from '@/components/common/inputHeader';
import InputBox from '@/components/common/input/inputBox';
import InputLength from '@/components/common/input/inputLength';
import BackBtn from '@/components/common/backBtn';
import InputContainer from '@/components/common/input/inputContainer';
import InputTitle from '@/components/common/input/inputTitle';
import TextareaBox from '@/components/common/input/textareaBox';
import InputCakeBox from '@/components/common/input/inputCakeBox';
import { CAKE_LIST } from '@/constant/cakeList';
import Image from 'next/image';
import ButtonBox from '@/components/button/buttonBox';
import { LIMIT_TEXT } from '@/constant/limitText';

export default function Giver() {
  const [giverName, changeGiverName] = useInput('', LIMIT_TEXT.none);
  const [letter, changeLetter] = useInput('', LIMIT_TEXT[300]);

  return (
    <>
      <InputHeader>
        <BackBtn />
      </InputHeader>

      {/* API 데이터 */}
      <Styled.Title>✨화정이의 앙큼 벌스데이✨</Styled.Title>

      {/* API 데이터 */}
      <InputContainer>
        <InputTitle title={'ㅇㅇ님이 남긴 선물에 대한 힌트'} />
        <TextareaBox>api로 받아오는 데이터</TextareaBox>
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
          {CAKE_LIST.map((cake) => (
            <InputCakeBox isClicked={true} key={cake.name}>
              <Image src={cake.cakeImage} alt={`${cake.name}이미지`} />
            </InputCakeBox>
          ))}
        </Styled.CakeContainer>
        <TextareaBox>
          <Styled.TextareaImageWrapper>
            <Image src={CAKE_LIST[0].detailImage} alt="케이크 상세 이미지" />
          </Styled.TextareaImageWrapper>
        </TextareaBox>
        <Styled.CakeInfo></Styled.CakeInfo>
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

      <ButtonBox backgroundColor={theme.colors.main_blue} fontColor={theme.colors.white}>
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

    margin-top: 1rem;
  `,

  ButtonText: styled.div`
    ${theme.fonts.button16};
    color: ${theme.colors.white};
  `,
};
