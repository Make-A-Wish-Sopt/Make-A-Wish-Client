import Image from 'next/image';
import ConfirmCancleModal from './ModalForm/ConfirmCancleModal';
import { MainCakeImg } from '@/public/assets/images';
import styled from 'styled-components';
import theme from '@/styles/theme';

interface CancleWishesModalProps {
  handleToggle: () => void;
  handleCancleWishes: () => void;
}

export default function CancleWishesModal(props: CancleWishesModalProps) {
  const { handleToggle, handleCancleWishes } = props;
  return (
    <ConfirmCancleModal
      handleToggle={handleToggle}
      handleDelete={handleCancleWishes}
      rightText="중단하기"
    >
      <Image src={MainCakeImg} alt={'케이크'} width={60} height={60} />
      <Styled.DeleteText>진행중인 소원 링크를 중단하시겠습니까?</Styled.DeleteText>
    </ConfirmCancleModal>
  );
}

const Styled = {
  DeleteText: styled.div`
    ${theme.fonts.body14};
    color: ${theme.colors.dark_blue};
    margin: 0.7rem 0 1rem;
  `,
};
