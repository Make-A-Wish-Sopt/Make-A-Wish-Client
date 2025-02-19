'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { UploadImageLogoIc } from '../../../public/assets/icons';
import { useImageContext } from '@/Context/imageContext';

export const UploadImageBox = React.memo(function UploadImageBox() {
  const { imageUrl, uploadImageFile } = useImageContext();
  const [imageAspectRatio, setImageAspectRatio] = useState(331 / 220); // 초기값: 331:220 비율

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    setImageAspectRatio(naturalWidth / naturalHeight); // 업로드된 이미지의 비율로 변경
  };

  return (
    <label>
      <div
        className="relative w-full bg-dark_green text-gray2 rounded-xl overflow-hidden"
        style={{
          aspectRatio: `${imageAspectRatio}`, // 이미지 비율에 따라 높이 설정
        }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="등록한 사진 이미지"
            fill
            style={{
              objectFit: 'cover', // 이미지를 비율에 맞게 채움
              objectPosition: 'center', // 중심 정렬
            }}
            onLoad={handleImageLoad} // 이미지 로드 후 비율 계산
          />
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <Image
              src={UploadImageLogoIc}
              alt="파일 업로드 아이콘"
              width={70}
              height={70}
              style={{
                objectFit: 'contain',
              }}
            />
          </div>
        )}
      </div>

      <input
        className="hidden"
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={uploadImageFile}
        // disabled={handleUploadImageFile === undefined}
        readOnly
      />
    </label>
  );
});
