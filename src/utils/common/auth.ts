import { getLoginUserCookiesData } from './cookies';

export async function isLoggedIn() {
  const loginUserData = await getLoginUserCookiesData();

  return !!loginUserData;
}
