import { getCakesResult } from '@/api/cakes';
import { MessageText } from './component';
import { CakesTreeMessage } from './container';
import {
  AdminMessageAlarmIcon,
  RecentMessageAlarmIcon,
} from '@/components/Common/Icon/MessageAlarmIcon';
import { defineCakeTree } from '@/utils/common/defineCakeTree';

export async function ReceivedCakePresentList({ wishId }: { wishId: string }) {
  const receivedCakeList = await getCakesResult(wishId);
  const cakeList = defineCakeTree(receivedCakeList);

  return <CakesTreeMessage cakeList={cakeList} />;
}

export async function WishesMessageToCreateUser({
  wishId,
  nickName,
}: {
  wishId: string;
  nickName: string;
}) {
  const receivedCakeList = await getCakesResult(wishId);

  return (
    <>
      <MessageText>
        {receivedCakeList.length === 0
          ? `${nickName}님의 생일을 축하하며\n편지 12개를 선물로 드렸어요!`
          : `${nickName}님의 생일잔치에\n케이크가 도착했어요!`}
      </MessageText>

      {receivedCakeList.length === 0 ? <AdminMessageAlarmIcon /> : <RecentMessageAlarmIcon />}
    </>
  );
}
