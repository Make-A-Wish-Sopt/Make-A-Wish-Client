import MainLayout from '@/layouts/MainLayout';
import Header from '@/components/Common/Hedaer';
import { getMainProgressWishesData } from '@/api/wishes';
import { getCookieData } from '@/utils/common/cookies';
import WishesPageContainer, {
  CakesTreeMessage,
  ReceivedCakeMessageModal,
  WishesLinkSnsShareModal,
  WishesPageFixedBottomButton,
} from '@/domain/wishes/container';
import { ReceivedCakePresentList, WishesMessageToCreateUser } from '@/domain/wishes/service';
import { MessageText } from '@/domain/wishes/component';
import { defaultCakeTreeDataArray } from '@/constant/model/cakesTreeData';
import GradientShadow from '@/components/UI/GradientShadow';
import ErrorPage from '../error';
export const dynamic = 'force-dynamic';

export default async function WishesPage() {
  const progressWishesData = await getMainProgressWishesData();
  const loginUserData = await getCookieData();

  if (!loginUserData)
    return (
      <ErrorPage alertMessage="로그인이 필요해요!" routePath="/" btnMessage="로그인 하러가기" />
    );

  return (
    <>
      <Header mypageBtn />
      <MainLayout checkLoggedIn>
        <WishesPageContainer>
          {progressWishesData ? (
            <>
              <WishesMessageToCreateUser
                wishId={progressWishesData.wishId}
                nickName={loginUserData.nickName}
              />
              <ReceivedCakePresentList wishId={progressWishesData.wishId} />
              <WishesLinkSnsShareModal
                wishId={progressWishesData.wishId}
                nickName={loginUserData.nickName}
              />
              <ReceivedCakeMessageModal
                nickName={loginUserData.nickName}
                wishId={progressWishesData.wishId}
              />
            </>
          ) : (
            <>
              <span className="flex flex-row-reverse w-full text-[24px] font-bitbit text-center text-main_blue mt-12 mb-10">
                D-?
              </span>
              <MessageText>{`${loginUserData.nickName}님, 친구들을 초대해\n케이크 접시를 꾸며봐요!`}</MessageText>
              <CakesTreeMessage cakeList={defaultCakeTreeDataArray} />
            </>
          )}

          <GradientShadow height={19} />
          <WishesPageFixedBottomButton isWishProgress={!!progressWishesData}>
            {!!progressWishesData
              ? progressWishesData?.status === 'BEFORE'
                ? `${progressWishesData?.dayCount + 1}일 뒤에 생일잔치 오픈!`
                : '지금 바로 친구 초대하기'
              : '생일잔치 링크 생성하기'}
          </WishesPageFixedBottomButton>
        </WishesPageContainer>
      </MainLayout>
    </>
  );
}
