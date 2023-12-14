import styled from 'styled-components';
import Image from 'next/image';

import theme from '@/styles/theme';
import { CloseSmallIc } from '@/public/assets/icons';
import IconButton from '@/components/common/button/iconButton';
import { MainCakeImg } from '@/public/assets/images';
import Button from '../button';

interface DeleteModalProps {
  clickModal: () => void;
  handleDelete: () => void;
  linksCount: number;
}

export default function DeleteModal(props: DeleteModalProps) {
  const { clickModal, handleDelete, linksCount } = props;

  const handleDeleteConfirm = () => {
    handleDelete();
    clickModal();
  };

  return (
    <Styled.Container>
      <Styled.IconContainer>
        <IconButton src={CloseSmallIc} alt="닫기" onClick={clickModal} />
      </Styled.IconContainer>

      <Styled.ContentContainer>
        <Image src={MainCakeImg} alt={'케이크'} width={60} height={60} />
        <Styled.DeleteText>총 {linksCount}개의 소원링크를 삭제합니다.</Styled.DeleteText>
      </Styled.ContentContainer>

      <Styled.ButtonContainer>
        <Button boxType="btn--half" handleClickFn={clickModal}>
          취소
        </Button>
        <Button boxType="btn--half" handleClickFn={handleDeleteConfirm}>
          확인
        </Button>
      </Styled.ButtonContainer>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
    width: 31.6rem;
    height: 21.2rem;
    background-color: ${theme.colors.pastel_blue};
    padding: 2rem;
    border-radius: 1.6rem;
    margin: 0 1rem 0;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,

  IconContainer: styled.header`
    position: absolute;
    top: 20%;
    right: 5%;
    transform: translate(-50%, -50%);
  `,

  ContentContainer: styled.div`
    margin: 1.5rem 0 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  DeleteText: styled.div`
    ${theme.fonts.body14};
    color: ${theme.colors.dark_blue};
    margin: 0.7rem 0 1rem;
  `,

  ButtonContainer: styled.div`
    display: flex;
    align-items: center;
    & > :not(:last-child) {
      margin-right: 1rem;
    }
  `,
};
