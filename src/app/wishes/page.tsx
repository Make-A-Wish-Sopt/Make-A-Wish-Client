import MainLayout from '@/layouts/MainLayout';
import Header, { MypageButton } from '@/components/Common/Hedaer';
import { getMainProgressWishesData } from '@/api/wishes';
import { getLoginUserCookiesData } from '@/utils/common/cookies';
import { CakePresentList } from '@/domain/wishes/(main)/container';
import { defaultCakeTreeDataArray } from '@/constant/model/cakesTreeData';
import GradientShadow from '@/components/UI/GradientShadow';
import CreateWishesButtonWithModal from './Components/CreateWishesButtonWithModal';
import { getCakesResult } from '@/api/cakes';

export type WishesPageModalKey = ['create', 'share'];

const Page = async () => {
  const progressWishesData = await getMainProgressWishesData();
  console.log(progressWishesData);
  const loginUserData = await getLoginUserCookiesData();
  const isWishInProgress = !!progressWishesData;
  const modalKey: WishesPageModalKey = ['create', 'share'];

  return (
    <MainLayout Header={<Header rightMenu={<MypageButton />} />} modalKeys={modalKey}>
      {isWishInProgress ? (
        <>{await getCakesResult(progressWishesData.wishId)}</>
      ) : (
        <>
          <p className={dayTextStyle}>{'D-?'}</p>
          <p className={guidTextStyle}>
            {`${loginUserData.nickName}님, 친구들을 초대해\n케이크 접시를 꾸며봐요!`}
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
