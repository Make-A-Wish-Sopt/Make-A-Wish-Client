import { getMainProgressWishesData } from '@/api/wishes';
import ErrorPage from '@/app/error';
import { getLoginUserCookiesData } from '@/utils/common/cookies';
import { getUserAccount } from '@/api/user';
import WishesAccountInputForm from './wishesAccountInputForm';
import WishesCreateDone from './wishesCreateDone';
import { WishesCreateDoneMessage } from './component';

export async function WishesCreateSuccess() {
  const progressWishesData = await getMainProgressWishesData();
  const { nickName } = await getLoginUserCookiesData();

  if (!progressWishesData) {
    return <ErrorPage alertMessage="진행중인 소원이 없어요!" />;
  }
  const { dayCount, status } = progressWishesData;

  const dDay = dayCount - 7;

  return (
    <WishesCreateDone progressWishesData={progressWishesData} nickName={nickName}>
      <WishesCreateDoneMessage nickName={nickName} status={status} dDay={dDay} />;
    </WishesCreateDone>
  );
}

export async function AccountInputWithSavedAccountData() {
  const savedUserAccountData = await getUserAccount();

  return <WishesAccountInputForm savedUserAccountData={savedUserAccountData.transferInfo} />;
}
