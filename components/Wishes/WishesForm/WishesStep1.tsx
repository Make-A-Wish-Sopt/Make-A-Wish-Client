import InputContainer from '@/components/Common/Input/InputContainer';
import ItemLink from './ItemLink';
import { LIMIT_TEXT } from '@/constant/limitText';
import { ChangeEvent, PropsWithChildren, useEffect, useState } from 'react';
import styled from 'styled-components';
import UploadTypeToggleBtn from '@/components/Common/UploadTypeToggleBtn';
import { WishesDataInputType } from '@/types/wishesType';
import { UseFormReturn } from 'react-hook-form';
import Input from '@/components/Common/Input/Input';
import InputLength from '@/components/Common/Input/InputLength';
import UploadPresent from './UploadPresent';
import SiteList from './SiteList';
import { validation } from '@/validation/input';
import { ColorSystemType } from '@/types/common/box/boxStyleType';
import WishesStepTitle from '../Common/WishesStepTitle';
import WishesStepBtn from '../Common/WishesStepBtn';
import { rules_initial } from '@/validation/rules';

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
  imageFile: File | Blob | null;
  preSignedImageUrl: string;
  uploadImageFile: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function WishesStep1(props: PropsWithChildren<WishesStep1Props>) {
  const { methods, wishesStep, imageFile, preSignedImageUrl, uploadImageFile } = props;
  const [isLinkLoadType, setIsLinkLoadType] = useState(false); //false : 링크 불러오기 true : 직접 불러오기

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
        Number(methods.getValues('price')) > 0 &&
        Number(methods.getValues('price')) <= 12000000
      ) {
        wishesStep.changeNextState(true);
      }
    }
  }, [methods.watch()]);

  return (
    <>
      <WishesStepTitle title="소원링크 생성하기" />
      <Styled.Container>
        <div>
          {/* <UploadTypeToggleBtn
            isLinkLoadType={isLinkLoadType}
            handleLoadTypeToggle={handleLoadTypeToggle}
          /> */}

          {isLinkLoadType ? (
            <>
              <SiteList />
              <ItemLink methods={methods} />
            </>
          ) : (
            <UploadPresent
              imageFile={imageFile}
              preSignedImageUrl={preSignedImageUrl}
              uploadImageFile={uploadImageFile}
              methods={methods}
            />
          )}

          <InputContainer title="선물의 초성 적어보기">
            <Input
              boxType="inputBox--large"
              placeholder="ex. 애플워치 -> ㅇㅍㅇㅊ"
              register={methods.register('initial', {
                ...rules_initial,
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
    </>
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
