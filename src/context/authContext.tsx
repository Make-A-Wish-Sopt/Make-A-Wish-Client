'use client';

import { LoginUserInfoType } from '@/types/common/loginUserType';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  loginUserInfo: LoginUserInfoType;
  getAccessToken: () => void;
  onLogin: (loginUserInfo: LoginUserInfoType) => void;
  onLogout: () => void;
  setLoginUserInfo: Dispatch<SetStateAction<LoginUserInfoType>>;
}

const LOCAL_STORAGE_KEY = {
  TOKEN: 'accessToken',
  NAME: 'nickName',
  ID: 'wishId',
} as const;
export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUserInfo, setLoginUserInfo] = useState<LoginUserInfoType>({
    nickName: '',
    wishId: '',
    accessToken: '',
  });

  useEffect(() => {
    setIsLoggedIn(!!getAccessToken());

    setLoginUserInfo({
      accessToken: getAccessToken() as string,
      nickName: localStorage.getItem(LOCAL_STORAGE_KEY.NAME) as string,
      wishId: localStorage.getItem(LOCAL_STORAGE_KEY.ID) as string,
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
    localStorage.setItem(LOCAL_STORAGE_KEY.ID, loginUserInfo.wishId);
    localStorage.setItem(LOCAL_STORAGE_KEY.NAME, loginUserInfo.nickName);

    setLoginUserInfo({
      accessToken: loginUserInfo.accessToken,
      nickName: loginUserInfo.nickName,
      wishId: loginUserInfo.wishId,
    });
    setIsLoggedIn(true);
  }

  function onLogout() {
    clearStorage();

    setLoginUserInfo({
      accessToken: '',
      nickName: '',
      wishId: '',
    });

    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, loginUserInfo, getAccessToken, onLogin, onLogout, setLoginUserInfo }}
    >
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
