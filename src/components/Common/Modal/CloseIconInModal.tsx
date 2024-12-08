import { ColorsTypes } from '@/styles/styles';
import { PropsWithChildren } from 'react';
import Modal, { ModalProps } from '.';
import Image from 'next/image';
import { CloseSmallIc } from '../../../../public/assets/icons';

export default function CloseIconInModal({
  modalColor = 'main_blue',
  children,
  ...rest
}: { modalColor?: keyof ColorsTypes } & PropsWithChildren & ModalProps) {
  return (
    <Modal {...rest}>
      <div className="w-full h-full flex justify-center items-center">
        <div className={`w-[85%] bg-${modalColor} p-20 rounded-2xl`}>
          <div className="flex flex-row-reverse">
            <Image
              src={CloseSmallIc}
              alt="닫기"
              width={16}
              height={16}
              onClick={rest.handleState}
            />
          </div>

          {children}
        </div>
      </div>
    </Modal>
  );
}
