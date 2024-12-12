import Image from 'next/image';
import { AdminPresentMessageIc, RecentPresentMessageIc } from '../../../../public/assets/icons';

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
