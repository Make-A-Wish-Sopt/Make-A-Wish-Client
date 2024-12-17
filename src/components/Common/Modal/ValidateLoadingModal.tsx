import { ColorsTypes } from '@/styles/styles';
import { PropsWithChildren } from 'react';
import Modal, { ModalProps } from '.';
import Image from 'next/image';
import { AdminCakeImg } from '../../../../public/assets/images';
import { LoadingDot } from '@/app/loading';
import CheckedIcon from '../Icon/CheckedIcon';

export default function ValidateLoadingModal({
  modalColor = 'main_blue',
  success,
  children,
  ...rest
}: { modalColor?: keyof ColorsTypes; success: boolean } & PropsWithChildren & ModalProps) {
  return (
    <Modal {...rest}>
      <div className="w-full h-full flex justify-center items-center">
        <div
          className={`flex flex-col justify-between items-center w-173 h-130 bg-${modalColor} p-20 rounded-2xl`}
        >
          {success ? (
            <>
              <CheckedIcon width={36} bgColor="white" iconColor="main_blue" />
              <span className="font-bitbit text-[24px] text-black">완료!</span>
            </>
          ) : (
            <>
              <Image src={AdminCakeImg} alt="검증 아이콘" width={70} />
              <div className="flex gap-5">
                <span className="font-bitbit text-[24px] text-black">검사 중</span>
                <LoadingDot />
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
