import { LoadingCake } from '@/components/Elements/Modal/ValidateLoadingModal';
import { LoadingComponent } from '@/components/UI/Loading';
import React from 'react';

const loading = () => {
  return <LoadingComponent render={<LoadingCake text="로딩 중" />} />;
};

export default loading;
