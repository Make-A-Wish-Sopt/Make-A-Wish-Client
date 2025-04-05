import { getPresignedURL, uploadPresignedURL } from '@/api/file';
import { validation } from '@/validation/input';
import { useEffect, useState } from 'react';

const useUploadItemInfo = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [signedURL, setSignedURL] = useState('');
  const [filename, setFilename] = useState('');
  const [preview, setPreview] = useState('');

  // 이미지 파일이 변경될 때마다 미리보기 URL 생성
  useEffect(() => {
    if (!imageFile) {
      setPreview('');
      return;
    }

    // Blob URL 생성
    const objectUrl = URL.createObjectURL(imageFile);
    setPreview(objectUrl);

    // 컴포넌트 언마운트 시 Blob URL 해제
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  useEffect(() => {
    if (!signedURL || !filename) return;

    try {
      uploadPresignedURL(signedURL, imageFile).then((signedResponse) => {
        if (signedResponse.status) {
          const S3_URL = `${process.env.NEXT_PUBLIC_S3_URL}/${filename}`;
          setImageUrl(S3_URL);
          setPreview(S3_URL);
        }
      });
    } catch (error) {
      console.error('Upload error:', error);
    }
  }, [signedURL, filename, imageFile]);

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
      } catch (error) {
        console.error('Presigned URL error:', error);
      }
    }
  }, [imageFile]);

  function uploadImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      // 이미지 파일 타입 검증
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }
      setImageFile(file);
    }
  }

  // 리소스 정리 함수
  function clearImage() {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setImageFile(null);
    setPreview('');
    setImageUrl('');
  }

  return {
    imageFile,
    imageUrl,
    preview, // 미리보기 URL 추가
    setImageUrl,
    uploadImageFile,
    clearImage, // 정리 함수 추가
  };
};

export default useUploadItemInfo;
