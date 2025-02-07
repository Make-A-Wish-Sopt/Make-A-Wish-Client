import MainLayout from '@/layouts/MainLayout';
import Header, { MypageButton } from '@/components/Common/Hedaer';
import { getMainProgressWishesData } from '@/api/wishes';
import { getLoginUserCookiesData } from '@/utils/common/cookies';
import WishesPageContainer, {
  CakePresentList,
  WishesPageFixedBottomButton,
} from '@/domain/wishes/(main)/container';
import {
  GetReceivedCakePresentList,
  GetCakeCountThenGuideMessageToUser,
} from '@/domain/wishes/(main)/service';
import { defaultCakeTreeDataArray } from '@/constant/model/cakesTreeData';
import GradientShadow from '@/components/UI/GradientShadow';
import { GuideText } from '@/components/UI/GuideText';
import { DayCount } from '@/domain/wishes/(main)/content';

export default async function WishesPage() {
  const progressWishesData = await getMainProgressWishesData();
  // const progressWishesData = undefined;
  const loginUserData = await getLoginUserCookiesData();
  const isProgressWishes = !!progressWishesData;

  return (
    <MainLayout Header={<Header rightMenu={<MypageButton />} />} isPrivate>
      <WishesPageContainer
        progressWishesData={progressWishesData}
        userNickname={loginUserData?.nickName}
        FixedBottomButton={<WishesPageFixedBottomButton isProgressWishes={!!progressWishesData} />}
      >
        {isProgressWishes ? (
          <>
            <GetCakeCountThenGuideMessageToUser
              wishId={progressWishesData.wishId}
              nickName={loginUserData?.nickName}
            />
            <GetReceivedCakePresentList wishId={progressWishesData.wishId} />
          </>
        ) : (
          <>
            <DayCount>{'D-?'}</DayCount>
            <GuideText>{`${loginUserData?.nickName}님, 친구들을 초대해\n케이크 접시를 꾸며봐요!`}</GuideText>
            <CakePresentList cakeList={defaultCakeTreeDataArray} readonly />
          </>
        )}
        <GradientShadow height={19} />
        <WishesPageFixedBottomButton isProgressWishes={isProgressWishes} />
      </WishesPageContainer>
    </MainLayout>
  );
}
