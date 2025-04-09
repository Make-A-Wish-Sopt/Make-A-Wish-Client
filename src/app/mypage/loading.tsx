import { LoadingCake } from '@/components/Elements/Modal/ValidateLoadingModal';
import { LoadingOverlay } from '@/components/UI/Loading';

import React from 'react';

const MypageLoading = async () => {
  return <LoadingOverlay render={<LoadingCake text="로딩 중" />} />;
};

export default MypageLoading;
