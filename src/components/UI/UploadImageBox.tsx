'use client';

import Image from 'next/image';
import { UploadImageLogoIc } from '../../../public/assets/icons';

export function UploadImageBox({
  preSignedImageUrl,
  handleUploadImageFile,
}: {
  preSignedImageUrl: string;
  handleUploadImageFile?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label>
      <div className="flex justify-center items-center w-full h-220 bg-dark_green text-gray2 rounded-xl">
        {preSignedImageUrl ? (
          <Image src={preSignedImageUrl} alt="등록한 사진 이미지" width={100} height={100} />
        ) : (
          <Image src={UploadImageLogoIc} alt="파일 업로드 아이콘" />
        )}
      </div>

      <input
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleUploadImageFile}
        disabled={handleUploadImageFile === undefined}
        readOnly
        style={{ display: 'none' }}
      ></input>
    </label>
  );
}
