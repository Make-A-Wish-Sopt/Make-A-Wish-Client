import axios from 'axios';

export const uploadPresignedURL = async (signedURL: string, file: File | Blob | null) => {
  console.log(decodeURIComponent(signedURL));
  const data = await axios.put(signedURL, file, {
    headers: {
      'Content-Type': file?.type,
    },
  });

  console.log(data);
  return data;
};
