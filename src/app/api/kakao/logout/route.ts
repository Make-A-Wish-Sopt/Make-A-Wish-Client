import { DefaultResponseType } from '@/types/api/response';
import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.KAKAO_RESTAPI_KEY;
  const logoutRedirectUri = process.env.NEXT_PUBLIC_KAKAO_LOGOUT_REDIRECT_URI;

  if (!clientId || !logoutRedirectUri) {
    return NextResponse.json({
      error: 'Missing Kakao API configuration',
      status: 500,
    });
  }

  const authUrl = `https://kauth.kakao.com/oauth/logout?client_id=${clientId}&logout_redirect_uri=${logoutRedirectUri}`;

  return NextResponse.json({ authUrl: authUrl });
}
