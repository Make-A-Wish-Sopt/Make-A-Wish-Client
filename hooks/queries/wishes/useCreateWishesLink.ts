import { createWishesLink } from '@/api/wishes/createWishesLink';
import { LoginUserInfo } from '@/recoil/auth/loginUserInfo';
import { WishesData } from '@/recoil/formPage/wishesData';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export function useCreateWishesLink() {
  const wishesData = useRecoilValue(WishesData);
  const setLoginUserInfo = useSetRecoilState(LoginUserInfo);
  const router = useRouter();

  const { mutate: postWishesData } = useMutation(() => createWishesLink(wishesData), {
    onSuccess: (data) => {
      setLoginUserInfo((prevData) => ({
        ...prevData,
        wishesId: data.data.data,
      }));
      router.push('/wishes/share');
    },
  });

  return { wishesData, postWishesData };
}
