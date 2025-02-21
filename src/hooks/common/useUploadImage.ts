'use client';

import { getPresignedURL, uploadPresignedURL } from '@/api/file';
import { validation } from '@/validation/input';
import { useEffect, useState } from 'react';

export function useUploadImage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [signedURL, setSignedURL] = useState('');
  const [filename, setFilename] = useState('');

  // 이미지를 업로드하는 비동기 함수
  const uploadImage = async () => {
    if (!signedURL || !filename || !imageFile) return;

    try {
      const signedResponse = await uploadPresignedURL(signedURL, imageFile);
      if (signedResponse.status) {
        setImageUrl(`${process.env.NEXT_PUBLIC_S3_URL}/${filename}`);
      }
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  // presigned URL을 가져오는 비동기 함수
  const fetchPresignedURL = async () => {
    if (imageFile && validation.checkImageFileSize(imageFile.size)) {
      try {
        const presignedResponse = await getPresignedURL(imageFile.name);
        if (presignedResponse.status) {
          const { signedUrl, filename } = presignedResponse.data.data;
          setSignedURL(signedUrl);
          setFilename(filename);
        }
      } catch (error) {
        console.error('Presigned URL 가져오기 실패:', error);
      }
    }
  };

  // 파일이 변경될 때마다 presigned URL을 가져옵니다.
  useEffect(() => {
    fetchPresignedURL();
  }, [imageFile]);

  // signed URL, filename, imageFile가 모두 준비되면 업로드 수행
  useEffect(() => {
    uploadImage();
  }, [signedURL, filename, imageFile]);

  // 이미지 URL 변경 함수
  const changeImageUrl = (newImageUrl: string) => setImageUrl(newImageUrl);

  // 파일 업로드 핸들러
  const uploadImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile((prevFile) => (prevFile?.name !== file.name ? file : prevFile));
    }
  };

  return { imageFile, imageUrl, changeImageUrl, uploadImageFile };
}
