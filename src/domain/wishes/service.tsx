import { getCakesResult } from '@/api/cakes';
import { MessageText } from './component';
import { CakesTreeMessage } from './container';
import {
  CakeTreeDataType,
  defaultCakeTreeDataArray,
  defaultCakeTreeDataObject,
} from '@/constant/model/cakesTreeData';
import {
  AdminMessageAlarmIcon,
  RecentMessageAlarmIcon,
} from '@/components/Common/Icon/MessageAlarmIcon';

export async function ReceivedCakePresentList({ wishId }: { wishId: string }) {
  const receivedCakeList = await getCakesResult(wishId);
  const convertRecentCakeList = receivedCakeList.reverse();
  const cakeList = defineCakeTree(convertRecentCakeList);

  function defineCakeTree(receivedCakeList?: CakeTreeDataType[]) {
    if (!receivedCakeList) return defaultCakeTreeDataArray;

    if (receivedCakeList.length === 0) return defaultCakeTreeDataArray;

    if (receivedCakeList.length > 0 && receivedCakeList.length <= 12) {
      const convertReceivedCakeData = receivedCakeList
        .map((cake) => {
          const matchCakesData = defaultCakeTreeDataObject[cake.cakeId];

          if (matchCakesData) {
            return {
              ...matchCakesData,
              name: cake.name,
              presentId: cake.presentId,
              cakeImg: defaultCakeTreeDataObject[cake.cakeId].cakeImg,
              isAdminMessage: false,
            };
          }
          return null;
        })
        .filter(Boolean);

      const mergedCakeList = [
        ...convertReceivedCakeData,
        ...defaultCakeTreeDataArray.slice(0, 12 - receivedCakeList.length),
      ];

      return mergedCakeList;
    } else {
      const convertReceivedCakeData = receivedCakeList
        .map((cake) => {
          const matchCakesData = defaultCakeTreeDataObject[cake.cakeId];

          if (matchCakesData) {
            return {
              ...matchCakesData,
              name: cake.name,
              presentId: cake.presentId,
              cakeImg: defaultCakeTreeDataObject[cake.cakeId].cakeImg,
            };
          }
          return null;
        })
        .filter(Boolean);

      return convertReceivedCakeData;
    }
  }

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
