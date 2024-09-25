import { PropsWithChildren } from 'react';
import Modal, { ModalProps } from '.';
import { CloseBlueIc } from '../../../../public/assets/icons';
import Image from 'next/image';

export default function CloseTopModal(props: PropsWithChildren<ModalProps>) {
  return (
    <Modal {...props}>
      <div className="p-20">
        <div className="flex justify-end w-full">
          <Image src={CloseBlueIc} alt="닫기" onClick={props.handleToggle} />
        </div>
        {props.children}
      </div>
    </Modal>
  );
}
