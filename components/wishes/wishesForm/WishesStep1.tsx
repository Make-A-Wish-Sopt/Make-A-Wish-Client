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
import LargeBox from '@/components/common/box/LargeBox';
import Image from 'next/image';
import { ImageUploadIc } from '@/public/assets/icons';
import useUploadItemInfo from '@/hooks/wishes/useUploadItemInfo';
import ItemImageBox from './itemImageBox';
import UploadTypeToggleBtn from '@/components/common/uploadTypeToggleBtn';
import { validation } from '@/validation/input';

interface WishesStep1Props {
  handleNextStep: () => void;
}

export default function WishesStep1(props: WishesStep1Props) {
  const { handleNextStep } = props;
  const setWishesData = useSetRecoilState(WishesData);

  const { linkURL, handleChangeLinkURL, imageURL, changeImageURL, price, changePrice } =
    useGetItemInfo();
  const { imageFile, previewImage, uploadImageFile } = useUploadItemInfo();
  const [initial, handleChangeInitial] = useInput('', LIMIT_TEXT[15]);
  const [isNextStepAvailable, setIsNextStepAvailable] = useState(false);
  const [isLinkLoadType, setIsLinkLoadType] = useState(true); //false : 링크 불러오기 true : 직접 불러오기
  const [selfInputPrice, handleChangeSelfInputPrice] = useInput('', LIMIT_TEXT[15]);

  useEffect(() => {
    imageURL && validation.isCorrectSite(linkURL) && initial
      ? setIsNextStepAvailable(true)
      : setIsNextStepAvailable(false);
  }, [initial, imageURL]);

  const nextStep = () => {
    //아이템 데이터의 유효성 정보에 대한 체크 조건 추가해야됨
    if (isNextStepAvailable) {
      handleNextStep();
      saveData();
    }
  };

  const saveData = () => {
    if (isLinkLoadType) {
      setWishesData((prev) => ({
        ...prev,
        imageURL: imageURL,
        price: price,
        initial: initial,
      }));
    } else {
      setWishesData((prev) => ({
        ...prev,
        imageURL: imageURL,
        price: Number(selfInputPrice),
        initial: initial,
      }));
    }
  };

  const handleLoadTypeToggle = (state: boolean) => {
    setIsLinkLoadType(state);
  };

  return (
    <>
      <UploadTypeToggleBtn
        isLinkLoadType={isLinkLoadType}
        handleLoadTypeToggle={handleLoadTypeToggle}
      />
      {isLinkLoadType ? (
        <InputContainer title="">
          <ItemLink
            linkURL={linkURL}
            handleChangeLinkURL={handleChangeLinkURL}
            imageURL={imageURL}
            changeImageURL={changeImageURL}
            price={price}
            changePrice={changePrice}
          />
        </InputContainer>
      ) : (
        <>
          <InputContainer title="갖고 싶은 선물 이미지 등록하기">
            <Styled.Lable>
              {previewImage ? (
                <ItemImageBox imageURL={previewImage} />
              ) : (
                <LargeBox bgColor={theme.colors.pastel_blue}>
                  <Styled.UploadImageBox>
                    <Image src={ImageUploadIc} alt="업로드 아이콘" />
                  </Styled.UploadImageBox>
                </LargeBox>
              )}
              <Styled.FileInput
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={uploadImageFile}
                readOnly
              />
            </Styled.Lable>
          </InputContainer>

          <InputContainer title="선물 가격 입력하기">
            <InputBox
              placeholder="ex. 12,000,000"
              handleChangeValue={handleChangeSelfInputPrice}
              value={selfInputPrice}
              limitLength={LIMIT_TEXT[15]}
            />
          </InputContainer>
        </>
      )}

      <InputContainer title="선물의 초성 적어보기">
        <InputBox
          placeholder="ex. 애플워치 -> ㅇㅍㅇㅊ"
          handleChangeValue={handleChangeInitial}
          value={initial}
          limitLength={LIMIT_TEXT[15]}
        />
      </InputContainer>

      <Styled.ButtonWrapper>
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
      </Styled.ButtonWrapper>
    </>
  );
}

const Styled = {
  UploadImageBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    cursor: pointer;
  `,

  Lable: styled.label`
    cursor: pointer;
  `,

  FileInput: styled.input`
    display: none;
  `,

  ButtonWrapper: styled.div`
    position: absolute;
    bottom: 4.6rem;
  `,
};