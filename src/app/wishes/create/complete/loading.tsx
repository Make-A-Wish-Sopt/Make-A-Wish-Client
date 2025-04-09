import { LoadingCake } from '@/components/Elements/Modal/ValidateLoadingModal';
import { LoadingOverlay } from '@/components/UI/Loading';

import React from 'react';

const loading = () => {
  return <LoadingOverlay render={<LoadingCake text="로딩 중" />} />;
};

export default loading;
