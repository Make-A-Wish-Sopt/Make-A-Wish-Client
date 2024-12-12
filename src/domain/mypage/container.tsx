'use client';

import { patchProgressWishes } from '@/api/wishes';
import MoreBox from '@/components/UI/MoreBox';
import { useRouters } from '@/hooks/common/useRouters';
import { MypageUserName, UserManualGuideButton } from './component';
import useToggle from '@/hooks/common/useToggle';
import CloseIconInModalWithVitaminCake from '@/components/Common/Modal/CloseIconInModalWithVitaminCake';
import Button from '@/components/Common/Button';
import { WishesLinkDataType } from '@/types/input';
import { WishStatusType } from '@/types/wishesType';
import useKakaoAuth from '@/hooks/common/useKakaoAuth';

export default function MypageContainer({
  nickName,
  progressWishes,
  isLoggedIn,
}: {
  nickName: string;
  progressWishes?: WishesLinkDataType & {
    status: WishStatusType;
  };
  isLoggedIn: boolean;
}) {
  const { handleRouter } = useRouters();
  const {
    state: pauseWishesModalState,
    changeState: chnagePauseWishesModalState,
    handleState: handlePauseWishesModalState,
  } = useToggle();

  function handleConnectServiceCenter() {
    window.open('https://sunmulzu.notion.site/5c1945f34dd3440a984d09cf52f7a591?pvs=4');
  }

  return (
    <>
      <MypageUserName nickName={nickName} />

      <ul className="flex flex-col gap-12">
        {isLoggedIn && (
          <>
            <MoreBox
              text="진행 중인 생일잔치 정보 수정하기"
              handleClick={() => {
                handleRouter('/mypage/edit/link');
              }}
              disabled={progressWishes === undefined}
            />
            <MoreBox
              text="현금 입금 방식 변경하기"
              handleClick={() => {
                handleRouter('/mypage/edit/deposit?step=select');
              }}
              disabled={progressWishes ? !progressWishes.wantsGift : false}
            />
            <MoreBox
              text="진행 중인 생일잔치 중단하기"
              handleClick={() => {
                chnagePauseWishesModalState(true);
              }}
              disabled={progressWishes === undefined}
            />
            <MoreBox
              text="지난 생일잔치 링크모음"
              handleClick={() => {
                handleRouter('/mypage/wishes-history');
              }}
            />
          </>
        )}

        <UserManualGuideButton />

        <MoreBox handleClick={handleConnectServiceCenter} text="고객센터 문의하기" />
      </ul>

      <MypageAuthButtons isLoggedIn={isLoggedIn} />
      {pauseWishesModalState && (
        <CloseIconInModalWithVitaminCake
          isOpen={pauseWishesModalState}
          handleState={handlePauseWishesModalState}
          modalTitle={`진행 중인 생일잔치를\n중단하시겠어요?`}
        >
          <div className="flex justify-between gap-10 w-full">
            <Button
              bgColor="white"
              fontColor="dark_green"
              onClick={() => {
                chnagePauseWishesModalState(false);
              }}
            >
              취소
            </Button>
            <Button
              bgColor="dark_green"
              fontColor="white"
              onClick={() => {
                patchProgressWishes();
                chnagePauseWishesModalState(false);
              }}
            >
              중단하기
            </Button>
          </div>
        </CloseIconInModalWithVitaminCake>
      )}
    </>
  );
}

function MypageAuthButtons({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { handleKaKaoLogin, handleKaKaoLogout } = useKakaoAuth();

  return (
    <ul className="flex flex-col gap-4 mt-30">
      {isLoggedIn ? (
        <>
          <li
            onClick={handleKaKaoLogout}
            className="font-bitbit text-[18px] text-main_blue underline cursor-pointer"
          >
            로그아웃
          </li>
          <li className="font-bitbit text-[18px] text-main_blue underline cursor-pointer">
            회원탈퇴
          </li>
        </>
      ) : (
        <>
          <li
            onClick={handleKaKaoLogin}
            className="font-bitbit text-[18px] text-main_blue underline cursor-pointer"
          >
            회원가입
          </li>
        </>
      )}
    </ul>
  );
}
