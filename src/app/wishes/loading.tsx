import React from 'react';
import { LoadingOverlay, LoadingCake } from '@/components/UI/Loading';

async function WishLoading() {
  return <LoadingOverlay render={<LoadingCake text="로딩 중" />} />;
}

export default WishLoading;
