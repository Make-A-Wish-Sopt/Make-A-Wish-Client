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

  const dDayMessage =
    status === 'WHILE'
      ? '생일 축하 받으로 가볼까요?'
      : status === 'BEFORE'
        ? `${dayCount + 1}일 뒤부터 링크를 공유할 수 있어요`
        : '';

  const tryGiveCakeMessage =
    progressWishesData?.status === 'BEFORE' ? '링크 미리 저장해두기' : '바로 친구 초대하기';

  return (
    <WishesCreateDone
      progressWishesData={progressWishesData}
      nickName={nickName}
      tryGiveCakeMessage={tryGiveCakeMessage}
      shareBtnText={'생일잔치 체험해보기'}
    >
      <WishesCreateDoneMessage nickName={nickName} dDayMessage={dDayMessage} />;
    </WishesCreateDone>
  );
}
