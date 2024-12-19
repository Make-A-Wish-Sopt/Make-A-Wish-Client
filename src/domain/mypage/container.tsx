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
import { deleteUserInfo } from '@/api/user';

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
  const { handleRouter, handleRefresh } = useRouters();
  const {
    state: pauseWishesModalState,
    changeState: changePauseWishesModalState,
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
              disabled={
                progressWishes === undefined || (progressWishes && progressWishes.status === 'END')
              }
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
                changePauseWishesModalState(true);
              }}
              disabled={
                progressWishes === undefined || (progressWishes && progressWishes.status === 'END')
              }
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
                changePauseWishesModalState(false);
              }}
            >
              취소
            </Button>
            <Button
              bgColor="dark_green"
              fontColor="white"
              onClick={async () => {
                await patchProgressWishes();
                changePauseWishesModalState(false);
                handleRefresh();
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

  const logoutModal = useToggle();
  const deleteUserModal = useToggle();

  async function handleLogout() {
    const response = await fetch('/api/cookies', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      handleKaKaoLogout();
    });
  }

  async function handleDeleteUser() {
    const data = await deleteUserInfo();
  }

  return (
    <>
      <ul className="flex flex-col gap-4 mt-30">
        {isLoggedIn ? (
          <>
            <li
              onClick={() => {
                logoutModal.changeState(true);
              }}
              className="font-bitbit text-[18px] text-main_blue underline cursor-pointer"
            >
              로그아웃
            </li>
            <li
              onClick={() => {
                deleteUserModal.changeState(true);
              }}
              className="font-bitbit text-[18px] text-main_blue underline cursor-pointer"
            >
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

      <CloseIconInModalWithVitaminCake
        isOpen={logoutModal.state}
        handleState={logoutModal.handleState}
        modalTitle={`서비스에서\n로그아웃 하시겠어요?`}
      >
        <div className="flex justify-between gap-10 w-full">
          <Button
            bgColor="white"
            fontColor="dark_green"
            onClick={() => {
              logoutModal.changeState(false);
            }}
          >
            아니요
          </Button>
          <Button bgColor="dark_green" fontColor="white" onClick={handleLogout}>
            예
          </Button>
        </div>
      </CloseIconInModalWithVitaminCake>

      <CloseIconInModalWithVitaminCake
        isOpen={deleteUserModal.state}
        handleState={deleteUserModal.handleState}
        modalTitle={
          <div className="flex flex-col gap-6">
            <span>{'서비스에서 탈퇴 하시겠어요?'}</span>
            <span className="font-galmuri text-[14px] text-dark_green">
              {'탈퇴 하시면 모든 편지가 날라가요 ㅠㅠ'}
            </span>
          </div>
        }
      >
        <div className="flex justify-between gap-10 w-full">
          <Button
            bgColor="white"
            fontColor="dark_green"
            onClick={() => {
              deleteUserModal.changeState(false);
            }}
          >
            아니요
          </Button>
          <Button bgColor="dark_green" fontColor="white" onClick={handleDeleteUser}>
            예
          </Button>
        </div>
      </CloseIconInModalWithVitaminCake>
    </>
  );
}
