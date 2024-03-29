import axios from 'axios';
import { client } from './common/axios';
import { API_VERSION_01 } from './path';
import { getAccessToken } from '@/utils/common/token';

export const uploadPresignedURL = async (signedURL: string, file: File | Blob | null) => {
  const data = await axios.put(signedURL, file, {
    headers: {
      'Content-Type': file?.type,
    },
  });

  return data;
};

export const getPresignedURL = async (fileName: string | undefined) => {
  const data = await client.get(`${API_VERSION_01}/file?fileName=${fileName}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  return data;
};
