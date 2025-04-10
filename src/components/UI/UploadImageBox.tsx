'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ClipLoader from 'react-spinners/ClipLoader';
import { colors } from '@/styles/styles';
import { UploadImageLogoIc } from '../../../public/assets/icons';

interface UploadImageBoxProps {
  imageUrl: string;
  handleUploadImageFile?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
}

export default function UploadImageBox({
  imageUrl,
  handleUploadImageFile,
  isLoading,
}: UploadImageBoxProps) {
  const [imageAspectRatio, setImageAspectRatio] = useState(331 / 220); // 초기값: 331:220 비율

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    setImageAspectRatio(naturalWidth / naturalHeight);
  };

  return (
    <>
      <label htmlFor="image-upload-input">
        <div
          className="relative w-full bg-dark_green text-gray2 rounded-xl overflow-hidden cursor-pointer"
          style={{ aspectRatio: `${imageAspectRatio}` }}
        >
          {isLoading && (
            <div className="absolute z-10 flex justify-center items-center w-full h-full backdrop-blur-sm bg-black/20">
              <ClipLoader color={colors.main_blue} size={50} />
            </div>
          )}

          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="등록한 사진 이미지"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              onLoad={handleImageLoad}
            />
          ) : (
            <div className="flex justify-center items-center w-full h-full">
              <Image
                src={UploadImageLogoIc}
                alt="파일 업로드 아이콘"
                width={70}
                height={70}
                style={{ objectFit: 'contain' }}
              />
            </div>
          )}
        </div>
      </label>

      <input
        id="image-upload-input"
        className="hidden"
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleUploadImageFile}
        disabled={!handleUploadImageFile}
        readOnly
      />
    </>
  );
}
