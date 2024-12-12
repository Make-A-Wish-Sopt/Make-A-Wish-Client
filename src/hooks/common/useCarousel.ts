import { useEffect, useState } from 'react';

export interface CarouselType {
  next: () => void;
  prev: () => void;
  getCenterItem: () => number;
  selectArr: number[];
}

export default function useCarousel(itemLength: number, selectItemLength: number): CarouselType {
  const count = Math.floor(selectItemLength / 2);
  const init = Array.from({ length: itemLength }, (_, i) => i);
  const selectArrInit = init.slice(-count).concat(init.slice(0, count + 1));
  const restArrInit = init.slice(count + 1, init.length - count);

  const [selectArr, setSelectArr] = useState<number[]>(selectArrInit);
  const [restArr, setRestArr] = useState<number[]>(restArrInit);

  function next() {
    if (selectArr.length > 0 && restArr.length > 0) {
      const deleteItem = selectArr.shift();
      const newItem = restArr.shift();

      const newSelectArr = [...selectArr, newItem];
      const newRestArr = [...restArr, deleteItem];

      setSelectArr([...newSelectArr]);
      setRestArr([...newRestArr]);
    }
  }

  function getCenterItem() {
    const centerIndex = Math.floor((selectArr.length - 1) / 2);
    const centerItem = selectArr[centerIndex];

    return centerItem;
  }

  function prev() {
    if (selectArr.length > 0 && restArr.length > 0) {
      const deleteItem = selectArr.pop();
      const newItem = restArr.pop();

      const newSelectArr = [newItem, ...selectArr];
      const newRestArr = [deleteItem, ...restArr];

      setSelectArr([...newSelectArr]);
      setRestArr([...newRestArr]);
    }
  }

  return { selectArr, next, prev, getCenterItem };
}
