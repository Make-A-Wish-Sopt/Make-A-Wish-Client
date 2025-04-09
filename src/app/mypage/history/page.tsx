'use client';

import { getWishes } from '@/api/wishes';
import Header from '@/components/Elements/Header';
import { StepTitle } from '@/components/UI/StepTitle';
import MainLayout from '@/layouts/MainLayout';
import React, { memo } from 'react';
import { useEffect } from 'react';
import { WishesHistoryListType } from '@/types/api/response';
import useSelectItem from '@/hooks/useSelectItem';
import Image from 'next/image';
import { deleteWishes } from '@/api/wishes';
import { useRouters } from '@/hooks/useRouters';
import Button from '@/components/Elements/Button';
import { useModalContent } from '@/hooks/useModalContent';
import { ArrowRightIc, DeleteBtnIc } from '@public/assets/icons';
import { EmptyWishesCakeImg } from '@public/assets/images';
import CheckBox from '@/components/UI/CheckBox';
import useBoolean from '@/hooks/useBoolean';
import Box from '@/components/Elements/Box';
import { useFetch } from '@/hooks/useFetch';
import Loading from '@/app/loading';
import { BackButton } from '@/components/Elements/Button/BackButton';
import { toast } from 'sonner';

const page = () => {
  const { data, status, fetchData } = useFetch(getWishes);
  const { selectedIdArray, cancelToDeleteIdList, addToDeleteIdList } = useSelectItem();

  useEffect(() => {
    const fetchWishesHistory = async () => {
      await fetchData();
    };
    fetchWishesHistory();
  }, []);

  if (status === 'loading') {
    return <Loading />;
  }

  if (!data) return;

  return (
    <MainLayout
      Header={
        <Header
          leftMenu={<BackButton routePath="/mypage" />}
          rightMenu={<DeleteWishButton selectedItems={selectedIdArray} />}
        />
      }
    >
      <section>
        <StepTitle title={'지난 생일잔치 링크 모음'} />
        {data.length === 0 ? (
          <NonPrevWishHistory />
        ) : (
          <>
            <WishHistoryList
              wishesHistory={data}
              selectItem={addToDeleteIdList}
              cancelItem={cancelToDeleteIdList}
            />
          </>
        )}
      </section>
    </MainLayout>
  );
};

const DeleteWishButton = ({ selectedItems }: { selectedItems: number[] }) => {
  const { Modal, openModal, closeModal, ConfirmModalContent } = useModalContent<['deleteWish']>();

  const { handleRefresh } = useRouters();

  const handleOpenModal = () => {
    if (selectedItems.length === 0) return;
    openModal('deleteWish');
  };

  const handleDeleteWishes = async (refresh: () => void) => {
    if (selectedItems.length === 0) return;

    const response = await deleteWishes(selectedItems);
    if (response.data.success) {
      toast.success('생일잔치 삭제성공!');
      closeModal('deleteWish');
    }

    refresh();
  };

  return (
    <Modal
      modalKey="deleteWish"
      Trigger={
        <Image
          onClick={handleOpenModal}
          src={DeleteBtnIc}
          alt="삭제 아이콘"
          width={44}
          height={44}
        />
      }
    >
      <ConfirmModalContent
        contentTitle={`총${selectedItems.length}개의 생일잔치 링크를\n삭제하시겠어요?`}
      >
        <Modal.ButtonWrapper className="flex justify-between gap-10 w-full">
          <Button
            bgColor="white"
            fontColor="dark_green"
            onClick={() => {
              closeModal('deleteWish');
            }}
          >
            아니요
          </Button>

          <Button
            bgColor="dark_green"
            fontColor="white"
            onClick={() => handleDeleteWishes(() => handleRefresh())}
          >
            예
          </Button>
        </Modal.ButtonWrapper>
      </ConfirmModalContent>
    </Modal>
  );
};

const WishHistoryList = ({
  wishesHistory,
  selectItem,
  cancelItem,
}: {
  wishesHistory: WishesHistoryListType[];
  selectItem: (addItemId: number) => void;
  cancelItem: (removeItemId: number) => void;
}) => {
  return (
    <>
      <ul className="flex flex-col gap-12">
        {wishesHistory.map((history) => (
          <WishHistoryBox
            wishTitle={history.title}
            period={`${history.startAt.split('T')[0]} ~ ${history.endAt.split('T')[0]}`}
            wishId={history.wishId}
            addToDeleteIdList={selectItem}
            removeToDeleteIdList={cancelItem}
            key={history.wishId}
          />
        ))}
      </ul>
    </>
  );
};

const NonPrevWishHistory = () => {
  const { handleRouter } = useRouters();

  return (
    <div className="flex flex-col items-center">
      <Image
        className="mt-91"
        src={EmptyWishesCakeImg}
        alt="생일잔치정보가 존재하지 않을 경우 케이크 이미지"
        width={293}
      />
      <Button
        onClick={() => {
          handleRouter('/wishes');
        }}
      >
        {'생일잔치 링크 생성하기'}
      </Button>
    </div>
  );
};

const WishHistoryBox = memo(
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
    }, [checkToggle.state]);

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
          <div className="flex flex-col w-full  ml-10">
            <h3 className="font-bitbit text-[18px] text-main_blue">{wishTitle}</h3>
            <p className="font-galmuri text-[11px] text-gray2">{period}</p>
          </div>
        </CheckBox>
        <button className="flex flex-row-reverse w-35 h-35" onClick={handleMoveWishDetail}>
          <Image src={ArrowRightIc} alt="왼쪽 화살표" width={10} priority />
        </button>
      </Box>
    );
  },
);

export default page;
