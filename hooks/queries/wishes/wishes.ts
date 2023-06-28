import { getWishesData } from '@/api/cakes/getWishesData';
import { getItemInfo } from '@/api/wishes/getItemInfo';
import { createWishesLink } from '@/api/wishes/createWishesLink';
import { QUERY_KEY } from '@/constant/queryKey';
import { LoginUserInfo } from '@/recoil/auth/loginUserInfo';
import { WishesData } from '@/recoil/formPage/wishesData';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';

//링크 타입을 유니온으로 설정해야됨
export function useGetItemInfo(isCorrectLink: boolean, linkURL: string) {
  const { data: itemData, isSuccess } = useQuery(
    QUERY_KEY.itemData,
    async () => await getItemInfo(linkURL),
    {
      onSuccess: (data) => {
        const imageData = data.imageTag.data?.data;
        const priceData = data.priceTag.data?.data;
        console.log(imageData);
        console.log(priceData);
      },
      onError: (error) => {
        console.log(error);
      },
      enabled: isCorrectLink,
    },
  );

  // //queryClient부분 다시 체크해야됨!
  // const parseImage = () => {
  //   if (linkURL.length > 0 && validation.isCorrectSite(linkURL)) {
  //     isCorrectLink && queryClient.invalidateQueries([QUERY_KEY.itemData, linkURL]);
  //     setIsCorrectLink(true);
  //     return;
  //   }
  //   setIsCorrectLink(false);
  // };

  // const extractImageSrc = (imageLink: string) => {
  //   //eslint-disable-next-line
  //   const regex = /<img[^>]+src=[\"']?([^>\"']+)[\"']?[^>]*>/g;
  //   const imageSrc = regex.exec(imageLink);

  //   if (imageSrc !== null) return imageSrc[1];
  // };

  // const extractPrice = (totalPrice: string) => {
  //   const html = document.createElement('span');
  //   html.innerHTML = totalPrice;
  //   const innerHtmlText = html.querySelector('.css-4bcxzt')?.innerHTML;
  //   const price = innerHtmlText?.substring(0, innerHtmlText.indexOf('<'));

  //   return price;
  // };

  return { itemData, isSuccess };
}

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

export function useGetWishesData(wishesId: string | string[] | undefined) {
  const { data: wishesData } = useQuery(QUERY_KEY.wishesData, async () => getWishesData(wishesId), {
    enabled: wishesId !== '',
  });

  return { wishesData };
}
