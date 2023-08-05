import { getItemInfo } from '@/api/wishes/getItemInfo';
import { QUERY_KEY } from '@/constant/queryKey';
import { useState } from 'react';
import { useQuery } from 'react-query';

//링크 타입을 유니온으로 설정해야됨
export function useGetItemInfo(isCorrectLink: boolean, linkURL: string) {
  const [imageURL, setImageURL] = useState('');
  const [price, setPrice] = useState(0);

  const { isSuccess } = useQuery(QUERY_KEY.ITEM_DATA, () => getItemInfo(linkURL), {
    onSuccess: (data) => {
      const imageData = extractImageSrc(data.imageTag.data?.data);
      const priceData = extractPrice(data.priceTag.data?.data);

      if (imageData && priceData) {
        setImageURL(imageData);
        setPrice(priceData);
      }
    },
    enabled: isCorrectLink,
  });

  const extractImageSrc = (imageLink: string) => {
    //eslint-disable-next-line
    const regex = /<img[^>]+src=[\"']?([^>\"']+)[\"']?[^>]*>/g;
    const imageSrc = regex.exec(imageLink);

    return imageSrc && imageSrc[1];
  };

  const extractPrice = (totalPrice: string) => {
    const html = document.createElement('span');
    html.innerHTML = totalPrice;
    const innerHtmlText = html.querySelector('.css-4bcxzt')?.innerHTML;
    const price = Number(
      innerHtmlText?.substring(0, innerHtmlText.indexOf('<')).replaceAll(',', ''),
    );

    return price;
  };

  return { imageURL, price, isSuccess };
}
