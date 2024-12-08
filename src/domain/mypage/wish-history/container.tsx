'use client';

import { PropsWithChildren } from 'react';
import { WishHistoryBox } from './component';
import { WishesHistoryType } from '@/types/api/response';
import useSelectItem from '@/hooks/common/useSelectItem';
import Image from 'next/image';
import { DeleteBtnIc } from '../../../../public/assets/icons';
import { deleteWishes } from '@/api/wishes';
import { useRouters } from '@/hooks/common/useRouters';
import useToggle from '@/hooks/common/useToggle';
import CloseIconInModalWithVitaminCake from '@/components/Common/Modal/CloseIconInModalWithVitaminCake';
import Button from '@/components/Common/Button';
import { EmptyWishesCakeImg } from '../../../../public/assets/images';

export default function WishesHistoryPageContainer({
  wishesHistory,
  children,
}: { wishesHistory: WishesHistoryType[] } & PropsWithChildren) {
  const { selectedIdArray, removeToDeleteIdList, addToDeleteIdList } = useSelectItem();
  const {
    state: deleteModalState,
    changeState: changeDeleteModalState,
    handleState: handleDeleteModalState,
  } = useToggle();
  const { handleRefresh, handleRouter } = useRouters();

  function handleDeleteWishes() {
    if (selectedIdArray.length > 0) {
      deleteWishes(selectedIdArray).then((response) => {
        response.data.success && handleRefresh();
      });
    }
  }

  return (
    <section className="relative ">
      {children}
      {wishesHistory.length === 0 ? (
        <div className="flex flex-col items-center">
          <Image
            className="mt-91"
            src={EmptyWishesCakeImg}
            alt="소원정보가 존재하지 않을 경우 케이크 이미지"
            width={293}
          />
          <Button
            onClick={() => {
              handleRouter('/wishes');
            }}
          >
            생일잔치 오픈하러 가기
          </Button>
        </div>
      ) : (
        <>
          <ul className="flex flex-col gap-12">
            {wishesHistory.map((history) => (
              <WishHistoryBox
                wishTitle={history.title}
                period={`${history.startAt.split('T')[0]} ~ ${history.endAt.split('T')[0]}`}
                wishId={history.wishId}
                addToDeleteIdList={addToDeleteIdList}
                removeToDeleteIdList={removeToDeleteIdList}
                key={history.wishId}
              />
            ))}
          </ul>
          {deleteModalState && (
            <>
              <CloseIconInModalWithVitaminCake
                modalTitle={`총${selectedIdArray.length}개의 생일잔치 링크를\n삭제하시겠어요?`}
                isOpen={deleteModalState}
                handleState={handleDeleteModalState}
              >
                <div className="flex justify-between gap-10 w-full">
                  <Button
                    bgColor="white"
                    fontColor="dark_green"
                    onClick={() => {
                      changeDeleteModalState(false);
                    }}
                  >
                    취소
                  </Button>
                  <Button
                    bgColor="dark_green"
                    fontColor="white"
                    onClick={() => {
                      handleDeleteWishes();
                      changeDeleteModalState(false);
                    }}
                  >
                    삭제하기
                  </Button>
                </div>
              </CloseIconInModalWithVitaminCake>
            </>
          )}

          <Image
            onClick={() => {
              selectedIdArray.length > 0 && changeDeleteModalState(true);
            }}
            src={DeleteBtnIc}
            alt="삭제 아이콘"
            className="absolute -top-53 right-0"
          />
        </>
      )}
    </section>
  );
}
