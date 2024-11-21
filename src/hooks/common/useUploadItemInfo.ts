import { getPresignedURL, uploadPresignedURL } from '@/api/file';
import { validation } from '@/validation/input';
import { useEffect, useState } from 'react';

export function useUploadItemInfo() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [signedURL, setSignedURL] = useState('');
  const [filename, setFilename] = useState('');

  useEffect(() => {
    if (!signedURL || !filename) return;

    try {
      uploadPresignedURL(signedURL, imageFile).then((signedResponse) => {
        if (signedResponse.status) {
          const S3_URL = `${process.env.NEXT_PUBLIC_S3_URL}/${filename}`;
          setImageUrl(S3_URL);
        }
      });
    } catch (error) {}
  }, [signedURL, filename]);

  useEffect(() => {
    if (imageFile && validation.checkImageFileSize(imageFile.size)) {
      try {
        getPresignedURL(imageFile.name).then((presignedResponse) => {
          if (presignedResponse.status) {
            const signedURL = presignedResponse.data.data.signedUrl;
            const filename = presignedResponse.data.data.filename;
            setSignedURL(signedURL);
            setFilename(filename);
          }
        });
      } catch (error) {}
    }
  }, [imageFile]);

  function uploadImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const imageFile = e.target.files && e.target.files[0];
    imageFile && setImageFile(imageFile);
  }

  return { imageFile, imageUrl, setImageUrl, uploadImageFile };
}
