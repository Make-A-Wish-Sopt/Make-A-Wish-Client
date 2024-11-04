import { getCakesResult } from '@/api/cakes';
import { MessageText } from './component';
import { getLoginUserCookiesData } from '@/utils/common/cookies';
import { CakesTreeMessage } from './container';

export async function ReceivedCakePresentList({ wishId }: { wishId: string }) {
  const receivedCakeList = await getCakesResult(wishId);

  return <CakesTreeMessage cakeList={receivedCakeList} wishId={wishId} />;
}

export async function WishesMessageToCreateUser({ wishId }: { wishId: string }) {
  const receivedCakeList = await getCakesResult(wishId);
  const { nickName } = await getLoginUserCookiesData();

  return (
    <MessageText>
      {receivedCakeList.length === 1
        ? `저희가 ${nickName}님의 생일을\n축하하며 편지를 남겼어요!`
        : `${nickName}님의 생일잔치에\n도착한 케이크들이에요!`}
    </MessageText>
  );
}
