'use client';

import Modal from '@/components/Common/Modal';
import DropDwonBox from '@/components/UI/DropDwonBox';
import useToggle from '@/hooks/common/useToggle';
import { WishesAccountDataResolverType } from '@/validation/wishes.validate';
import { useFormContext } from 'react-hook-form';
import dynamic from 'next/dynamic';
const BankModal = dynamic(() => import('@/components/Common/Modal/BankModal'));

export default function SelectBank() {
  const modalState = useToggle();
  const { register, setValue } = useFormContext<WishesAccountDataResolverType>();

  function changeBank(input: string) {
    setValue('accountInfo.bank', input, { shouldDirty: true });
  }

  return (
    <>
      <DropDwonBox isOpen={false} handleState={modalState.handleState} bgColor="dark_green">
        <input
          {...register('accountInfo.bank')}
          placeholder="은행 선택"
          className="w-full h-full font-galmuri text-[14px]"
          readOnly
          onClick={modalState.handleState}
        />
      </DropDwonBox>

      {modalState && (
        <Modal isOpen={modalState.state} handleState={modalState.handleState}>
          <div className="flex justify-center items-center  w-full h-full">
            <BankModal changeBank={changeBank} handleState={modalState.handleState} />
          </div>
        </Modal>
      )}
    </>
  );
}
