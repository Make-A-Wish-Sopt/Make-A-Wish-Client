'use client';

import React from 'react';
import Image from 'next/image';
import { UploadImageLogoIc } from '../../../public/assets/icons';

export const UploadImageBox = React.memo(function UploadImageBox({
  imageUrl,
  handleUploadImageFile,
}: {
  imageUrl: string;
  handleUploadImageFile?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label>
      <div className="flex justify-center items-center w-full h-220 bg-dark_green text-gray2 rounded-xl relative">
        {imageUrl ? (
          <Image src={imageUrl} alt="등록한 사진 이미지" fill style={{ borderRadius: '1rem' }} />
        ) : (
          <Image src={UploadImageLogoIc} alt="파일 업로드 아이콘" width={70} />
          // 이미지가 (덜커덩 거리면서 등록되는거)이상하게 등록되는거 수정해야됩니다.
        )}
      </div>

      <input
        className="hidden"
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleUploadImageFile}
        disabled={handleUploadImageFile === undefined}
        readOnly
      />
    </label>
  );
});
