import {
  deleteWishes,
  getMainProgressData,
  getProgressWishInfo,
  getSingleWishInfo,
  getWishes,
  patchProgressWishInfo,
  postWishes,
} from '@/api/wishes';
import { QUERY_KEY } from '@/constant/queryKey';
import { LoginUserInfo } from '@/recoil/auth/loginUserInfo';
import { WishesDataInputType } from '@/types/wishesType';
import { WishLinksType } from '@/types/links/wishLinksType';
import router from 'next/router';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';

/**
 * 모든 소원리스트 조회
 */
export function useGetWishes() {
  const { data } = useQuery(QUERY_KEY.WISHES_DATA, getWishes);

  return data;
}

/**
 * 진행중인 소원 정보 수정
 */
export function usePatchWishes(methods: UseFormReturn<WishesDataInputType, any, undefined>) {
  const { mutate: patchWishesData } = useMutation(() => patchProgressWishInfo(methods), {
    onSuccess: () => {
      alert('수정성공');
      router.back();
    },
  });

  return { patchWishesData };
}

/**
 * 소원링크 생성
 */
export function usePostWishes(methods: UseFormReturn<WishesDataInputType, any, undefined>) {
  const setLoginUserInfo = useSetRecoilState(LoginUserInfo);

  const { mutate: postWishesData } = useMutation(() => postWishes(methods), {
    onSuccess: (data) => {
      setLoginUserInfo((prevData) => ({
        ...prevData,
        wishesId: data.data.data,
      }));
    },
  });

  return { postWishesData };
}

/**
 * 소원링크 삭제
 */
export function useDeleteWishes() {
  const mutation = useMutation((wishesData: number[]) => deleteWishes(wishesData));

  return mutation;
}

/**
 * 진행중인 소원 정보 조회
 */
export function useGetWishesProgress() {
  const { data: wishesProgressData, ...restProps } = useQuery(
    QUERY_KEY.PROGRESS,
    getProgressWishInfo,
  );

  return { wishesProgressData, ...restProps };
}

/**
 * 진행중인 소원 조회(메인화면)
 */
export function useGetMainProgressData() {
  const { data: progressData, ...restProps } = useQuery(QUERY_KEY.PROGRESS, getMainProgressData);

  return { progressData, ...restProps };
}

/**
 * 소원 단건 조회
 */
export function useGetSingleWishInfo(wishId: string | string[] | undefined) {
  const { data: wishData } = useQuery(QUERY_KEY.ONE_WISH, async () => getSingleWishInfo(wishId), {
    onError: (error: any) => {
      if (error.response && error.response.status === 403) {
        alert('해당 소원에 접근할 수 없습니다.');
        router.back();
      }
    },
    enabled: wishId !== '',
  });

  return { wishData };
}

export function useGetWishLinks() {
  const [noWishes, setNoWishes] = useState(true);
  const [wishLinks, setWishLinks] = useState<WishLinksType[]>([]);

  const { data, isSuccess } = useQuery<WishLinksType[]>(
    QUERY_KEY.WISH_LINKS,
    async () => getWishes(),
    {
      onSuccess: (wishLinks) => {
        if (wishLinks.length > 0) {
          setNoWishes(false);
        }

        setWishLinks(wishLinks);
      },
    },
  );

  return { wishLinks, isSuccess, noWishes };
}