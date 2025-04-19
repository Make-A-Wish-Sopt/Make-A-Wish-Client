'use client';

import { useCallback } from 'react';
import { toast } from 'sonner';
import { useRouters } from './useRouters';

export default function useKakaoAuth() {
  const { handleReplace } = useRouters();

  const handleKakaoLogin = useCallback(async () => {
    try {
      const response = await fetch('/api/kakao/login');
      const data = await response.json();
      if (data.authUrl) {
        handleReplace(data.authUrl);
      }
    } catch (err) {
      toast.error('카카오 로그인 실패:');
    }
  }, [handleReplace]);

  const handleKakaoLogout = useCallback(async () => {
    try {
      const response = await fetch('/api/kakao/logout');
      const data = await response.json();
      if (data.authUrl) {
        handleReplace(data.authUrl);
      }
    } catch (err) {
      toast.error('카카오 로그아웃 실패:');
    }
  }, [handleReplace]);

  return {
    handleKakaoLogin,
    handleKakaoLogout,
  };
}
