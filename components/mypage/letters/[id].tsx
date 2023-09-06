import theme from '@/styles/theme';
import styled from 'styled-components';
import InputHeader from '@/components/common/inputHeader';
import BackBtn from '@/components/common/button/backBtn';
import CakeListButton from './cakeListButton';
import Image from 'next/image';
import { BorderImg } from '@/public/assets/images';
import { useEffect, useState } from 'react';
import { ArrowLeftIc, ArrowRightIc, BackBtnIc } from '@/public/assets/icons';
import { useRouter } from 'next/router';
import { useGetCakesLetters } from '@/hooks/queries/letters/useGetCakeLetters';
import { CAKE_LIST } from '@/constant/cakeList';
import Layout from '@/components/common/layout';

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

  // 케이크 정보, 개수
  const { cake } = router.query;
  const cakeData = CAKE_LIST.find((cake) => cake.cakeNumber === Number(cakeId));

  // 편지
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

  const handleMoveBack = () => {
    window.history.back();
  }


  return (
    <>
      <InputHeader>
        <Image
          src={BackBtnIc}
          alt="뒤로가기"
          style={{ cursor: 'pointer' }}
          onClick={handleMoveBack}
        />
      </InputHeader>

      <CakeListButton
        backgroundColor={'transparent'}
        fontColor={theme.colors.black}
        fonts={theme.fonts.headline20}
        image={cakeData ? cakeData.smallImage : ''}
        cakeName={cakeData?.name}
        cakeNum={Number(cake)}
      />

      <Styled.Text>
        {cakeData?.name}를 보낸 선물주님들이
        <br />
        남긴 편지를 읽어보세요
      </Styled.Text>

      <Styled.Title>{`'${lettersData[clickedBox]?.name}' 선물주님`}</Styled.Title>
      <Styled.LetterContainer>
        <Styled.ArrowButton onClick={() => handleArrowClick('left')}>
          <Image src={ArrowLeftIc} alt="왼쪽 화살표" />
        </Styled.ArrowButton>

        <Styled.TextareaText value={lettersData[clickedBox]?.message} readOnly />

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
    </>
  );
}

const Styled = {
  Title: styled.div`
    ${theme.fonts.body16};
    color: ${theme.colors.main_blue};
    margin: 0 0 2rem 1rem;
  `,

  Text: styled.div`
    ${theme.fonts.body16};
    color: ${theme.colors.dark_blue};
    margin: 1rem 1rem 2rem;
  `,

  LetterContainer: styled.div`
    margin: 0 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  ArrowButton: styled.button``,

  TextareaText: styled.textarea`
    width: 100%;
    height: 15rem;
    color: ${theme.colors.dark_blue};
    ${theme.fonts.body14};
    resize: none;
    background-color: ${theme.colors.pastel_blue};
    border: 0.1rem solid ${theme.colors.main_blue};
    border-radius: 1rem;
    padding: 1.2rem 1rem 1.2rem 1.2rem;
  `,

  NameContainer: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-column-gap: 1.2rem;
    grid-row-gap: 1rem;
    margin: 1rem 0 2rem;
    color: ${theme.colors.white};
    ${theme.fonts.body14};
    overflow: auto;
    max-height: 45vh;
  `,

  NameBox: styled.div<{ active: boolean }>`
    width: 7.4rem;
    height: 4.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.8rem;
    border-radius: 0.6rem;
    background-color: ${(props) =>
      props.active ? theme.colors.main_blue : theme.colors.pastel_blue};
    color: ${(props) => (props.active ? theme.colors.white : theme.colors.main_blue)};
    cursor: pointer;
  `,
};
