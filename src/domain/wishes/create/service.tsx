import { getMainProgressWishesData } from '@/api/wishes';
import ErrorPage from '@/app/error';
import { getLoginUserCookiesData } from '@/utils/common/cookies';
import Image from 'next/image';
import { SharePageCakeImg } from '../../../../public/assets/images';
import { getUserAccount } from '@/api/user';
import WishesAccountInputForm from './wishesAccountInputForm';
import { ShareSnsModal } from './container';

export async function CenteredContent() {
  const progressWishesData = await getMainProgressWishesData();
  const { nickName } = await getLoginUserCookiesData();

  if (!progressWishesData) {
    return <ErrorPage alertMessage="진행중인 소원이 없어요!" />;
  }
  const { dayCount, status } = progressWishesData;

  const dDay = dayCount - 7;

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="font-bitbit text-[24px] text-main_blue mt-76 mb-20 leading-10 text-center">
        {nickName}의 생일잔치
        <br />
        링크 생성 완료!{' '}
      </h1>
      <span className="font-galmuri text-[14px] text-white mb-44">
        {status === 'WHILE'
          ? '생일 축하 받으로 가볼까요?'
          : `${dDay}일 뒤부터 링크를 공유할 수 있어요`}
      </span>
      <Image src={SharePageCakeImg} alt="링크생성 완료 케이크 이미지" width={221} />
    </div>
  );
}

export async function ShareWishesLinkModal() {
  const progressWishesData = await getMainProgressWishesData();
  const { nickName } = await getLoginUserCookiesData();

  // return <ShareSnsModal wishId={progressWishesData.wishId} nickName={nickName} />;
  return <></>;
}

export async function AccountInputWithSavedAccountData() {
  const savedUserAccountData = await getUserAccount();

  return <WishesAccountInputForm savedUserAccountData={savedUserAccountData.transferInfo} />;
}
