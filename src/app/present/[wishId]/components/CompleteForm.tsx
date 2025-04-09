'use client';

import { useModalContent } from '@/hooks/useModalContent';
import { useEffect } from 'react';
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
import { PresentFunnelStepType } from '@/constant/funnelStep';
import { toast } from 'sonner';
import { PresentFormSchemaType } from '@/Schema/present.schema';

const CompleteForm = ({ nickName }: { nickName: string }) => {
  const { Modal, modalState, openModal, PresentMessageModalContent } =
    useModalContent<['complete']>();
  const { getSharedData, onMoveStep } = useFunnelContext<PresentFunnelStepType>();

  const { handleRouter } = useRouters();

  const presentFormData = getSharedData('present');

  if (!presentFormData) {
    toast.error('선물정보를 먼저 입력해주세요!');
    onMoveStep('present');
    return;
  }

  const { name, message, giftMenuId, cakeId } = presentFormData as PresentFormSchemaType;

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
