import InputContainer from '@/components/Common/Input/InputContainer';
import styled from 'styled-components';
import { ImageUploadIc } from '@/public/assets/icons';
import Image from 'next/image';
import InputLength from '@/components/Common/Input/InputLength';
import Input from '@/components/Common/Input/Input';
import { LIMIT_TEXT } from '@/constant/limitText';
import { ChangeEvent, useEffect } from 'react';
import { validation } from '@/validation/input';
import AlertTextBox from '@/components/Common/AlertTextBox';
import { UseFormReturn } from 'react-hook-form';
import ImageBox from '@/components/Common/Box/ImageBox';
import ItemImageBox from '@/components/Common/Box/ItemImageBox';
import { WishesDataInputType } from '@/types/wishesType';

interface UploadPresentProps {
  imageFile: File | Blob | null;
  preSignedImageUrl: string;
  uploadImageFile: (e: ChangeEvent<HTMLInputElement>) => void;
  methods: UseFormReturn<WishesDataInputType, any, undefined>;
  progressStatus?: 'WHILE' | 'BEFORE' | 'END';
}

export default function UploadPresent(props: UploadPresentProps) {
  const { imageFile, preSignedImageUrl, uploadImageFile, methods, progressStatus } = props;

  useEffect(() => {
    if (preSignedImageUrl) methods.setValue('imageUrl', preSignedImageUrl);
  }, [preSignedImageUrl]);

  return (
    <>
      <InputContainer title="갖고 싶은 선물 이미지 등록하기">
        <Styled.Label>
          {methods.watch('imageUrl') ? (
            <ItemImageBox src={methods.watch('imageUrl')} alt="선물 이미지" />
          ) : (
            <ImageBox boxType="imageBox--image" colorSystem="pastelBlue_darkBlue">
              <Styled.UploadImageBox>
                <Image src={ImageUploadIc} alt="업로드 아이콘" />
              </Styled.UploadImageBox>
            </ImageBox>
          )}
          <Styled.FileInput
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={uploadImageFile}
            readOnly
          />
        </Styled.Label>
        {imageFile && !validation.checkImageFileSize(imageFile.size) && (
          <AlertTextBox> 사진은 10MB 이하로 업로드해주세요!</AlertTextBox>
        )}
      </InputContainer>

      <InputContainer title="선물 가격 입력하기">
        <Input
          inputType="number"
          boxType="inputBox--large"
          placeholder="ex. 12,000,000"
          register={methods.register('price', { required: true })}
          readOnly={progressStatus === 'WHILE'}
        >
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

  Label: styled.label`
    cursor: pointer;
  `,

  FileInput: styled.input`
    display: none;
  `,

  ButtonWrapper: styled.div`
    margin-bottom: 4.6rem;
  `,
};
