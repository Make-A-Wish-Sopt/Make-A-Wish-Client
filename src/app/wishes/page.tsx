import MainLayout from '@/layouts/MainLayout';
import Header, { MypageButton } from '@/components/Elements/Header';
import { getMainProgressWishesData } from '@/api/wishes';
import { getLoginUserCookiesData } from '@/utils/common/cookies';
import { CakeTreeDataType, defaultCakeTreeDataArray } from '@/constant/model/cakesTreeData';
import GradientShadow from '@/components/UI/GradientShadow';
import CakePresentList from './_components/CakePresentList';
import { getCakesResult } from '@/api/cakes';
import {
  AdminMessageAlarmIcon,
  RecentMessageAlarmIcon,
} from '@/components/Elements/Icon/MessageAlarmIcon';
import { defineCakeTree } from '@/utils/common/defineCakeTree';
import { AlimTalkMessageButton } from './_components/AlimTalckButton';
import { ItemWrapper } from '@/components/Elements/Button/FixedBottomButton';
import { ShareWishesButton } from './_components/ShareWishesButtonWithModal';
import { CreateWishesButton } from './_components/CreateWishesButton';

const Page = async () => {
  const loginUserData = await getLoginUserCookiesData();
  const progressWishsData = await getMainProgressWishesData();

  const isWishInProgress = !!progressWishsData;
  const receivedCakeList = isWishInProgress ? await getCakesResult(progressWishsData.wishId) : [];
  const wishId = progressWishsData?.wishId ?? '';
  const nickName = loginUserData.nickName;
  const hasReceivedCake = receivedCakeList.length > 0;

  return (
    <MainLayout Header={<Header rightMenu={<MypageButton />} />}>
      <p className={dayTextStyle}>
        {isWishInProgress && progressWishsData ? `D-${progressWishsData?.dayCount + 1}` : 'D-?'}
      </p>
      <p className={guidTextStyle}>{getGuidText(nickName, isWishInProgress, hasReceivedCake)}</p>
      {isWishInProgress && getAlarmIcon(hasReceivedCake)}

      {isWishInProgress
        ? renderWishesInProgress(
            receivedCakeList,
            wishId,
            nickName,
            progressWishsData?.status === 'BEFORE'
              ? `${progressWishsData?.dayCount + 1}일 뒤에 생일잔치 오픈!`
              : '지금 바로 친구 초대하기',
          )
        : renderNoWishes()}
      <GradientShadow height={19} />
    </MainLayout>
  );
};

export default Page;

// ===== 👇 서브 함수 분리 =====

const renderWishesInProgress = (
  cakeList: CakeTreeDataType[],
  wishId: string,
  nickName: string,
  buttonText: string,
) => (
  <>
    <CakePresentList cakeList={defineCakeTree([...cakeList])} wishId={wishId} nickName={nickName} />

    <ItemWrapper fixedBottom className="z-30">
      <ShareWishesButton wishId={wishId} nickName={nickName} buttonText={buttonText} />
    </ItemWrapper>
  </>
);

const renderNoWishes = () => (
  <>
    <CakePresentList cakeList={defaultCakeTreeDataArray} readonly />

    <ItemWrapper fixedBottom vertical className="gap-10 z-30">
      <CreateWishesButton />
      <AlimTalkMessageButton buttonText={'아직 생일이 멀었어요ㅠㅠ'} />
    </ItemWrapper>
  </>
);

// ===== 👇 유틸 함수 분리 =====

const getGuidText = (nickName: string, isInProgress: boolean, hasCake: boolean) => {
  if (!isInProgress) return `${nickName}님, 생일잔치를 생성해서\n현금 선물과 편지를 받아보세요!`;
  return hasCake
    ? `${nickName}님의 생일잔치에\n케이크가 도착했어요!`
    : `${nickName}님의 생일을 축하하며\n편지 12개를 선물로 드렸어요!`;
};

const getAlarmIcon = (hasCake: boolean) =>
  hasCake ? <RecentMessageAlarmIcon /> : <AdminMessageAlarmIcon />;

// ===== 👇 스타일 상수 =====

const dayTextStyle =
  'flex flex-row-reverse w-full text-[24px] font-bitbit text-center text-main_blue mt-12 mb-10';

const guidTextStyle =
  'text-[24px] font-bitbit text-center text-white whitespace-pre-wrap transition-opacity duration-500 opacity-100 leading-tight';
