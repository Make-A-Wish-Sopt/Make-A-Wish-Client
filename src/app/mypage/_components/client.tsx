'use client';

import { PropsWithChildren } from 'react';
import Box from '@/components/Elements/Box';
import ArrowIcon from '@/components/Elements/Icon/ArrowIcon';
import { useRouters } from '@/hooks/useRouters';
import useModals from '@/hooks/useModals';
import { useModalContent } from '@/hooks/useModalContent';
import Button from '@/components/Elements/Button';
import { patchProgressWishes } from '@/api/wishes';
import { toast } from 'sonner';
import useKakaoAuth from '@/hooks/useKakaoAuth';
import { deleteUserInfo } from '@/api/user';
import Image from 'next/image';
import { GuideImg } from '@public/assets/images';
import { useFetch } from '@/hooks/useFetch';
import ClipLoader from 'react-spinners/ClipLoader';
import { colors } from '@/styles/styles';

export const MypageMenuContainer = ({ children }: PropsWithChildren) => {
  return <ul className="flex flex-col gap-12">{children}</ul>;
};

export const EditWishMenu = ({ disabled }: { disabled?: boolean }) => {
  return <MoreButton text={'진행 중인 생일잔치 정보 수정하기'} disabled={disabled} />;
};

export const PrevWishesData = ({ disabled }: { disabled?: boolean }) => {
  return <MoreButton text={'지난 생일잔치 링크모음'} disabled={disabled} />;
};

export const CSLinkMenu = () => {
  const handleLinkCS = () => {
    window.open('https://sunmulzu.notion.site/5c1945f34dd3440a984d09cf52f7a591?pvs=4');
  };
  return <MoreButton text="고객센터 문의하기" handleClick={handleLinkCS} />;
};

export const EditSelectPaymnetMenu = ({ disabled }: { disabled?: boolean }) => {
  const { handleRouter } = useRouters();

  return (
    <MoreButton
      text={'현금 입금 방식 변경하기'}
      handleClick={() => handleRouter('/mypage/edit/selectPayment')}
      disabled={disabled}
    />
  );
};

export const ServiceGuideMenu = () => {
  const { Modal, openModal } = useModals<['guide']>();

  return (
    <Modal
      modalKey="guide"
      Trigger={<MoreButton text="사용설명서 보기" handleClick={() => openModal('guide')} />}
    >
      <Modal.ModalOverlay>
        <Modal.ModalLayout>
          <Image className="w-[85%]" src={GuideImg} alt="안내 이미지" />
        </Modal.ModalLayout>
      </Modal.ModalOverlay>
    </Modal>
  );
};

export const CloseWishMenu = ({ disabled }: { disabled?: boolean }) => {
  const { ConfirmModalContent, closeModal, Modal, openModal } = useModalContent<['closeWish']>();
  const { handleRefresh } = useRouters();
  const { fetchData, LoadingModal } = useFetch(patchProgressWishes);

  const handleCloseWish = async () => {
    const response = await fetchData();

    if (response.success) {
      toast.success('생일잔치 중단완료!');
      setTimeout(() => {
        closeModal('closeWish');
        handleRefresh();
      }, 1500);
    } else {
      toast.error('생일잔치를 중단하는 중 오류가 발생했어요ㅠㅠ');
      setTimeout(() => {
        closeModal('closeWish');
        handleRefresh();
      }, 1500);
    }

    closeModal('closeWish');
  };

  return (
    <>
      <Modal
        modalKey="closeWish"
        Trigger={
          <MoreButton
            text={'진행 중인 생일잔치 중단하기'}
            handleClick={() => openModal('closeWish')}
            disabled={disabled}
          />
        }
      >
        <ConfirmModalContent contentTitle={`진행 중인 생일잔치를\n중단하시겠어요?`}>
          <Modal.ButtonWrapper className="flex justify-between gap-10 w-full">
            <Button
              bgColor="white"
              fontColor="dark_green"
              onClick={() => {
                closeModal('closeWish');
              }}
            >
              취소
            </Button>
            <Button bgColor="dark_green" fontColor="white" onClick={() => handleCloseWish()}>
              중단하기
            </Button>
          </Modal.ButtonWrapper>
        </ConfirmModalContent>
      </Modal>
      {<LoadingModal render={<ClipLoader color={colors.main_blue} size={68} />} />}
    </>
  );
};

export const MypageAuthButtons = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const { handleKaKaoLogin, handleKaKaoLogout } = useKakaoAuth();
  const {
    Modal: LogoutModal,
    openModal: openLogoutModal,
    ConfirmModalContent,
    closeModal: closeLogoutModal,
  } = useModalContent<['logout']>();

  const handleLogout = () => {
    fetch('/api/cookies', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        handleKaKaoLogout();
      })
      .catch(() => {});
  };

  return (
    <>
      <ul className="flex flex-col gap-4 mt-30">
        {isLoggedIn ? (
          <>
            <LogoutModal
              modalKey="logout"
              Trigger={
                <li className={authButtonStyle}>
                  <button onClick={() => openLogoutModal('logout')} className="underline">
                    로그아웃
                  </button>
                </li>
              }
            >
              <ConfirmModalContent contentTitle={`서비스에서\n로그아웃 하시겠어요?`}>
                <LogoutModal.ButtonWrapper className="flex justify-between gap-10 w-full">
                  <Button
                    bgColor="white"
                    fontColor="dark_green"
                    onClick={() => {
                      closeLogoutModal('logout');
                    }}
                  >
                    아니요
                  </Button>
                  <Button bgColor="dark_green" fontColor="white" onClick={handleLogout}>
                    예
                  </Button>
                </LogoutModal.ButtonWrapper>
              </ConfirmModalContent>
            </LogoutModal>

            {/* <li className={authButtonStyle}>회원탈퇴</li> */}
          </>
        ) : (
          <li onClick={handleKaKaoLogin} className={authButtonStyle}>
            회원가입
          </li>
        )}
      </ul>
    </>
  );
};

const MoreButton = ({
  text,
  disabled = false,
  handleClick,
}: {
  text: string;
  disabled?: boolean;
  handleClick?: () => void;
}) => {
  function handleMoreClick() {
    if (disabled || !handleClick) return;
    handleClick();
  }

  return (
    <Box as={'button'} onClick={handleMoreClick} fontColor="main_blue" disabled={disabled}>
      <div className="flex justify-between items-center w-full h-full font-bitbit text-[18px]">
        {text}
        <ArrowIcon color={disabled ? 'gray3' : 'main_blue'} />
      </div>
    </Box>
  );
};

const authButtonStyle = 'font-bitbit text-[18px] text-main_blue cursor-pointer';
