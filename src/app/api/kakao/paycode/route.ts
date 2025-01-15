import { DefaultResponseType } from '@/types/api/response';
import axios from 'axios';
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
    const response = await axios.get(kakaoPayCode, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
      },
    });

    if (response.statusText !== 'OK') {
      return NextResponse.json<DefaultResponseType>({
        success: false,
        message: '카카오페이 코드 유효성 검증 실패',
      });
    }

    if (response.data.includes('유효하지 않은 코드 입니다. 다시 확인해주세요.')) {
      return NextResponse.json<DefaultResponseType>({
        success: false,
        message: '카카오페이 코드 유효성 검증 실패',
      });
    }

    if (response.data.includes('모바일에서 이용 가능해요.')) {
      return NextResponse.json<DefaultResponseType>({
        success: true,
        message: '카카오페이 코드 유효성 검증 성공',
      });
    }

    if (response.data.includes('카오페이로 이동 중')) {
      return NextResponse.json<DefaultResponseType>({
        success: true,
        message: '카카오페이 코드 유효성 검증 성공',
      });
    }
  } catch (error) {
    return NextResponse.json<DefaultResponseType>({
      success: false,
      message: '요청 처리 중 오류 발생',
    });
  }
}
