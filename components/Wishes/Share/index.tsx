import styled from 'styled-components';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import router from 'next/router';
import theme from '@/styles/theme';
import { CloseBlueIc } from '@/public/assets/icons';
import { ShareChatImg, MainCakeImg } from '@/public/assets/images';
import { LoginUserInfo } from '@/recoil/auth/loginUserInfo';
import Button from '@/components/Common/button';
import useModal from '@/hooks/common/useModal';
import { useGetMainProgressData } from '@/hooks/queries/wishes';
import ShareModal from '@/components/Common/modal/ShareModal';
import Modal from '@/components/Common/modal';

export default function ShareContainer() {
  const { isOpen, handleToggle } = useModal();

  const { progressData } = useGetMainProgressData();

  const loginUserInfo = useRecoilValue(LoginUserInfo);

  const handleMoveToMain = () => {
    router.push('/main');
  };

  return (
    <>
      <Styled.TopButtonWrapper>
        <Image src={CloseBlueIc} alt="닫기" onClick={handleMoveToMain} />
      </Styled.TopButtonWrapper>
      <Styled.Container>
        <Styled.Title>{`${loginUserInfo.nickName}님의\n 소원 생성 완료!`}</Styled.Title>
        {progressData?.status === 'WHILE' ? (
          <Styled.About>선물주들에게 생일 축하 받으러 가볼까요?</Styled.About>
        ) : (
          <Styled.About>
            {progressData ? progressData?.dayCount : '?'}일 뒤부터 링크를 공유할 수 있어요
          </Styled.About>
        )}

        <Styled.ImageContainer>
          <Image src={ShareChatImg} alt="말풍선" />
          <Image src={MainCakeImg} alt="케이크" width={219} height={219} />
        </Styled.ImageContainer>
      </Styled.Container>

      {isOpen && (
        <Modal isOpen={isOpen} handleToggle={handleToggle}>
          <ShareModal handleToggle={handleToggle} />
        </Modal>
      )}
      <Styled.ButtonWrapper>
        <Button
          boxType="large"
          colorSystem="mainBlue_white"
          handleClickFn={progressData?.status === 'WHILE' ? handleToggle : handleMoveToMain}
        >
          {progressData?.status === 'WHILE' ? '링크 공유하기' : '홈화면으로 이동하기'}
        </Button>
      </Styled.ButtonWrapper>
    </>
  );
}

const Styled = {
  TopButtonWrapper: styled.div`
    display: flex;
    flex-direction: row-reverse;
  `,

  Title: styled.div`
    display: flex;
    justify-content: center;
    margin: 0 0 2rem;
    ${theme.fonts.headline30};
    color: ${theme.colors.main_blue};
    text-align: center;
    white-space: pre-line;
  `,

  Container: styled.div`
    margin: 6.7rem 0 12.2rem;
  `,

  ImageContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  `,

  About: styled.div`
    display: flex;
    justify-content: center;
    margin: 0 0 4.3rem;
    ${theme.fonts.body16};
    color: ${theme.colors.main_blue};
  `,

  ButtonWrapper: styled.div`
    margin-bottom: 10.4rem;
  `,
};
