import {
  deleteWishes,
  getMainProgressData,
  getProgressWishInfo,
  getSingleWishInfo,
  getWishes,
  putProgressWishes,
  postWishes,
  patchProgressWishes,
} from '@/api/wishes';
import { QUERY_KEY } from '@/constant/queryKey';

import { WishesDataInputType } from '@/types/wishesType';
import { WishLinksType } from '@/types/links/wishLinksType';
import router from 'next/router';
import { UseFormReturn } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useAuthContext } from '@/context/authContext';
import { WishesLinkDataType } from '@/types/input';

// /**
//  * 모든 소원리스트 조회
//  */
// export function useGetWishes() {
//   const { data } = useQuery(QUERY_KEY.WISHES_DATA, getWishes);

//   return data;
// }

// /**
//  * 진행중인 소원 정보 수정
//  */
// export function usePutProgressWishes(methods: UseFormReturn<WishesDataInputType, any, undefined>) {
//   const { mutate: handlePutProgressWishes } = useMutation(() => putProgressWishes(methods), {
//     onSuccess: () => {
//       alert('소원정보를 수정했어요!');
//       router.back();
//     },
//   });

//   return { handlePutProgressWishes };
// }

// /**
//  * 진행중인 소원 중단
//  */
export function usePatchProgressWishes() {
  const { mutate: handlePatchProgressWishes } = useMutation(patchProgressWishes, {
    onSuccess: () => {
      alert('진행중인 소원을 중단했어요!');
      router.back();
    },
  });

  return { handlePatchProgressWishes };
}

// /**
//  * 소원링크 생성
//  */
export function usePostWishes(methods: UseFormReturn<WishesLinkDataType, any, undefined>) {
  const { setLoginUserInfo } = useAuthContext();

  const { mutate: handlePostWishes } = useMutation(() => postWishes(methods), {
    onSuccess: (data) => {
      setLoginUserInfo((prevData) => ({
        ...prevData,
        wishId: data.data.data,
      }));
    },
  });

  return { handlePostWishes };
}

// /**
//  * 소원링크 삭제
//  */
// export function useDeleteWishes() {
//   const queryClient = useQueryClient();
//   const { data, mutate: handleDeleteWishes } = useMutation(
//     (wishesData: number[]) => deleteWishes(wishesData),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(QUERY_KEY.WISH_LINKS);
//       },
//     },
//   );

//   return { data, handleDeleteWishes };
// }

// /**
//  * 진행중인 소원 정보 조회
//  */
export function useGetWishesProgress() {
  const { data: wishesProgressData, ...rest } = useQuery(QUERY_KEY.PROGRESS, getProgressWishInfo);

  return { wishesProgressData, ...rest };
}

/**
 * 진행중인 소원 조회(메인화면)
 */
export function useGetMainProgressData() {
  const { data: progressData, ...rest } = useQuery(QUERY_KEY.MAIN, getMainProgressData);

  return { progressData, ...rest };
}

// /**
//  * 소원 단건 조회
//  */
// export function useGetSingleWishInfo(wishId: string | string[] | undefined) {
//   const { data: wishData } = useQuery(QUERY_KEY.ONE_WISH, async () => getSingleWishInfo(wishId), {
//     onError: (error: any) => {
//       if (error.response && error.response.status === 403) {
//         alert('해당 소원에 접근할 수 없습니다.');
//         router.back();
//       }
//     },
//     enabled: wishId !== '',
//   });

//   return { wishData };
// }

// export function useGetWishLinks() {
//   // const [noWishes, setNoWishes] = useState(true);
//   // const [wishLinks, setWishLinks] = useState<WishLinksType[]>([]);

//   const { data, isSuccess } = useQuery<WishLinksType[]>(
//     QUERY_KEY.WISH_LINKS,
//     async () => getWishes(),
//     {
//       onSuccess: (wishLinks) => {
//         if (wishLinks.length > 0) {
//           // setNoWishes(false);
//         }

//         // setWishLinks(wishLinks);
//       },
//     },
//   );

//   // return { wishLinks, isSuccess, noWishes };
// }
