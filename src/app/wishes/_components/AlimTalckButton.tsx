'use client';

import Button from '@/components/Elements/Button';
import Image from 'next/image';
import { FormProvider, useForm, useFormContext, useFormState } from 'react-hook-form';
import { CloseSmallIc } from '@public/assets/icons';
import { useModalContent } from '@/hooks/useModalContent';
import { ItemWrapper } from '@/components/Elements/Button/FixedBottomButton';
import { alimTalkSchema, AlimTalkSchemaType } from '@/Schema/wishes.schema';
import Box from '@/components/Elements/Box';
import InputField from '@/components/Elements/Input/InputField';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { postAlimTalk } from '@/api/public';
import { useFetch } from '@/hooks/useFetch';
import { LoadingCake } from '@/components/Elements/Modal/ValidateLoadingModal';
import { useEffect } from 'react';

export const AlimTalkMessageButton = ({ buttonText }: { buttonText: string }) => {
  const { Modal, openModal, closeModal, ConfirmModalContent } = useModalContent<['alimTalk']>();

  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
  }

  const alimtalkMethods = useForm<AlimTalkSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(alimTalkSchema),
  });

  const { status, delayFetchData } = useFetch(postAlimTalk);

  useEffect(() => {
    if (status === 'success') {
      toast.success('알림톡 등록이 완료되었어요!!');
      closeModal('alimTalk');
      return;
    }

    if (status === 'error') {
      toast.error('알림톡 등록 중 문제가 발생했어요 ㅠㅠ');
      closeModal('alimTalk');
      return;
    }
  }, [status]);

  return (
    <>
      <Modal
        modalKey="alimTalk"
        Trigger={
          <Button bgColor="gray4" fontColor="white" onClick={() => openModal('alimTalk')}>
            {buttonText}
          </Button>
        }
      >
        <Modal.ModalOverlay>
          <Modal.ModalLayout className="flex justify-center items-center">
            {status === 'loading' ? (
              <>
                <LoadingCake text={'신청 중'} />
              </>
            ) : (
              <>
                <Modal.ContentFrame>
                  <Modal.ContentHeader
                    className="flex justify-end"
                    CloseIcon={<Image src={CloseSmallIc} alt="닫기" />}
                  />
                  <ConfirmModalContent
                    contentTitle={`당신의 생일 주간에\n카카오 알림톡을 보내드려요!`}
                  >
                    <FormProvider {...alimtalkMethods}>
                      <AlimTalkInfoInputs delayFetchData={delayFetchData} />
                    </FormProvider>
                  </ConfirmModalContent>
                </Modal.ContentFrame>
              </>
            )}
          </Modal.ModalLayout>
        </Modal.ModalOverlay>
      </Modal>
    </>
  );
};

const AlimTalkInfoInputs = ({
  delayFetchData,
}: {
  delayFetchData: (delayMs: number, formData: AlimTalkSchemaType) => void;
}) => {
  const methods = useFormContext<AlimTalkSchemaType>();

  const { register, control, getValues } = methods;
  const { isValid, errors } = useFormState({ control });

  const handleModalSubmit = async () => {
    if (!isValid && errors && errors.phoneNumber) {
      toast.warning(errors.phoneNumber.message);
      return;
    }

    if (!isValid && errors && errors.birthDate) {
      toast.warning(errors.birthDate.message);
      return;
    }

    const formData = getValues();

    delayFetchData(2000, formData);
  };

  return (
    <ItemWrapper vertical className="w-full gap-14">
      <div>
        <label className="font-galmuri text-[14px] text-background mb-5">
          {'휴대폰 번호 입력하기'}
        </label>

        <Box bgColor="sub_blue">
          <InputField
            register={register('phoneNumber')}
            placeholder="(-)없이 숫자만 입력해주세요."
            className="plachoder-gray1 text-white"
          />
        </Box>
      </div>

      <div>
        <label className="font-galmuri text-[14px] text-background mb-5">
          {'생년월일 입력하기'}
        </label>

        <Box bgColor="sub_blue">
          <InputField
            register={register('birthDate')}
            placeholder="4자리로 입력해주세요. ex)0128"
            className="plachoder-gray1"
          />
        </Box>
      </div>

      <ItemWrapper className="flex justify-center">
        <Button
          bgColor="dark_green"
          fontColor="white"
          style={{ width: '13.8rem' }}
          onClick={handleModalSubmit}
        >
          {'등록하기'}
        </Button>
      </ItemWrapper>
    </ItemWrapper>
  );
};
