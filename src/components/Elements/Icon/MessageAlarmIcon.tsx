import {
  AccountCopySpeechBubbleIc,
  AdminPresentMessageIc,
  RecentPresentMessageIc,
} from '@public/assets/icons';
import Image from 'next/image';

export function RecentMessageAlarmIcon() {
  return (
    <Image
      src={RecentPresentMessageIc}
      alt="메세지 도착 아이콘"
      width={93}
      className="animate-bounce ml-20 mt-56 -mb-[95px] z-10"
    />
  );
}

export function AdminMessageAlarmIcon() {
  return (
    <Image
      src={AdminPresentMessageIc}
      alt="메세지 도착 아이콘"
      className="animate-bounce -ml-10 mt-56 -mb-[95px] z-10"
    />
  );
}

export function AccountCopySpeechBubbleIcon() {
  return (
    <Image
      src={AccountCopySpeechBubbleIc}
      alt="계좌번호 복사 아이콘"
      className="absolute -top-[50px]  z-10"
    />
  );
}
