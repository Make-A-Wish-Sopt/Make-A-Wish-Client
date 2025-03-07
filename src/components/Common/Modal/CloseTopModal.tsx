import { PropsWithChildren } from 'react';
import Modal, { ModalProps } from '.';
import { CloseBlueIc } from '../../../../public/assets/icons';
import Image from 'next/image';

export default function CloseTopModal(props: PropsWithChildren<ModalProps>) {
  return (
    <Modal {...props}>
      <div className="h-full p-20 mt-20  overflow-scroll">
        <div className="flex justify-end w-full">
          <Image src={CloseBlueIc} alt="닫기" onClick={props.handleState} />
        </div>
        {props.children}
      </div>
    </Modal>
  );
}
