import theme from '@/styles/theme';
import styled from 'styled-components';
import InputHeader from '@/components/common/inputHeader';
import BackBtn from '@/components/common/backBtn';
import CakeListButton from './cakeListButton';
import CakeListText from './cakeListText';
import Image from 'next/image';
import { BorderImg } from '@/public/assets/images';
import InputContainer from '@/components/common/input/inputContainer';
import InputTitle from '@/components/common/input/inputTitle';
import TextareaBox from '@/components/common/input/textareaBox';
import { useEffect, useState } from 'react';
import { ArrowLeftIc, ArrowRightIc } from '@/public/assets/icons';
import { useRouter } from 'next/router';
import { useGetCakesLetters } from '@/hooks/queries/letters/useGetCakeLetters';
import { useRecoilValue } from 'recoil';
import { CakesCountData } from '@/recoil/cakesCountData';

export default function LettersContainer() {
  const [wishId, setWishId] = useState<string | string[] | undefined>('');
  const [cakeId, setCakeId] = useState<string | string[] | undefined>('');
  const [clickedBox, setClickedBox] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    setWishId(router.query.id);
    setCakeId(router.query.cakeId);
  }, [router.isReady]);


  const selectedCake = useRecoilValue(CakesCountData).find(cake => cake.cakeId === Number(cakeId));

  const { lettersData, lettersSum } = useGetCakesLetters(wishId, cakeId);

  const handleNameBoxClick = (index: number) => {
    setClickedBox(index);
  };

  const handleArrowClick = (direction: string) => {
    let movedBox = clickedBox;

    if (direction === 'left') {
      movedBox = (movedBox - 1 + lettersSum) % lettersSum;
    } else if (direction === 'right') {
      movedBox = (movedBox + 1) % lettersSum;
    }

    setClickedBox(movedBox);
  };


  return (
    <>
      <InputHeader>
        <BackBtn />
      </InputHeader>

      <CakeListButton
        backgroundColor={"transparent"}
        fontColor={theme.colors.black}
        image={selectedCake ? selectedCake.imageUrl : ''}
      >
        <CakeListText
          fonts={theme.fonts.headline20}
          cakeName={selectedCake?.name}
          cakeNum={selectedCake?.count}
        />
      </CakeListButton>

      <Styled.Text>{selectedCake?.name}를 보낸 선물주님들이<br />남긴 편지를 읽어보세요</Styled.Text>

      <InputContainer>
        <Styled.Text2>
          <InputTitle title={`'${lettersData[clickedBox]?.name}' 선물주님`} />
        </Styled.Text2>

        <Styled.LetterContainer>
          <Styled.ArrowButton onClick={() => handleArrowClick('left')}>
            <Image src={ArrowLeftIc} alt="왼쪽 화살표" />
          </Styled.ArrowButton>
          <TextareaBox>
            <Styled.TextareaText
              value={lettersData[clickedBox]?.content}
              readOnly
            />
          </TextareaBox>
          <Styled.ArrowButton onClick={() => handleArrowClick('right')}>
            <Image src={ArrowRightIc} alt="오른쪽 화살표" />
          </Styled.ArrowButton>
        </Styled.LetterContainer>

        <Image src={BorderImg} alt="구분선" />

        <Styled.NameContainer>
          {lettersData.map((letters, index) => (
            <Styled.NameBox
              key={letters.name}
              active={index === clickedBox}
              onClick={() => handleNameBoxClick(index)}
            >
              {letters.name}
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
  overflow: auto;
  max-height: 45vh;
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
color: ${props => (props.active ? theme.colors.white : theme.colors.main_blue)};
cursor: pointer;
`,
};