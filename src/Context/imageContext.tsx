import { useUploadImage } from '@/hooks/useUploadImage';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

type ImageContextType = {
  imageFile: File | null;
  imageUrl: string;
  changeImageUrl: (newImageUrl: string) => void;
  uploadImageFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImageContext = createContext<ImageContextType | null>(null);

export function ImageContextProvider({ children }: PropsWithChildren) {
  const uploadData = useUploadImage();

  return <ImageContext.Provider value={{ ...uploadData }}>{children}</ImageContext.Provider>;
}

export default ImageContext;

export function useImageContext() {
  const context = useContext(ImageContext);
  if (!context) throw new Error('ImageContextType must be used within ImageProvider');
  return context;
}
