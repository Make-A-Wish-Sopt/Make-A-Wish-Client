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

interface WishesStep1Props {
  handleNextStep: () => void;
}

export default function WishesStep1(props: WishesStep1Props) {
  const { handleNextStep } = props;
  const [linkURL, handleChangeLinkURL] = useInput('');
  const [isCorrectLink, setIsCorrectLink] = useState(false);
  const { imageURL, price, isSuccess } = useGetItemInfo(isCorrectLink, linkURL);
  const [initial, handleChangeInitial] = useInput('', LIMIT_TEXT[15]);
  const [isNextStepAvailable, setIsNextStepAvailable] = useState(false);

  const setWishesData = useSetRecoilState(WishesData);

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

  const changeValidation = (state: boolean) => {
    setIsCorrectLink(state);
  };
  return (
    <>
      <InputContainer title="갖고싶은 선물 링크 불러오기">
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
        font={theme.fonts.button18}
        borderColor={'transparent'}
      >
        <Button handleClick={nextStep} fontColor={theme.colors.white}>
          다음
        </Button>
      </BasicBox>
    </>
  );
}
