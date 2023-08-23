import { getPresignedURL, uploadPresignedURL } from '@/api/wishes/wishesAPI';
import { QUERY_KEY } from '@/constant/queryKey';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';

export default function useUploadItemInfo() {
  const [imageFile, setImageFile] = useState<File | Blob | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>('');
  const [preSignedURL, setPreSignedURL] = useState('');

  const { data } = useQuery(QUERY_KEY.PRE_SIGNED_URL, () => getPresignedURL(imageFile?.name), {
    enabled: imageFile !== null && imageFile?.name !== '',
  });

  useEffect(() => {
    if (data?.data?.success) {
      mutate();
    }
  }, [data]);

  const { mutate } = useMutation(() => uploadPresignedURL(data?.data?.data?.signedUrl, imageFile));

  function uploadImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const imageFile = e.target.files && e.target.files[0];

    if (imageFile) {
      setImageFile(imageFile);
      const reader = new FileReader();
      imageFile && reader.readAsDataURL(imageFile);
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
    }
  }

  return { imageFile, previewImage, setPreviewImage, uploadImageFile };
}
