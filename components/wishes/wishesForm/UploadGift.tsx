import InputContainer from '@/components/common/input/inputContainer';
import styled from 'styled-components';
import ItemImageBox from './itemImageBox';
import LargeBox from '@/components/common/box';
import theme from '@/styles/theme';
import { ImageUploadIc } from '@/public/assets/icons';
import Image from 'next/image';
import InputLength from '@/components/common/input/inputLength';
import Input from '@/components/common/input/input';
import { LIMIT_TEXT } from '@/constant/limitText';
import { ChangeEvent } from 'react';
import { validation } from '@/validation/input';
import AlertTextBox from '@/components/common/alertTextBox';
import { UseFormReturn } from 'react-hook-form';
import { Step1InputType } from '@/types/common/input/wishesInput';

interface UploadGiftProps {
  imageFile: File | Blob | null;
  preSignedImageURL: string;
  uploadImageFile: (e: ChangeEvent<HTMLInputElement>) => void;
  methods: UseFormReturn<Step1InputType, any, undefined>;
}

export default function UploadGift(props: UploadGiftProps) {
  const { imageFile, preSignedImageURL, uploadImageFile, methods } = props;
  return (
    <>
      <InputContainer title="갖고 싶은 선물 이미지 등록하기">
        <Styled.Lable>
          {preSignedImageURL ? (
            <ItemImageBox imageURL={preSignedImageURL} />
          ) : (
            <LargeBox
              bgColor={theme.colors.pastel_blue}
              font={theme.fonts.body14}
              fontColor={theme.colors.main_blue}
            >
              ※ 등록 가능한 사진파일 <br />• 파일용량 : 10MB 이하
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
        {imageFile && !validation.checkImageFileSize(imageFile.size) && (
          <AlertTextBox> 사진은 10MB 이하로 업로드해주세요!</AlertTextBox>
        )}
      </InputContainer>

      <InputContainer title="선물 가격 입력하기">
        <Input placeholder="ex. 12,000,000" register={methods.register('price')}>
          <InputLength
            inputLength={Number(methods.watch('price').toString().length)}
            limitLength={LIMIT_TEXT[15]}
          />
        </Input>
      </InputContainer>
    </>
  );
}

const Styled = {
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
