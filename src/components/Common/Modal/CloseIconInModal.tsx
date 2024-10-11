import { PropsWithChildren } from 'react';
import Modal, { ModalProps } from '.';
import { CloseSmallIc } from '../../../../public/assets/icons';
import Image from 'next/image';

export default function CloseIconInModal(props: PropsWithChildren<ModalProps>) {
  return (
    <Modal {...props}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[85%] h-314">
        <div className="bg-yellow p-20 rounded-xl">
          <div className="flex flex-row-reverse" onClick={props.handleToggle}>
            <Image src={CloseSmallIc} alt="닫기" width={16} height={16} />
          </div>
          {props.children}
        </div>
      </div>
    </Modal>
  );
}
