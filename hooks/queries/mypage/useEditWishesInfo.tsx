import { editWishesInfo } from '@/api/mypage/mypageAPI';
import { EditWishesInfoDataType } from '@/types/mypage/editWishesInfoDataType';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

export default function useEditWishesInfo(editWishesInfoData: EditWishesInfoDataType) {
  const router = useRouter();
  const { mutate: editWishesData } = useMutation(() => editWishesInfo(editWishesInfoData), {
    onSuccess: () => {
      alert('수정성공');
      router.back();
    },
  });

  return { editWishesData };
}
