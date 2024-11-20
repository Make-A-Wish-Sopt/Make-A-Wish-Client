import { PropsWithChildren } from 'react';
import { ModalProps } from '.';
import Image from 'next/image';
import { ColorsTypes } from '@/styles/styles';
import { VitaminCakeImg } from '../../../../public/assets/images';
import CloseIconInModal from './CloseIconInModal';

export default function CloseIconInModalWithVitaminCake({
  modalColor = 'main_blue',
  modalTitle,
  children,
  ...rest
}: { modalColor?: keyof ColorsTypes; modalTitle: string } & PropsWithChildren & ModalProps) {
  return (
    <CloseIconInModal {...rest}>
      <div className="flex flex-col items-center gap-20 w-full">
        <div className="flex flex-col items-center w-full">
          <Image src={VitaminCakeImg} alt="케이크 이미지" width={60} height={60} />
          <h4 className="font-bitbit text-[24px] text-background">{modalTitle}</h4>
        </div>
        {children}
      </div>
    </CloseIconInModal>
  );
}
