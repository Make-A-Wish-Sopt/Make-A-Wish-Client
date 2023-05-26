export interface TokenResponse {
  token_type: string;
  access_token: string;
  refresh_token: string;
  id_token: string;
  expires_in: number;
  refresh_token_expires_in: string;
  scope: string;
}

export interface ResponseType {
  status: number;
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    isRegistered: boolean;
  };
}

export interface UserInfo {
  id: number;
  connected_at: string;
  properties: {
    nickname: string;
  };
  kakao_account: {
    profile_nickname_needs_agreement: boolean;
    profile: {
      nickname: string;
    };
    has_email: boolean;
    email_needs_agreement: boolean;
  };
}