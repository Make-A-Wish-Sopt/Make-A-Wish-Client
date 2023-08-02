import theme from '@/styles/theme';
import styled from 'styled-components';
import InputHeader from '@/components/common/inputHeader';
import BackBtn from '@/components/common/backBtn';
import CakeListButton from './cakeListButton';
import CakeListText from './cakeListText';
import Image from 'next/image';

import { BeefCakeImg, BorderImg } from '@/public/assets/images';
import InputContainer from '@/components/common/input/inputContainer';
import InputTitle from '@/components/common/input/inputTitle';
import TextareaBox from '@/components/common/input/textareaBox';
import { useState } from 'react';
import { ArrowLeftIc, ArrowRightIc } from '@/public/assets/icons';
import { SNS_LIST } from '@/constant/snsList';


export default function LettersContainer() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleNameBoxClick = (index: any) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const handleMoveToLetters = () => {
  };

  return (
    <>
      <InputHeader>
        <BackBtn />
      </InputHeader>

      <CakeListButton
        handleClick={handleMoveToLetters}
        backgroundColor={"transparent"}
        fontColor={theme.colors.black}
        image={BeefCakeImg}
      >
        <CakeListText
          fonts={theme.fonts.headline20}
          cakeName={"몸보신 한우 케이크"}
          cakeNum={0} />
      </CakeListButton>

      <Styled.Text>{"몸보신 한우 케이크"}를 보낸 선물주님들이<br />남긴 편지를 읽어보세요</Styled.Text>

      <InputContainer>
        <Styled.Text2><InputTitle title={"'황유진' 선물주님"} /></Styled.Text2>

        <Styled.LetterContainer>
          <Styled.ArrowButton>
            <Image src={ArrowLeftIc} alt="왼쪽 화살표" />
          </Styled.ArrowButton>
          <TextareaBox>
            <Styled.TextareaText>
              {"너 도대체 원하는 게 모야?\n나 넘 궁금해. 일단 몸보신 한우 케이크 보태겠어"}
            </Styled.TextareaText>
          </TextareaBox>
          <Styled.ArrowButton>
            <Image src={ArrowRightIc} alt="오른쪽 화살표" />
          </Styled.ArrowButton>
        </Styled.LetterContainer>

        <Image src={BorderImg} alt="구분선" />

        <Styled.NameContainer>
          {/* 예시. 수정할 예정 */}
          {SNS_LIST.map((sns, index) => (
            <Styled.NameBox
              key={sns.name}
              active={index === activeIndex}
              onClick={() => handleNameBoxClick(index)}
            >
              {sns.name}
            </Styled.NameBox>
          ))}
        </Styled.NameContainer>

      </InputContainer>
    </>
  );
}

const Styled = {
  Text: styled.div`
  ${theme.fonts.body16};
  color: ${theme.colors.dark_blue};
  margin: 1rem 1rem;
  `,

  Text2: styled.div`
${theme.fonts.body16};
color: ${theme.colors.dark_blue};
margin: 2.5rem 1rem 0;
`,

  LetterContainer: styled.div`
margin: 0 0 1rem;
display: flex;
align-items: center;
justify-content: space-between;
`,

  ArrowButton: styled.button`
  `,

  LetterText: styled.div`
  ${theme.fonts.body16};
  color: ${theme.colors.dark_blue};
  margin: 0 1rem 2rem;
  `,

  TextareaText: styled.textarea`
  width: 100%;
  height: 13rem;
  color: ${theme.colors.dark_blue};
  ${theme.fonts.body14};
  `,

  NameContainer: styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
grid-template-rows: 1fr 1fr;
grid-column-gap: 1.2rem;
grid-row-gap: 1rem;
margin: 1rem 0 2rem;
color: ${theme.colors.white};
  ${theme.fonts.body12};
`,

  NameBox: styled.div<{ active: boolean; }>`
width: 7.4rem;
height: 4.6rem;
display: flex;
justify-content: center;
align-items: center;
padding: 0.8rem 1.4rem;
border-radius: 0.6rem;
background-color: ${props => (props.active ? theme.colors.main_blue : theme.colors.pastel_blue)};
cursor: pointer;
`,
};