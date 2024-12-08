import { useEffect, useState } from 'react';
import { useRouters } from './useRouters';

export default function useKakaoAuth() {
  const [loginUrl, setLoginUrl] = useState<string | null>(null);
  const [logoutUrl, setLogoutUrl] = useState<string | null>(null);
  const { handleReplace } = useRouters();

  useEffect(() => {
    async function fetchAuthUrl() {
      const response = await fetch('/api/kakao/login');
      const data = await response.json();
      setLoginUrl(data.authUrl);
    }

    fetchAuthUrl();
  }, []);

  useEffect(() => {
    async function fetchAuthUrl() {
      const response = await fetch('/api/kakao/logout');
      const data = await response.json();
      setLogoutUrl(data.authUrl);
    }

    fetchAuthUrl();
  }, []);

  const handleKaKaoLogin = () => {
    if (loginUrl) {
      handleReplace(loginUrl);
    }
  };

  const handleKaKaoLogout = () => {
    if (loginUrl) {
      handleReplace(logoutUrl);
    }
  };
  return {
    handleKaKaoLogin,
    handleKaKaoLogout,
  };
}
