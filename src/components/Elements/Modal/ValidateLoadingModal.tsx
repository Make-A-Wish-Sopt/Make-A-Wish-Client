import { ColorsTypes } from '@/styles/styles';
import { PropsWithChildren } from 'react';
import Modal, { ModalProps } from '.';
import Image from 'next/image';
import { LoadingDot } from '@/app/loading';
import CheckedIcon from '../Icon/CheckedIcon';
import { AdminCakeImg } from '@public/assets/images';

export default function ValidateLoadingModal({
  modalColor = 'main_blue',
  success,
  children,
  ...rest
}: { modalColor?: keyof ColorsTypes; success: boolean } & PropsWithChildren & ModalProps) {
  return (
    <Modal {...rest}>
      {success ? (
        <>
          <div className="w-full h-full flex justify-center items-center">
            <div
              className={`flex flex-col justify-between items-center w-173 h-130 bg-${modalColor} p-20 rounded-2xl`}
            >
              <CheckedIcon width={36} bgColor="white" iconColor="main_blue" />
              <span className="font-bitbit text-[24px] text-black">완료!</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <LoadingCake text={'검사 중'} />
        </>
      )}
    </Modal>
  );
}

export const LoadingCake = ({ text }: { text: string }) => {
  return (
    <div
      className={`flex flex-col justify-between items-center w-173 h-130 bg-main_blue p-20 rounded-2xl`}
    >
      <Image src={AdminCakeImg} alt="검증 아이콘" width={70} />
      <div className="flex gap-5">
        <span className="font-bitbit text-[24px] text-black">{text}</span>
        <LoadingDot />
      </div>
    </div>
  );
};
