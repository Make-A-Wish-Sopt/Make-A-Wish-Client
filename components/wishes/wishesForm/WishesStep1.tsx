import InputContainer from '@/components/common/input/inputContainer';
import ItemLink from './itemLink';
import { LIMIT_TEXT } from '@/constant/limitText';
import { useState } from 'react';
import Button from '@/components/common/button';
import styled from 'styled-components';
import useUploadItemInfo from '@/hooks/wishes/useUploadItemInfo';
import UploadTypeToggleBtn from '@/components/common/uploadTypeToggleBtn';
import { WishesDataInputType } from '@/types/common/input/wishesInput';
import { UseFormReturn } from 'react-hook-form';
import Input from '@/components/common/input/input';
import InputLength from '@/components/common/input/inputLength';
import UploadGift from './UploadGift';
import SiteList from './SiteList';

interface WishesStep1Props {
  methods: UseFormReturn<WishesDataInputType, any, undefined>;
  handleNextStep: () => void;
}

export default function WishesStep1(props: WishesStep1Props) {
  const { methods, handleNextStep } = props;
  const { imageFile, preSignedImageURL, uploadImageFile } = useUploadItemInfo();

  const [isLinkLoadType, setIsLinkLoadType] = useState(true); //false : 링크 불러오기 true : 직접 불러오기

  const nextStep = () => {
    handleNextStep();
  };

  const handleLoadTypeToggle = (state: boolean) => {
    setIsLinkLoadType(state);
  };

  return (
    <Styled.Container>
      <div>
        <UploadTypeToggleBtn
          isLinkLoadType={isLinkLoadType}
          handleLoadTypeToggle={handleLoadTypeToggle}
        />

        {isLinkLoadType ? (
          <>
            <SiteList />
            <ItemLink methods={methods} />
          </>
        ) : (
          <UploadGift
            imageFile={imageFile}
            preSignedImageURL={preSignedImageURL}
            uploadImageFile={uploadImageFile}
            methods={methods}
          />
        )}

        <InputContainer title="선물의 초성 적어보기">
          <Input
            boxType="inputBox--large"
            placeholder="ex. 애플워치 -> ㅇㅍㅇㅊ"
            register={methods.register('initial')}
          >
            <InputLength
              inputLength={methods.watch('initial').length}
              limitLength={LIMIT_TEXT[15]}
            />
          </Input>
        </InputContainer>
      </div>

      <Styled.ButtonWrapper>
        <Button boxType="btn--large" colorSystem="mainBlue_white" handleClickFn={nextStep}>
          다음
        </Button>
      </Styled.ButtonWrapper>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100svh;
  `,

  UploadImageBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 1.3rem;

    cursor: pointer;
  `,

  Lable: styled.label`
    cursor: pointer;
  `,

  FileInput: styled.input`
    display: none;
  `,

  ButtonWrapper: styled.div`
    margin-bottom: 4.6rem;
  `,
};
