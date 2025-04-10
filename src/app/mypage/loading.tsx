import React from 'react';
import { LoadingOverlay, LoadingCake } from '@/components/UI/Loading';

async function MypageLoading() {
  return <LoadingOverlay render={<LoadingCake text="로딩 중" />} />;
}

export default MypageLoading;
