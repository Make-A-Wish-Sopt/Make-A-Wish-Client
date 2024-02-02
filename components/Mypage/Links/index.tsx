import theme from '@/styles/theme';
import styled from 'styled-components';
import useModal from '@/hooks/common/useModal';
import Modal from '@/components/Common/Modal';
import DeleteModal from '@/components/Common/Modal/DeleteModal';
import { useState } from 'react';
import WishLists from './WishLists';
import NoWishLists from './NoWishLists';
import { useDeleteWishes, useGetWishLinks } from '@/hooks/queries/wishes';
import Image from 'next/image';
import { DeleteBtnIc } from '@/public/assets/icons';
import BackBtn from '@/components/Common/Button/BackBtn';

export default function LinksMainContainer() {
  const [selectedLinks, setSelectedLinks] = useState<number[]>([]);
  const { isOpen, handleToggle } = useModal();

  const { handleDeleteWishes } = useDeleteWishes();

  const { wishLinks, noWishes } = useGetWishLinks();

  const handleCheckbox = (wishId: number) => {
    if (selectedLinks.includes(wishId)) {
      setSelectedLinks((prev) => prev.filter((item) => item !== wishId));
    } else {
      setSelectedLinks((prev) => [...prev, wishId]);
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedLinks.length > 0) {
      handleDeleteWishes(selectedLinks);
    }
  };

  return (
    <Styled.Container>
      {isOpen && (
        <Modal isOpen={isOpen} handleToggle={handleToggle}>
          <DeleteModal
            clickModal={handleToggle}
            handleDelete={handleDeleteConfirm}
            linksCount={selectedLinks.length}
          />
        </Modal>
      )}
      <Styled.Hedaer>
        <BackBtn />
        <Styled.DeleteIconButton onClick={() => selectedLinks.length > 0 && handleToggle()}>
          <Image src={DeleteBtnIc} alt="삭제 아이콘" />
        </Styled.DeleteIconButton>
      </Styled.Hedaer>

      <Styled.Title>지난 소원 링크 모음</Styled.Title>
      <Styled.SectionContainer>
        {noWishes ? (
          <NoWishLists />
        ) : (
          <WishLists
            selectedLinks={selectedLinks}
            linksData={wishLinks}
            handleCheckbox={handleCheckbox}
          />
        )}
      </Styled.SectionContainer>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
    width: 100%;
    height: 100vh;
  `,
  Hedaer: styled.header`
    display: flex;
    justify-content: space-between;

    width: 100%;
  `,

  SectionContainer: styled.section`
    position: relative;

    margin: 0 1rem 0;
    overflow: auto;
    max-height: 80vh;
  `,

  Title: styled.h1`
    ${theme.fonts.headline24_130};
    color: ${theme.colors.gray4};
    margin: 2rem 1rem 2rem;
  `,

  DeleteIconButton: styled.button``,
};
