import { PaymentType, PresentStepType } from '@/app/present/[wishId]/page';
import { WishesCreateStepType } from '@/app/wishes/create/page';

export const GA_VIEW_WISHES: Record<WishesCreateStepType, string> = {
  link: 'view_create_wish_step_link',
  select: 'view_create_wish_step_select',
  account: 'view_create_wish_step_account',
  kakaopay: 'view_create_wish_step_kakaopay',
  done: 'add_new_wish',
  try: 'view_create_wish_step_try',
};

export const GA_VIEW_PRESENT: Record<PresentStepType, string | Record<PaymentType, string>> = {
  present: 'view_present_step_present',
  payment: { kakaopay: 'view_present_payment_kakaopay', account: 'view_present_payment_account' },
  done: 'add_new_present',
};

export const GA_CLICK_BUTTON = {
  tryMyBirthdayBtn: 'click_btn_try_my_birthday',
};
