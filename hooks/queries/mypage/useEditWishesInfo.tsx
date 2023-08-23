import { editWishesInfo } from '@/api/mypage/editWishesInfo';
import { EditWishesInfoDataType } from '@/types/mypage/editWishesInfoDataType';
import { useMutation } from 'react-query';

export default function useEditWishesInfo(editWishesInfoData: EditWishesInfoDataType) {
  const { mutate: editWishesData } = useMutation(() => editWishesInfo(editWishesInfoData), {});

  return { editWishesData };
}
