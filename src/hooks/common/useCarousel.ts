import { useEffect, useState } from 'react';

export interface CarouselType {
  center: number;
  left: number;
  right: number;
  next: () => void;
  prev: () => void;
}

export default function useCarousel(maxLength: number): CarouselType {
  const [center, setCenter] = useState(0);
  const [left, setLeft] = useState(maxLength);
  const [right, setRight] = useState(1);

  useEffect(() => {
    if (center === maxLength) {
      setLeft(maxLength - 1);
      setRight(0);
    } else if (center === 0) {
      setLeft(maxLength);
      setRight(1);
    } else if (center > 0 && center < maxLength) {
      setLeft(center - 1);
      setRight(center + 1);
    }
  }, [center]);

  function next() {
    if (center === maxLength) {
      setCenter(0);
    } else {
      setCenter(center + 1);
    }
  }

  function prev() {
    if (center === 0) {
      setCenter(maxLength);
    } else {
      setCenter(center - 1);
    }
  }

  return { center, left, right, next, prev };
}
