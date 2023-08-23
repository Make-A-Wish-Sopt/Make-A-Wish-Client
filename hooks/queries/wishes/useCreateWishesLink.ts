import { createWishesLink } from '@/api/wishes/wishesAPI';
import { LoginUserInfo } from '@/recoil/auth/loginUserInfo';
import { WishesData } from '@/recoil/formPage/wishesData';
import { useMutation } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export function useCreateWishesLink() {
  const wishesData = useRecoilValue(WishesData);
  const setLoginUserInfo = useSetRecoilState(LoginUserInfo);

  console.log(wishesData);

  const { mutate: postWishesData, isSuccess } = useMutation(() => createWishesLink(wishesData), {
    onSuccess: (data) => {
      console.log(data);
      setLoginUserInfo((prevData) => ({
        ...prevData,
        wishesId: data.data.data,
      }));
    },
  });

  return { wishesData, postWishesData, isSuccess };
}
