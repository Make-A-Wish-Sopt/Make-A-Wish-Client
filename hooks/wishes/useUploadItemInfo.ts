import { getPresignedURL, uploadPresignedURL } from '@/api/wishes/wishesAPI';
import { QUERY_KEY } from '@/constant/queryKey';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';

export default function useUploadItemInfo() {
  const [imageFile, setImageFile] = useState<File | Blob | null>(null);
  const [preSignedImageURL, setPreSignedImageURL] = useState('');

  const { data } = useQuery(QUERY_KEY.PRE_SIGNED_URL, () => getPresignedURL(imageFile?.name), {
    onSuccess: (data) => {
      data?.data?.success && mutate();
    },
    enabled: imageFile !== null && imageFile?.name !== '',
  });

  const { mutate } = useMutation(() => uploadPresignedURL(data?.data?.data?.signedUrl, imageFile), {
    onSuccess: () => {
      const s3URL = `https://wish-image-bucket.s3.ap-northeast-2.amazonaws.com//dev/image/wish/${data?.data?.data.filename}`;
      setPreSignedImageURL(s3URL);
    },
  });

  function uploadImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const imageFile = e.target.files && e.target.files[0];
    imageFile && setImageFile(imageFile);
  }

  return { preSignedImageURL, setPreSignedImageURL, uploadImageFile };
}
