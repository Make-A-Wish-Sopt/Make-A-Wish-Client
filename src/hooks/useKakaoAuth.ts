'use client';

import { useEffect, useState } from 'react';
import { useRouters } from './useRouters';

export default function useKakaoAuth() {
  const [loginUrl, setLoginUrl] = useState<string | null>(null);
  const [logoutUrl, setLogoutUrl] = useState<string | null>(null);
  const { handleReplace } = useRouters();

  useEffect(() => {
    async function fetchAuthLoginUrl() {
      const response = await fetch('/api/kakao/login');
      const data = await response.json();
      setLoginUrl(data.authUrl);
    }

    fetchAuthLoginUrl();
  }, []);

  useEffect(() => {
    async function fetchAuthLogoutUrl() {
      const response = await fetch('/api/kakao/logout');
      const data = await response.json();

      setLogoutUrl(data.authUrl);
    }

    fetchAuthLogoutUrl();
  }, []);

  const handleKaKaoLogin = () => {
    if (loginUrl) {
      handleReplace(loginUrl);
    }
  };

  const handleKaKaoLogout = () => {
    if (logoutUrl) {
      handleReplace(logoutUrl);
    }
  };
  return {
    handleKaKaoLogin,
    handleKaKaoLogout,
  };
}
