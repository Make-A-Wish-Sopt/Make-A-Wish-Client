import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { getPresignedURL, uploadPresignedURL } from '@/api/file';
import { MAX_IMAGE_FILE_SIZE } from '@/constant/input';

const useUploadItemInfo = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [preview, setPreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 이미지 미리보기
  useEffect(() => {
    if (!imageFile) {
      setPreview('');
      return;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setPreview(objectUrl);
  }, [imageFile]);

  // 파일 선택 및 업로드 시작
  const uploadImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.warning('이미지 파일만 업로드 가능합니다.');
      return;
    }

    if (file.size > MAX_IMAGE_FILE_SIZE) {
      toast.warning('이미지 파일은 10MB 이하만 업로드 가능합니다.');
      return;
    }

    setImageFile(file);

    try {
      setIsLoading(true);

      // presigned URL 요청
      const res = await getPresignedURL(file.name);
      if (!res.status) {
        toast.error('업로드 URL 요청에 실패했습니다.');
        return;
      }

      const { signedUrl, filename } = res.data.data;

      // 업로드 수행
      const uploadRes = await uploadPresignedURL(signedUrl, file);
      if (!uploadRes.status) {
        toast.error('이미지 업로드에 실패했습니다.');
        return;
      }

      const S3_URL = `${process.env.NEXT_PUBLIC_S3_URL}/${filename}`;
      setImageUrl(S3_URL);
      setPreview(S3_URL);
    } catch (error) {
      toast.error('이미지 업로드 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearImage = () => {
    if (preview) URL.revokeObjectURL(preview);
    setImageFile(null);
    setImageUrl('');
    setPreview('');
  };

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
