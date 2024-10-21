import { getPresignedURL, uploadPresignedURL } from '@/api/file';
import { validation } from '@/validation/input';
import { useEffect, useState } from 'react';

export function useUploadItemInfo() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState('');
  const [signedUrl, setSignedUrl] = useState('');
  const [filename, setFilename] = useState('');

  useEffect(() => {
    if (!filename || !signedUrl) return;

    try {
      uploadPresignedURL(signedUrl, imageFile).then((signedResponse) => {
        if (signedResponse.status) {
          const S3_URL = `${process.env.NEXT_PUBLIC_S3_URL}/${filename}`;
          setImageURL(S3_URL);
        }
      });
    } catch (error) {}
  }, [filename, signedUrl]);

  useEffect(() => {
    if (!imageFile || !validation.checkImageFileSize(imageFile.size)) return;

    try {
      getPresignedURL(imageFile.name).then((presignedResponse) => {
        if (presignedResponse.status) {
          const signedUrl = presignedResponse.data.data.signedUrl;
          const filename = presignedResponse.data.data.filename;

          setSignedUrl(signedUrl);
          setFilename(filename.substring(1));
        }
      });
    } catch (error) {}
  }, [imageFile]);

  function uploadImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const imageFile = e.target.files && e.target.files[0];
    imageFile && setImageFile(imageFile);
  }

  return { imageFile, imageURL, setImageURL, uploadImageFile };
}
