import { deleteWishLinks } from '@/api/links/deleteWishLinks';
import { useMutation } from 'react-query';

export function useDeleteWishLinks() {
  const mutation = useMutation((wishesData: number[]) => deleteWishLinks(wishesData));

  return mutation;
}