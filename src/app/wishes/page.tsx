import MainLayout from '@/layouts/MainLayout';
import Header, { MypageButton } from '@/components/Elements/Hedaer';
import { getMainProgressWishesData } from '@/api/wishes';
import { getLoginUserCookiesData } from '@/utils/common/cookies';
import { defaultCakeTreeDataArray } from '@/constant/model/cakesTreeData';
import GradientShadow from '@/components/UI/GradientShadow';
import CreateWishesButtonWithModal from './Components/CreateWishesButtonWithModal';
import { getCakesResult } from '@/api/cakes';
import {
  AdminMessageAlarmIcon,
  RecentMessageAlarmIcon,
} from '@/components/Elements/Icon/MessageAlarmIcon';
import { defineCakeTree } from '@/utils/common/defineCakeTree';
import ShareWishesButtonWithModal from './Components/ShareWishesButtonWithModal';
import CakePresentList from './Components/CakePresentList';
import ErrorPage from '../error';

export type WishesPageModalKey = ['create', 'share'];
const modalKey: WishesPageModalKey = ['create', 'share'];

const Page = async () => {
  const progressWishesData = await getMainProgressWishesData();
  const loginUserData = await getLoginUserCookiesData();

  if (!loginUserData) {
    return <ErrorPage alertMessage="로그인이 필요해요!" />;
  }

  const isWishInProgress = !!progressWishesData;
  const receivedCakeList = isWishInProgress
    ? await getCakesResult(progressWishesData.wishId)
    : null;

  return (
    <MainLayout Header={<Header rightMenu={<MypageButton />} />} modalKeys={modalKey}>
      {isWishInProgress ? (
        <>
          <p className={dayTextStyle}>{'D-?'}</p>
          <p className={guidTextStyle}>
            {receivedCakeList.length === 0
              ? `${loginUserData?.nickName}님의 생일을 축하하며\n편지 12개를 선물로 드렸어요!`
              : `${loginUserData?.nickName}님의 생일잔치에\n케이크가 도착했어요!`}
          </p>
          {receivedCakeList.length === 0 ? <AdminMessageAlarmIcon /> : <RecentMessageAlarmIcon />}
          <CakePresentList
            cakeList={defineCakeTree(receivedCakeList.reverse())}
            wishId={progressWishesData.wishId}
            nickName={loginUserData?.nickName}
          />
          <ShareWishesButtonWithModal
            wishId={progressWishesData?.wishId}
            nickName={loginUserData?.nickName}
          />
        </>
      ) : (
        <>
          <p className={dayTextStyle}>{'D-?'}</p>
          <p className={guidTextStyle}>
            {`${loginUserData?.nickName}님, 친구들을 초대해\n케이크 접시를 꾸며봐요!`}
          </p>
          <CakePresentList cakeList={defaultCakeTreeDataArray} readonly />
          <CreateWishesButtonWithModal />
        </>
      )}
      <GradientShadow height={19} />
    </MainLayout>
  );
};

export default Page;

const dayTextStyle =
  'flex flex-row-reverse w-full text-[24px] font-bitbit text-center text-main_blue mt-12 mb-10';

const guidTextStyle =
  'text-[24px] font-bitbit text-center text-white whitespace-pre-wrap transition-opacity duration-500 opacity-100 leading-tight';
