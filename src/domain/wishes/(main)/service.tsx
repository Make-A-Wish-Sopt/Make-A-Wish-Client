import { getCakesResult } from '@/api/cakes';
import { CakePresentList } from './container';
import {
  AdminMessageAlarmIcon,
  RecentMessageAlarmIcon,
} from '@/components/Common/Icon/MessageAlarmIcon';
import { defineCakeTree } from '@/utils/common/defineCakeTree';
import { GuideText } from '@/components/UI/GuideText';
import { getLoginUserCookiesData } from '@/utils/common/cookies';

export async function GetReceivedCakePresentList({ wishId }: { wishId: string }) {
  const receivedCakeList = await getCakesResult(wishId);
  const cakeList = defineCakeTree(receivedCakeList.reverse()); //뒤집는 과정은 데이터가 가장 최신게 끝으로 가기 때문
  const loginUserData = await getLoginUserCookiesData();

  return <CakePresentList cakeList={cakeList} wishId={wishId} nickname={loginUserData?.nickName} />;
}

export async function GetCakeCountThenGuideMessageToUser({
  wishId,
  nickName,
}: {
  wishId: string;
  nickName: string;
}) {
  const receivedCakeList = await getCakesResult(wishId);

  return (
    <>
      <GuideText>
        {receivedCakeList.length === 0
          ? `${nickName}님의 생일을 축하하며\n편지 12개를 선물로 드렸어요!`
          : `${nickName}님의 생일잔치에\n케이크가 도착했어요!`}
      </GuideText>

      {receivedCakeList.length === 0 ? <AdminMessageAlarmIcon /> : <RecentMessageAlarmIcon />}
    </>
  );
}
