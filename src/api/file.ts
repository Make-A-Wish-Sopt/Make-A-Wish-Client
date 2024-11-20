import axios from 'axios';
import { client } from './common/axios';
import { API_VERSION_01 } from './path';
import { PresingedURLResponseType } from '@/types/api/response';
import PATH from '@/constant/apiPath';

export const uploadPresignedURL = async (signedURL: string, file: File | Blob | null) => {
  const data = await axios.put(signedURL, file, {
    headers: {
      'Content-Type': file?.type,
    },
  });

  return data;
};

export const getPresignedURL = async (fileName: string | undefined) => {
  const data = await client.get<PresingedURLResponseType>(
    `${API_VERSION_01}/${PATH.FILE}?${PATH.FILE_NAME}=${fileName}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return data;
};
