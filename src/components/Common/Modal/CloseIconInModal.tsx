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
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[85%] h-314">
        <div className={`bg-${modalColor} p-20 rounded-xl`}>
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
