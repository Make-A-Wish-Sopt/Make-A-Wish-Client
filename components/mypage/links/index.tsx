import theme from '@/styles/theme';
import styled from 'styled-components';
import InputHeader from '@/components/common/inputHeader';
import BackBtn from '@/components/common/button/backBtn';
import IconButton from '@/components/common/button/iconButton';
import { DeleteBtnIc } from '@/public/assets/icons';
import useModal from '@/hooks/common/useModal';
import Modal from '@/components/common/modal/modal';
import DeleteModal from '@/components/common/modal/DeleteModal';
import { useState } from 'react';
import { useGetWishLinks } from '@/hooks/queries/links/useGetWishLinks';
import WishLists from './wishLists';
import NoWishLists from './noWishLists';
import { useDeleteWishLinks } from '@/hooks/queries/links/useDeleteWishLinks';
import { useQueryClient } from 'react-query';
import { QUERY_KEY } from '@/constant/queryKey';


export default function LinksMainContainer() {
  const [selectedLinks, setSelectedLinks] = useState<number[]>([]);
  const { isOpen, handleToggle } = useModal();
  const queryClient = useQueryClient();

  const deleteWishesMutation = useDeleteWishLinks();

  const { wishLinks, noWishes } = useGetWishLinks();

  const handleCheckbox = (wishId: number) => {
    if (selectedLinks.includes(wishId)) {
      setSelectedLinks(prev => prev.filter(item => item !== wishId));
    } else {
      setSelectedLinks(prev => [...prev, wishId]);
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedLinks.length > 0) {
      deleteWishesMutation.mutate(selectedLinks, {
        onSuccess: () => {
          queryClient.invalidateQueries(QUERY_KEY.WISH_LINKS);
        },
      })
    }
  }

  return (
    <>
      <InputHeader>
        <BackBtn />
        {/* {noWishes ? null : <IconButton onClick={() => handleToggle()} src={DeleteBtnIc} alt="삭제하기" />} */}
        <IconButton onClick={() => handleToggle()} src={DeleteBtnIc} alt="삭제하기" />
      </InputHeader>
      {isOpen && (
        <Modal isOpen={isOpen} handleToggle={handleToggle}>
          <DeleteModal clickModal={handleToggle} handleDelete={handleDeleteConfirm} linksCount={selectedLinks.length} />
        </Modal>)}

      <Styled.Title>지난 소원 링크 모음</Styled.Title>
      <Styled.Container>
        {noWishes ? <NoWishLists /> : <WishLists selectedLinks={selectedLinks} linksData={wishLinks} handleCheckbox={handleCheckbox} />}
      </Styled.Container>
    </>
  );
}

const Styled = {
  Container: styled.div`
  margin: 0 1rem 0;
  overflow: auto;
  max-height: 80vh;
  `,

  Title: styled.h1`
    ${theme.fonts.headline24_130};
    color: ${theme.colors.gray4};
    margin: 2rem 1rem 2rem;
  `,
};
