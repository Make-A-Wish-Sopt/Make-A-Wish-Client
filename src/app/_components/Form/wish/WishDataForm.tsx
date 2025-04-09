import InputTextarea from '@/components/Elements/Input/inputTextarea';
import DropDwonBox from '@/components/UI/DropDwonBox';
import { TextCount } from '@/components/UI/InputTextForm';
import RadioSelect from '@/components/UI/RadioSelect';
import { MAX_TEXTAREA_LENGTH } from '@/constant/input';
import useBoolean from '@/hooks/useBoolean';
import { memo, useEffect } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { WishesFormScehmaType } from '@/Schema/wishes.schema';
import useUploadItemInfo from '@/hooks/useUploadItemInfo';
import { UploadImageBox } from '@/components/UI/UploadImageBox';
import useModals from '@/hooks/useModals';
import Calendar from '@/components/Elements/Calendar/Calendar';
import CalendarDateBox from '@/components/Elements/Calendar/CalendarDateBox';
import dynamic from 'next/dynamic';

const DynamicDropDownPresentList = dynamic(() => import('@/components/UI/DropDownPresentList'));

export const ImageUploadBox = memo(
  ({ handleSetImage }: { handleSetImage: (imageUrl: string) => void }) => {
    const { imageUrl, preview, uploadImageFile, isLoading } = useUploadItemInfo();
    const { control } = useFormContext<WishesFormScehmaType>();
    const signedImage = useWatch({
      control,
      name: 'imageUrl',
    });

    useEffect(() => {
      if (!imageUrl) return;

      handleSetImage(imageUrl);
    }, [imageUrl]);
    const getPreviewImage = () => {
      return signedImage ? signedImage : preview;
    };

    return (
      <UploadImageBox
        imageUrl={getPreviewImage()}
        handleUploadImageFile={uploadImageFile}
        isLoading={isLoading}
      />
    );
  },
);

export const MessageToFriend = memo(() => {
  const { control } = useFormContext<WishesFormScehmaType>();

  return (
    <Controller
      name="hint"
      control={control}
      render={({ field }) => (
        <InputTextarea
          value={field.value || ''}
          onChange={field.onChange}
          placeholder={`너네 편지 안받아본지가...10년째\n편지 좀 작성해주겠니?`}
        >
          <TextCount textLength={field.value?.length || 0} maxLength={MAX_TEXTAREA_LENGTH} />
        </InputTextarea>
      )}
    />
  );
});

export const WantsGiftOption = memo(
  ({ handleChangeOption }: { handleChangeOption: (state: boolean) => void }) => {
    const guideOepn = useBoolean();
    const { control } = useFormContext<WishesFormScehmaType>();
    const selectedOption = useWatch({
      control,
      name: 'wantsGift',
    });

    return (
      <ul className="flex flex-col gap-12 font-galmuri text-white">
        <li
          className={`flex flex-col w-full bg-dark_green rounded-xl duration-300 cursor-pointer`}
          onClick={() => {
            handleChangeOption(true);
          }}
          style={{
            maxHeight: guideOepn.state ? '415px' : '50px',
            transition: 'max-height 0.3s ease-out, opacity 0.3s ease-out',
          }}
        >
          <div>
            <DropDwonBox isOpen={guideOepn.state} toggleState={guideOepn.handleState}>
              <RadioSelect isSelect={selectedOption} />
              <span className="w-full">네! 생일 선물도 받아볼래요</span>
            </DropDwonBox>
          </div>
          <div
            className="duration-300"
            style={{
              opacity: guideOepn.state ? 1 : 0,
              visibility: guideOepn.state ? 'visible' : 'hidden',
            }}
          >
            {selectedOption && <DynamicDropDownPresentList />}
          </div>
        </li>

        <li
          className="flex items-center gap-8 w-full h-50 text-[14px] bg-dark_green round-xl px-10 py-14 rounded-xl cursor-pointer"
          onClick={() => {
            handleChangeOption(false);
            guideOepn.changeState(false);
          }}
        >
          <RadioSelect isSelect={!selectedOption} />
          아니요. 편지만 받을래요!
        </li>
      </ul>
    );
  },
);

export const BirthdayWeekRangeSetter = memo(
  ({
    handleChangeDate,
    disabled,
  }: {
    handleChangeDate: (selectedDate: Date) => void;
    disabled?: boolean;
  }) => {
    const { openModal, closeModal, Modal, modalState } = useModals<['calendar']>();

    const { control } = useFormContext<WishesFormScehmaType>();

    const [startDate, endDate] = useWatch({
      control,
      name: ['startDate', 'endDate'],
    });

    const changeDate = (selectDate: Date) => {
      if (!selectDate) {
        closeModal('calendar');
        return;
      }

      handleChangeDate(selectDate);
      closeModal('calendar');
    };

    const handleOpenCalendar = () => {
      if (disabled) return;

      openModal('calendar');
    };

    return (
      <div className="grid grid-cols-2 gap-10 w-full">
        <Modal
          modalKey="calendar"
          Trigger={
            <div onClick={handleOpenCalendar}>
              <CalendarDateBox date={startDate} readonly={disabled} />
            </div>
          }
        >
          <Modal.ModalOverlay>
            <Modal.ModalLayout className="relative flex justify-center items-center h-full">
              <Calendar
                date={startDate}
                changeDate={changeDate}
                isOpen={modalState.calendar}
                style={{
                  backgroundColor: '#001D26',
                }}
              />
            </Modal.ModalLayout>
          </Modal.ModalOverlay>
        </Modal>

        <CalendarDateBox date={endDate} readonly />
      </div>
    );
  },
);
