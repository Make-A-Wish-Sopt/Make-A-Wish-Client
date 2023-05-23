export interface TokenResponse {
  token_type: string;
  access_token: string;
  refresh_token: string;
  id_token: string;
  expires_in: number;
  refresh_token_expires_in: string;
  scope: string;
}

export interface UserInfo {
  id: number;
  properties: {
    nickname: string;
    profile_image: string;
    email: string;
  };
}

export interface ResponseType {
  success: boolean;
  message: string;
  data: any;
}