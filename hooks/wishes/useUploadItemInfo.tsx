import { useState } from 'react';

export default function useUploadItemInfo() {
  const [imageFile, setImageFile] = useState<File | Blob | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>('');

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
