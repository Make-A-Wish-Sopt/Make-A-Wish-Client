import { PropsWithChildren } from 'react';
import Modal, { ModalProps } from '.';
import { CloseSmallIc } from '../../../../public/assets/icons';
import Image from 'next/image';
import { ColorsTypes } from '@/styles/styles';
import { VitaminCakeImg } from '../../../../public/assets/images';

export default function CloseIconInModal({
  modalColor = 'main_blue',
  modalTitle,
  children,
  ...rest
}: { modalColor?: keyof ColorsTypes; modalTitle: string } & PropsWithChildren & ModalProps) {
  return (
    <Modal {...rest}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[85%] h-314">
        <div className={`bg-${modalColor} p-20 rounded-xl`}>
          <div className="flex flex-row-reverse" onClick={rest.handleState}>
            <Image src={CloseSmallIc} alt="닫기" width={16} height={16} />
          </div>
          <div className="flex flex-col items-center gap-20 w-full">
            <div className="flex flex-col items-center w-full">
              <Image src={VitaminCakeImg} alt="케이크 이미지" width={60} height={60} />
              <h4 className="font-bitbit text-[24px] text-background">{modalTitle}</h4>
            </div>
            {children}
          </div>
        </div>
      </div>
    </Modal>
  );
}
