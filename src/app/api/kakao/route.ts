import { NextRequest, NextResponse } from 'next/server';

export async function GET(res: NextRequest) {
  const clientId = process.env.KAKAO_RESTAPI_KEY;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json({ error: 'Missing Kakao API configuration', status: 500 });
  }

  const authUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

  return NextResponse.json({ authUrl: authUrl });
}
