'use client';

import { LoginUserInfoType } from '@/types/common/loginUserType';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  loginUserInfo: LoginUserInfoType;
  getAccessToken: () => void;
  onLogin: (loginUserInfo: LoginUserInfoType) => void;
  onLogout: () => void;
}

const LOCAL_STORAGE_KEY = {
  TOKEN: 'accessToken',
  NAME: 'nickName',
  ID: 'wishesId',
} as const;
export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUserInfo, setLoginUserInfo] = useState<LoginUserInfoType>({
    nickName: '',
    wishesId: '',
    accessToken: '',
  });

  useEffect(() => {
    setIsLoggedIn(!!getAccessToken());

    setLoginUserInfo({
      accessToken: getAccessToken() as string,
      nickName: localStorage.getItem(LOCAL_STORAGE_KEY.NAME) as string,
      wishesId: localStorage.getItem(LOCAL_STORAGE_KEY.ID) as string,
    });
  }, []);

  function getAccessToken() {
    return localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN);
  }

  function clearStorage() {
    localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEY.NAME);
    localStorage.removeItem(LOCAL_STORAGE_KEY.ID);
  }

  function onLogin(loginUserInfo: LoginUserInfoType) {
    localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, loginUserInfo.accessToken);
    localStorage.setItem(LOCAL_STORAGE_KEY.ID, loginUserInfo.wishesId);
    localStorage.setItem(LOCAL_STORAGE_KEY.NAME, loginUserInfo.nickName);

    setLoginUserInfo({
      accessToken: loginUserInfo.accessToken,
      nickName: loginUserInfo.nickName,
      wishesId: loginUserInfo.wishesId,
    });
  }

  function onLogout() {
    clearStorage();

    setLoginUserInfo({
      accessToken: '',
      nickName: '',
      wishesId: '',
    });
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, loginUserInfo, getAccessToken, onLogin, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('AuthContext must be used within StepProvider');
  }
  return context;
}
