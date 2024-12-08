import { DefaultResponseType } from '@/types/api/response';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { kakaoPayCode } = await req.json();

  if (!kakaoPayCode || typeof kakaoPayCode !== 'string') {
    return NextResponse.json<DefaultResponseType>({
      success: false,
      message: '유효한 URL이 제공되지 않았습니다.',
    });
  }

  try {
    // 카카오페이 QR URL로 요청
    const response = await fetch(kakaoPayCode, {
      method: 'HEAD',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
      },
    });
    const isValid = response.ok;

    if (isValid) {
      return NextResponse.json<DefaultResponseType>({
        success: true,
        message: '카카오페이 코드 유효성 검증 성공',
      });
    } else {
      return NextResponse.json<DefaultResponseType>({
        success: false,
        message: '카카오페이 코드 유효성 검증 실패',
      });
    }
  } catch (error) {
    return NextResponse.json<DefaultResponseType>({
      success: false,
      message: '요청 처리 중 오류 발생',
    });
  }
}
