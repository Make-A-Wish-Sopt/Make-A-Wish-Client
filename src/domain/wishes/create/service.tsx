import { getMainProgressWishesData } from '@/api/wishes';
import ErrorPage from '@/app/error';
import { getLoginUserCookiesData } from '@/utils/common/cookies';
import WishesCreateDone from './wishesCreateDone';
import { WishesCreateDoneMessage } from './component';

export async function WishesCreateSuccess() {
  const progressWishesData = await getMainProgressWishesData();
  const { nickName } = await getLoginUserCookiesData();

  if (!progressWishesData) {
    return <ErrorPage alertMessage="진행중인 소원이 없어요!" />;
  }
  const { dayCount, status } = progressWishesData;

  const dDay = status === 'WHILE' ? dayCount : Math.abs(dayCount - 7);

  return (
    <WishesCreateDone progressWishesData={progressWishesData} nickName={nickName}>
      <WishesCreateDoneMessage nickName={nickName} status={status} dDay={dDay} />;
    </WishesCreateDone>
  );
}
