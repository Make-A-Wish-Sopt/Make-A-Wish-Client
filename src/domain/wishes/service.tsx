import { getCakesResult } from '@/api/cakes';
import { MessageText } from './component';
import { getLoginUserCookiesData } from '@/utils/common/cookies';
import { CakesTreeMessage } from './container';
import { CakeItemType, defaultCakeListData } from '@/constant/model/cakes';

export async function ReceivedCakePresentList({ wishId }: { wishId: string }) {
  return <></>;
}

export async function ReceivedCakePresentListTest({ wishId }: { wishId: string }) {
  const receivedCakeList = await getCakesResult(wishId);

  function defineCakeTree(receivedCakeList?: CakeItemType[]) {
    if (!receivedCakeList) return defaultCakeListData;

    if (receivedCakeList.length === 0) return defaultCakeListData;

    if (receivedCakeList.length > 0 && receivedCakeList.length < 12) {
      const mergedCakeList = [
        ...receivedCakeList,
        ...defaultCakeListData.slice(0, 12 - receivedCakeList.length),
      ];

      return mergedCakeList;
    }

    return receivedCakeList;
  }

  return <CakesTreeMessage cakeList={defineCakeTree(receivedCakeList)} wishId={wishId} />;
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
