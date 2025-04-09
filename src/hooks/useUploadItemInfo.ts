import { getPresignedURL, uploadPresignedURL } from '@/api/file';
import { validation } from '@/Schema/input';
import { useEffect, useState } from 'react';

const useUploadItemInfo = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [signedURL, setSignedURL] = useState('');
  const [filename, setFilename] = useState('');
  const [preview, setPreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 이미지 파일이 변경될 때마다 미리보기 URL 생성
  useEffect(() => {
    if (!imageFile) {
      setPreview('');
      return;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  // 업로드 수행
  useEffect(() => {
    if (!signedURL || !filename || !imageFile) return;

    const uploadImage = async () => {
      try {
        setIsLoading(true);
        const signedResponse = await uploadPresignedURL(signedURL, imageFile);
        if (signedResponse.status) {
          const S3_URL = `${process.env.NEXT_PUBLIC_S3_URL}/${filename}`;
          setImageUrl(S3_URL);
          setPreview(S3_URL);
        }
      } catch (error) {
        console.error('Upload error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    uploadImage();
  }, [signedURL, filename, imageFile]);

  // presigned URL 요청
  useEffect(() => {
    if (imageFile && validation.checkImageFileSize(imageFile.size)) {
      const fetchPresignedURL = async () => {
        try {
          setIsLoading(true);
          const res = await getPresignedURL(imageFile.name);
          if (res.status) {
            const { signedUrl, filename } = res.data.data;
            setSignedURL(signedUrl);
            setFilename(filename);
          }
        } catch (error) {
          console.error('Presigned URL error:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPresignedURL();
    }
  }, [imageFile]);

  function uploadImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }
      setImageFile(file);
    }
  }

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
    preview,
    setImageUrl,
    uploadImageFile,
    clearImage,
    isLoading,
  };
};

export default useUploadItemInfo;
