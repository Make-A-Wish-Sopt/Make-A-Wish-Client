import Image from 'next/image';
import {
  AccountCopySpeechBubbleIc,
  AdminPresentMessageIc,
  RecentPresentMessageIc,
} from '../../../../public/assets/icons';

export function RecentMessageAlarmIcon() {
  return (
    <Image
      src={RecentPresentMessageIc}
      alt="메세지 도착 아이콘"
      className="animate-bounce absolute ml-38 mt-20 z-10"
      style={{
        animation: 'bounce 1.3s ease-in-out infinite',
      }}
    />
  );
}

export function AdminMessageAlarmIcon() {
  return (
    <Image
      src={AdminPresentMessageIc}
      alt="메세지 도착 아이콘"
      className="animate-bounce absolute ml-15 mt-30 z-10"
      style={{
        animation: 'bounce 1.3s ease-in-out infinite',
      }}
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
