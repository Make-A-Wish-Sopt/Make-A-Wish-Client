import InputContainer from '@/components/common/input/inputContainer';
import ItemLink from './itemLink';
import InputBox from '@/components/common/input/inputBox';
import useInput from '@/hooks/common/useInput';
import { LIMIT_TEXT } from '@/constant/limitText';
import theme from '@/styles/theme';
import { useEffect, useState } from 'react';
import BasicBox from '@/components/common/box/BasicBox';
import Button from '@/components/common/button/button';
import { useGetItemInfo } from '@/hooks/queries/wishes/useGetItemInfo';
import { useSetRecoilState } from 'recoil';
import { WishesData } from '@/recoil/formPage/wishesData';
import styled from 'styled-components';
import { ToggleButton } from 'react-bootstrap';

interface WishesStep1Props {
  handleNextStep: () => void;
}

export default function WishesStep1(props: WishesStep1Props) {
  const { handleNextStep } = props;
  const setWishesData = useSetRecoilState(WishesData);
  const [linkURL, handleChangeLinkURL] = useInput('');
  const [isCorrectLink, setIsCorrectLink] = useState(false);
  const { imageURL, price, isSuccess } = useGetItemInfo(isCorrectLink, linkURL);
  const [initial, handleChangeInitial] = useInput('', LIMIT_TEXT[15]);
  const [isNextStepAvailable, setIsNextStepAvailable] = useState(false);

  const [isLinkLoadType, setIsLinkLoadType] = useState(true); //false : 링크 불러오기 true : 직접 불러오기

  useEffect(() => {
    isSuccess && isCorrectLink && initial
      ? setIsNextStepAvailable(true)
      : setIsNextStepAvailable(false);
  }, [initial]);

  const nextStep = () => {
    //아이템 데이터의 유효성 정보에 대한 체크 조건 추가해야됨
    if (isNextStepAvailable) {
      handleNextStep();
      saveData();
    }
  };

  const saveData = () => {
    setWishesData((prev) => ({
      ...prev,
      imageURL: imageURL,
      price: price,
      initial: initial,
    }));
  };

  const handleLoadTypeToggle = (state: boolean) => {
    setIsLinkLoadType(state);
  };

  const changeValidation = (state: boolean) => {
    setIsCorrectLink(state);
  };
  return (
    <>
      <Styled.ButtonContainer>
        <Styled.ToggleButton
          onClick={() => handleLoadTypeToggle(true)}
          fontColor={isLinkLoadType ? theme.colors.white : theme.colors.main_blue}
          bgColor={isLinkLoadType ? theme.colors.main_blue : 'transparent'}
        >
          선물 링크 불러오기
        </Styled.ToggleButton>
        <Styled.ToggleButton
          onClick={() => handleLoadTypeToggle(false)}
          fontColor={isLinkLoadType ? theme.colors.main_blue : theme.colors.white}
          bgColor={isLinkLoadType ? 'transparent' : theme.colors.main_blue}
        >
          선물 직접 등록하기
        </Styled.ToggleButton>
      </Styled.ButtonContainer>
      <InputContainer title="">
        <ItemLink
          linkURL={linkURL}
          handleChangeLinkURL={handleChangeLinkURL}
          changeValidation={changeValidation}
          isSuccess={isSuccess}
          imageURL={imageURL}
          price={price}
        />
      </InputContainer>

      <InputContainer title="선물의 초성 적어보기">
        <InputBox
          placeholder="ex. 애플워치 -> ㅇㅍㅇㅊ"
          handleChangeValue={handleChangeInitial}
          value={initial}
          limitLength={LIMIT_TEXT[15]}
        />
      </InputContainer>

      <BasicBox
        bgColor={isNextStepAvailable ? theme.colors.main_blue : theme.colors.gray1}
        fontColor={theme.colors.white}
        font={theme.fonts.button16}
        borderColor={'transparent'}
      >
        <Button handleClick={nextStep} fontColor={theme.colors.white}>
          다음
        </Button>
      </BasicBox>
    </>
  );
}

const Styled = {
  ButtonContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 33.1rem;
    height: 5.8rem;

    margin-bottom: 2rem;

    border-radius: 4.9rem;
    background-color: ${theme.colors.pastel_blue};
    padding: 0.5rem;
  `,

  ToggleButton: styled.div<{ fontColor: string; bgColor: string }>`
    display: flex;
    justify-content: center;
    align-items: center;

    ${theme.fonts.body16};
    color: ${(props) => props.fontColor};

    width: 16rem;
    height: 4.8rem;

    border-radius: 4rem;
    background-color: ${(props) => props.bgColor};

    cursor: pointer;
  `,
};
