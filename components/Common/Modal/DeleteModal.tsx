import styled from 'styled-components';
import Image from 'next/image';
import theme from '@/styles/theme';
import { MainCakeImg } from '@/public/assets/images';
import ConfirmCancleModal from './ModalForm/ConfirmCancleModal';

interface DeleteModalProps {
  clickModal: () => void;
  handleDelete: () => void;
  linksCount: number;
}

export default function DeleteModal(props: DeleteModalProps) {
  const { clickModal, handleDelete, linksCount } = props;

  return (
    <ConfirmCancleModal handleToggle={clickModal} handleDelete={handleDelete}>
      <Image src={MainCakeImg} alt={'케이크'} width={60} height={60} />
      <Styled.DeleteText>총 {linksCount}개의 소원링크를 삭제합니다.</Styled.DeleteText>
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
