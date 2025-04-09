import { PresentFunnelStepTypeName, WishesFunnelStepName } from './funnelStep';

export const GA_VIEW_WISHES: Record<WishesFunnelStepName, string> = {
  wishes: 'view_create_wish_step_link',
  selectPayment: 'view_create_wish_step_select',
  account: 'view_create_wish_step_account',
  kakaopay: 'view_create_wish_step_kakaopay',
};

export const GA_VIEW_PRESENT: Record<PresentFunnelStepTypeName, string> = {
  present: 'view_present_step_present',
  payment: 'view_present_step_payment',
  complete: 'view_present_step_complete',
};

export const GA_CLICK_BUTTON = {
  tryMyBirthdayBtn: 'click_btn_try_my_birthday',
};
