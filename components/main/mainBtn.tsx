import router from 'next/router';
import Button from '../common/button';
import styled from 'styled-components';
import useModal from '@/hooks/common/useModal';
import Modal from '../common/modal';
import ShareModalConent from '../common/modal/share/ShareModalConent';
import { useGetMainProgressData } from '@/hooks/queries/wishes';
import ModalContainer from '../common/modal/ModalContainer';
import ShareModal from '../common/modal/share';

export default function MainBtn() {
  const { progressData } = useGetMainProgressData();
  const progressStatus = progressData?.status;

  const { isOpen, handleToggle } = useModal();

  const handleMoveWishesPage = () => {
    router.push('/wishes');
  };

  return (
    <Styled.ButtonWrapper>
      {progressStatus ? (
        progressStatus !== 'END' && (
          <Button
            boxType="btn--large"
            colorSystem={progressStatus === 'BEFORE' ? 'gray1_gray2' : 'mainBlue_white'}
            handleClickFn={handleToggle}
          >
            {'내 소원 링크 공유하기'}
          </Button>
        )
      ) : (
        <Button
          boxType="btn--large"
          colorSystem={'mainBlue_white'}
          handleClickFn={handleMoveWishesPage}
        >
          {'소원 링크 생성하기'}
        </Button>
      )}
      {isOpen && (
        <ModalContainer modalType="modalInClose" isOpen={isOpen} handleToggle={handleToggle} bgNone>
          <ShareModal />
        </ModalContainer>
      )}
    </Styled.ButtonWrapper>
  );
}

const Styled = {
  ButtonWrapper: styled.div`
    margin-top: 7.1rem;
    margin: 7.1rem 0 10.4rem;
  `,
};
