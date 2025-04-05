'use client';

import { useShareModal } from '@/hooks/useShareModal';
import { useEffect } from 'react';
import { PresentFunnelStepType } from '../page';
import { PresentFormMethodsType } from './FunnelContainer';
import { useFunnelContext } from '@/Context/FunnelContext';
import {
  defaultCakeTreeDataArray,
  defaultCakeTreeDataObject,
  ReceivedCakeTreeMessageDataType,
} from '@/constant/model/cakesTreeData';
import { PresentSuccessCakeTree } from '@/components/UI/PresentSuccessCakeTree';
import { Step } from '@/components/Modules/Funnel';
import Button from '@/components/Elements/Button';
import BottomGradientShadow from '@/components/UI/GradientShadow';
import { useRouters } from '@/hooks/useRouters';

const CompleteForm = ({ nickName }: { nickName: string }) => {
  const { Modal, modalState, openModal, PresentMessageModalContent } =
    useShareModal<['complete']>();
  const { inputs } = useFunnelContext<PresentFunnelStepType, PresentFormMethodsType>();
  const { getValues } = inputs.presentFormMethods;
  const { name, message, giftMenuId, cakeId } = getValues();

  const { handleRouter } = useRouters();

  const receivedCakeMessageData: ReceivedCakeTreeMessageDataType = {
    name: name,
    message: message,
    giftMenuId: giftMenuId,
    cakeId: Number(cakeId),
    cakeImg: defaultCakeTreeDataObject[Number(cakeId)].cakeImg,
    presentId: giftMenuId,
    isAdminMessage: false,
  };

  useEffect(() => {
    openModal('complete');
  }, []);

  return (
    <>
      <div className="flex flex-col items-center w-full h-full mt-25">
        <span className="text-white font-bitbit text-[24px] whitespace-pre-wrap text-center leading-tight mt-2 mb-20">
          {`${name}님,\n${nickName}의 생일잔치에\n와주셔서 감사해요!`}
        </span>
      </div>

      {!modalState.complete && (
        <PresentSuccessCakeTree
          cakeList={[defaultCakeTreeDataObject[cakeId], ...defaultCakeTreeDataArray]}
        />
      )}

      <Modal modalKey="complete">
        <PresentMessageModalContent
          선물받은사람이름={nickName}
          cakePresentMessage={receivedCakeMessageData}
        />
      </Modal>

      <Step.ButtonWrapper fixedBottom className="z-30">
        <Button onClick={() => handleRouter('/')}>{'제 생일에도 써볼래요!'}</Button>
      </Step.ButtonWrapper>

      <BottomGradientShadow height={19} fixedBottom />
    </>
  );
};

export default CompleteForm;
