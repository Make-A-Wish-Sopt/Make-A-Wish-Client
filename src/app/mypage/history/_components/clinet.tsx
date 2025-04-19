'use client';

import { deleteWishes } from '@/api/wishes';
import Box from '@/components/Elements/Box';
import Button from '@/components/Elements/Button';
import BackButton from '@/components/Elements/Button/BackButton';
import Header from '@/components/Elements/Header';
import CheckBox from '@/components/UI/CheckBox';
import StepTitle from '@/components/UI/StepTitle';
import useBoolean from '@/hooks/useBoolean';
import useModalContent from '@/hooks/useModalContent';
import { useRouters } from '@/hooks/useRouters';
import useSelectItem from '@/hooks/useSelectItem';
import MainLayout from '@/layouts/MainLayout';
import { WishesHistoryListType } from '@/types/api/response';
import { ArrowRightIc, DeleteBtnIc } from '@public/assets/icons';
import Image from 'next/image';
import { memo, useEffect } from 'react';
import { toast } from 'sonner';

export function WishesHistoryList({ wishesHistory }: { wishesHistory: WishesHistoryListType[] }) {
  const { selectedIdArray, cancelToDeleteIdList, addToDeleteIdList } = useSelectItem();

  const { handleRefresh } = useRouters();

  const handleDeleteWishes = async () => {
    if (selectedIdArray.length === 0) return;

    const response = await deleteWishes(selectedIdArray);

    if (response.data.success) {
      toast.success('생일잔치 삭제성공!');
      setTimeout(() => {
        handleRefresh();
      }, 1000);
    }
  };

  return (
    <MainLayout
      Header={
        <Header
          leftMenu={<BackButton routePath="/mypage" />}
          rightMenu={
            <DeleteWishButton selectedItems={selectedIdArray} onClick={handleDeleteWishes} />
          }
        />
      }
    >
      <StepTitle title="지난 생일잔치 링크 모음" />
      <HistoryList
        wishesHistory={wishesHistory}
        selectItem={addToDeleteIdList}
        cancelItem={cancelToDeleteIdList}
      />
    </MainLayout>
  );
}

const DeleteWishButton = ({
  selectedItems,
  onClick,
}: {
  selectedItems: number[];
  onClick: () => Promise<void>;
}) => {
  const { Modal, openModal, closeModal, ConfirmModalContent } = useModalContent<['deleteWish']>();

  const handleOpenModal = () => {
    if (selectedItems.length === 0) return;
    openModal('deleteWish');
  };

  const handleDeleteWish = async () => {
    await onClick();
    closeModal('deleteWish');
  };

  return (
    <Modal
      modalKey="deleteWish"
      Trigger={
        <button type="button" onClick={handleOpenModal}>
          <Image src={DeleteBtnIc} alt="삭제 아이콘" width={44} height={44} />
        </button>
      }
    >
      <ConfirmModalContent
        contentTitle={`총 ${selectedItems.length}개의 생일잔치 링크를\n삭제하시겠어요?`}
      >
        <Modal.ButtonWrapper className="flex justify-between gap-10 w-full">
          <Button bgColor="white" fontColor="dark_green" onClick={() => closeModal('deleteWish')}>
            아니요
          </Button>
          <Button bgColor="dark_green" fontColor="white" onClick={handleDeleteWish}>
            예
          </Button>
        </Modal.ButtonWrapper>
      </ConfirmModalContent>
    </Modal>
  );
};

function HistoryList({
  wishesHistory,
  selectItem,
  cancelItem,
}: {
  wishesHistory: WishesHistoryListType[];
  selectItem: (addItemId: number) => void;
  cancelItem: (removeItemId: number) => void;
}) {
  return (
    <ul className="flex flex-col gap-12">
      {wishesHistory.map((history) => (
        <HistoryBox
          key={history.wishId}
          wishTitle={history.title}
          period={`${history.startAt.split('T')[0]} ~ ${history.endAt.split('T')[0]}`}
          wishId={history.wishId}
          addToDeleteIdList={selectItem}
          removeToDeleteIdList={cancelItem}
        />
      ))}
    </ul>
  );
}

const HistoryBox = memo(
  ({
    wishTitle,
    period,
    wishId,
    addToDeleteIdList,
    removeToDeleteIdList,
  }: {
    wishTitle: string;
    period: string;
    wishId: number;
    addToDeleteIdList: (id: number) => void;
    removeToDeleteIdList: (id: number) => void;
  }) => {
    const checkToggle = useBoolean();
    const { handleRouter } = useRouters();

    useEffect(() => {
      if (checkToggle.state) {
        addToDeleteIdList(wishId);
      } else {
        removeToDeleteIdList(wishId);
      }
    }, [checkToggle.state, addToDeleteIdList, removeToDeleteIdList, wishId]);

    const handleMoveWishDetail = () => {
      handleRouter(`/mypage/history/${wishId}`);
    };

    return (
      <Box
        styles={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 'auto',
          padding: '14px 20px',
        }}
      >
        <CheckBox changeCheckedState={checkToggle.changeState}>
          <div className="flex flex-col w-full ml-10">
            <h3 className="font-bitbit text-[18px] text-main_blue">{wishTitle}</h3>
            <p className="font-galmuri text-[11px] text-gray2">{period}</p>
          </div>
        </CheckBox>
        <button
          type="button"
          className="flex flex-row-reverse w-35 h-35"
          onClick={handleMoveWishDetail}
        >
          <Image src={ArrowRightIc} alt="왼쪽 화살표" width={10} priority />
        </button>
      </Box>
    );
  },
);
