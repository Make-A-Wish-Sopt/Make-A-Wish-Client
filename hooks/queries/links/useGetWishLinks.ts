import { useQuery } from 'react-query';
import { QUERY_KEY } from '@/constant/queryKey';
import { getWishLinks } from '@/api/links/getWishLinks';
import { WishLinksType } from '@/types/links/wishLinksType';
import { useState } from 'react';

export function useGetWishLinks() {
  const [noWishes, setNoWishes] = useState(true);
  const [wishLinks, setWishLinks] = useState<WishLinksType[]>([]);

  const { data, isSuccess } = useQuery<WishLinksType[]>(
    QUERY_KEY.WISH_LINKS,
    async () => getWishLinks(),
    {
      onSuccess: (wishLinks) => {
        // if (wishLinks.length > 0) {
        //   setNoWishes(false);
        // }
        setNoWishes(false);

        setWishLinks(wishLinks);
      },
    }
  );


  return { wishLinks, isSuccess, noWishes };
}
