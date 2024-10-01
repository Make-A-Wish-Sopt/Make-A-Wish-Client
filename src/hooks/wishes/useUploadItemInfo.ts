import { getPresignedURL, uploadPresignedURL } from '@/api/file';
import { validation } from '@/validation/input';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export function useUploadItemInfo() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preSignedImageUrl, setPreSignedImageUrl] = useState('');

  useEffect(() => {
    if (imageFile && validation.checkImageFileSize(imageFile.size)) {
      try {
        getPresignedURL(imageFile.name).then((presignedResponse) => {
          if (presignedResponse.status) {
            const signedUrl = presignedResponse.data.data.signedUrl;
            const filename = presignedResponse.data.data.filename;

            try {
              uploadPresignedURL(signedUrl, imageFile).then((signedResponse) => {
                if (signedResponse.status) {
                  const S3_URL = `https://wish-image-bucket.s3.ap-northeast-2.amazonaws.com/${filename}`;
                  setPreSignedImageUrl(S3_URL);
                }
              });
            } catch (error) {}
          }
        });
      } catch (error) {}
    }
  }, [imageFile]);

  function uploadImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const imageFile = e.target.files && e.target.files[0];
    imageFile && setImageFile(imageFile);
  }

  return { imageFile, preSignedImageUrl, setPreSignedImageUrl, uploadImageFile };
}
