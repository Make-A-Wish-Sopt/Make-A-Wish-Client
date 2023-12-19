import InputContainer from '@/components/common/input/inputContainer';
import ItemLink from './itemLink';
import { LIMIT_TEXT } from '@/constant/limitText';
import { PropsWithChildren, useEffect, useState } from 'react';
import styled from 'styled-components';
import useUploadItemInfo from '@/hooks/wishes/useUploadItemInfo';
import UploadTypeToggleBtn from '@/components/common/uploadTypeToggleBtn';
import { WishesDataInputType } from '@/types/common/input/wishesInput';
import { UseFormReturn } from 'react-hook-form';
import Input from '@/components/common/input/input';
import InputLength from '@/components/common/input/inputLength';
import UploadGift from './UploadGift';
import SiteList from './SiteList';
import { initial_RULES, validation } from '@/validation/input';
import { ColorSystemType } from '@/types/common/box/boxStyleType';
import WishesStepTitle from '../common/wishesStepTitle';
import WishesStepBtn from '../common/wishesStepBtn';

interface WishesStep1Props {
  methods: UseFormReturn<WishesDataInputType, any, undefined>;
  wishesStep: {
    stepIndex: number;
    prevState: boolean;
    nextState: boolean;
    changePrevState: (state: boolean) => void;
    changeNextState: (state: boolean) => void;
    handleNextStep: () => void;
    handlePrevStep: () => void;
    getNextBtnColor: (state: boolean) => ColorSystemType;
    getPrevBtnColor: (state: boolean) => ColorSystemType;
  };
}

export default function WishesStep1(props: PropsWithChildren<WishesStep1Props>) {
  const { methods, wishesStep } = props;
  const { imageFile, preSignedImageURL, uploadImageFile } = useUploadItemInfo();

  const [isLinkLoadType, setIsLinkLoadType] = useState(true); //false : 링크 불러오기 true : 직접 불러오기

  const handleLoadTypeToggle = (state: boolean) => {
    setIsLinkLoadType(state);
  };

  useEffect(() => {
    wishesStep.changeNextState(false);

    if (isLinkLoadType) {
      if (
        validation.isCorrectSite(methods.getValues('linkURL')) &&
        methods.getValues('initial').length !== 0 &&
        methods.getValues('initial').length <= 15
      ) {
        wishesStep.changeNextState(true);
      }
    } else {
      if (
        methods.getValues('initial').length !== 0 &&
        methods.getValues('initial').length <= 15 &&
        imageFile &&
        methods.getValues('price') !== '' &&
        Number(methods.getValues('price')) <= 12000000
      ) {
        wishesStep.changeNextState(true);
      }
    }
  }, [methods.watch()]);

  const onSubmit = () => {};

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <WishesStepTitle title="소원링크 생성하기" />
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
              register={methods.register('initial', {
                ...initial_RULES,
              })}
              errors={methods.formState.errors.initial}
            >
              <InputLength
                inputLength={methods.watch('initial').length}
                limitLength={LIMIT_TEXT[15]}
              />
            </Input>
          </InputContainer>
        </div>

        <WishesStepBtn wishesStep={wishesStep} />
      </Styled.Container>
    </form>
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
};
