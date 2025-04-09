import { ExtractStepNames } from '@/hooks/useFunnel';

/**
 * Wishes Create Funnel의 모든 단계를 정의하는 상수
 * @remarks 중첩 배열은 서브 스텝을 나타냅니다
 */
export const WishesCreateFunnelSteps = [
  'wishes',
  'selectPayment',
  ['account', 'kakaopay'],
] as const;

export type WishesFunnelStepType = typeof WishesCreateFunnelSteps;

/**
 * Wishes Create Funnel에서 사용 가능한 모든 단계 이름
 * @example 'wishes' | 'selectPayment' | 'account' | 'kakaopay' | 'done'
 */
export type WishesFunnelStepName = ExtractStepNames<typeof WishesCreateFunnelSteps>;

export const AccountFormFunnelStep = ['selectPayment', ['account', 'kakaopay']];
export type AccountFunnelStepType = typeof AccountFormFunnelStep;
export type AccountFunnelStepTypeName = ExtractStepNames<typeof AccountFormFunnelStep>;

export const PresentFunnelStep = ['present', 'payment', 'complete'] as const;
export type PresentFunnelStepType = typeof PresentFunnelStep;
export type PresentFunnelStepTypeName = ExtractStepNames<typeof PresentFunnelStep>;
