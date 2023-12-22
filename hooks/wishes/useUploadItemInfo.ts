import { getPresignedURL, uploadPresignedURL } from '@/api/file';
import { QUERY_KEY } from '@/constant/queryKey';
import { validation } from '@/validation/input';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';

export default function useUploadItemInfo() {
  const [imageFile, setImageFile] = useState<File | Blob | null>(null);
  const [preSignedImageUrl, setPreSignedImageUrl] = useState('');

  const { data, refetch } = useQuery(
    QUERY_KEY.PRE_SIGNED_URL,
    () => getPresignedURL(imageFile?.name),
    {
      enabled:
        imageFile !== null &&
        validation.checkImageFileSize(imageFile.size) &&
        imageFile?.name !== '',
    },
  );

  const { mutate } = useMutation(() => uploadPresignedURL(data?.data?.data?.signedUrl, imageFile), {
    onSuccess: () => {
      const S3_URL = `https://wish-image-bucket.s3.ap-northeast-2.amazonaws.com/${data?.data?.data.filename}`;
      setPreSignedImageUrl(S3_URL);
    },
  });

  useEffect(() => {
    data?.data?.success && mutate();
  }, [data]);

  useEffect(() => {
    imageFile && validation.checkImageFileSize(imageFile.size) && refetch();
  }, [imageFile]);

  function uploadImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const imageFile = e.target.files && e.target.files[0];
    imageFile && setImageFile(imageFile);
  }

  return { imageFile, preSignedImageUrl, setPreSignedImageUrl, uploadImageFile };
}
