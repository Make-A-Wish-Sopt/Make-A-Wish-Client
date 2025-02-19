import { DefaultResponseType } from '@/types/api/response';

export async function validateKakaoCodeURL(kakaoPayCode: string) {
  try {
    const response = await fetch('/api/kakao/paycode', {
      method: 'POST',
      body: JSON.stringify({ kakaoPayCode: kakaoPayCode }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = (await response.json()) as DefaultResponseType;

    return data.success;
  } catch (error) {
    return false;
  }
}
