import useInput from '@/hooks/common/useInput';
import { useState } from 'react';

//링크 타입을 유니온으로 설정해야됨
export function useGetItemInfo() {
  const [linkURL, handleChangeLinkURL, setLinkURL] = useInput('');
  const [imageURL, setImageURL] = useState('');
  const [price, setPrice] = useState(0);

  const changeLinkURL = (input: string) => {
    setLinkURL(input);
  };
  const changeImageURL = (input: string) => {
    setImageURL(input);
  };
  const changePrice = (input: number) => {
    setPrice(input);
  };

  return {
    linkURL,
    changeLinkURL,
    handleChangeLinkURL,
    imageURL,
    changeImageURL,
    price,
    changePrice,
  };
}
