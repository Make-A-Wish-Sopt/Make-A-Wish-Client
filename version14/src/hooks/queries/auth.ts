import { useMutation } from 'react-query';
import { postAuthKakao } from '@/api/auth';
import { useRouter } from 'next/navigation';

export function useAuthKakao(code: string) {
  const router = useRouter();



  return { kakaoLoginMutate };
}
