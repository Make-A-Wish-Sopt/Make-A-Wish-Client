export const API_VERSION_01 = '/api/v1';

const PATH = {
  auth: '/auth',
  user: '/user',
  wishes: '/wishes',
  public: '/public',
  cakes: '/cakes',
};

export const PATH_AUTH = {
  TOKEN: `${PATH.auth}/token`,
  KAKAO: `${PATH.auth}/kakao/callback`,
};

export const PATH_USER = {
  DEFAULT: PATH.user,
  ACCOUNT: `${PATH.user}/account`,
  ACCOUNT_VERIFY: `${PATH.user}/verify-account`,
  ABUSE: `${PATH.user}/abuse`,
};

export const PATH_WISHES = {
  DEFAULT: PATH.wishes,
  PROGRESS: `${PATH.wishes}/progress`,
  GET_SINGLE_WISH_INFO: (wishId: string | string[] | undefined) => `${PATH.wishes}/${wishId}`,
  PRESENT_LINK_INFO: `${PATH.wishes}/present/info`,
  MAIN: `${PATH.wishes}/main`,
};

export const PATH_PUBLIC = {
  CAKES: `${PATH.public}/cakes`,
  GET_WISHES_INFO: (wishId: number) => `${PATH.public}${PATH.wishes}/${wishId}`,
};

export const PATH_CAKES = {
  GET_CAKES_RESULT: (wishId: string | number) => `${PATH.cakes}/${wishId}`,
  GET_CAKES_INFO: (wishId: string | number, cakeId: string | number) =>
    `${PATH.cakes}/${wishId}/${cakeId}`,
};
