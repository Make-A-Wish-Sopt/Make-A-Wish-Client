import { createWishesLink } from '@/api/wishes/wishesAPI';
import { LoginUserInfo } from '@/recoil/auth/loginUserInfo';
import { WishesData } from '@/recoil/formPage/wishesData';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export function useCreateWishesLink() {
  const wishesData = useRecoilValue(WishesData);
  const setLoginUserInfo = useSetRecoilState(LoginUserInfo);
  const router = useRouter();

  const { mutate: postWishesData, isSuccess } = useMutation(() => createWishesLink(wishesData), {
    onSuccess: (data) => {
      setLoginUserInfo((prevData) => ({
        ...prevData,
        wishesId: data.data.data,
      }));
    },
    onError: (data) => {
      if (data?.response?.data?.message === '이미 진행 중인 소원 링크가 있습니다.') {
        alert('이미 진행 중인 소원 링크가 있습니다.');
        router.replace('/main');
      }
    },
  });

  return { wishesData, postWishesData, isSuccess };
}
