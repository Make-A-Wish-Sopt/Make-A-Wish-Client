import InputTextarea from '@/components/Elements/Input/inputTextarea';
import { TextCount } from '@/components/UI/InputTextForm';
import RadioSelect from '@/components/UI/RadioSelect';
import { MAX_TEXTAREA_LENGTH } from '@/constant/input';
import useBoolean from '@/hooks/useBoolean';
import { memo, useCallback, useEffect } from 'react';
import { Controller, useController, useFormContext, useWatch } from 'react-hook-form';
import { WishesFormScehmaType } from '@/Schema/wishes.schema';
import useUploadItemInfo from '@/hooks/useUploadItemInfo';
import UploadImageBox from '@/components/UI/UploadImageBox';
import useModals from '@/hooks/useModals';
import Calendar from '@/components/Elements/Calendar/Calendar';
import CalendarDateBox from '@/components/Elements/Calendar/CalendarDateBox';
import dynamic from 'next/dynamic';
import ItemWrapper from '@/components/Elements/Button/FixedBottomButton';
import Box from '@/components/Elements/Box';
import { MainBlueArrowIc } from '@public/assets/icons';
import Image from 'next/image';
import { getDate } from '@/utils/date';

const DynamicDropDownPresentList = dynamic(() => import('@/components/UI/DropDownPresentList'));

export const ImageUploadBox = memo(() => {
  const { imageUrl, preview, uploadImageFile, isLoading } = useUploadItemInfo();
  const { setValue, control } = useFormContext<WishesFormScehmaType>();
  const signedImage = useWatch({
    control,
    name: 'imageUrl',
  });

  const handleSetImage = useCallback(
    (image: string) => {
      setValue('imageUrl', image, { shouldValidate: true });
    },
    [setValue],
  );

  useEffect(() => {
    if (!imageUrl) return;

    handleSetImage(imageUrl);
  }, [imageUrl, handleSetImage]);

  const getPreviewImage = () => {
    if (!signedImage) {
      return preview;
    }

    return signedImage;
  };

  return (
    <UploadImageBox
      imageUrl={getPreviewImage()}
      handleUploadImageFile={uploadImageFile}
      isLoading={isLoading}
    />
  );
});

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

export const WantsGiftOption = memo(() => {
  const guideOepn = useBoolean();
  const { control } = useFormContext<WishesFormScehmaType>();

  // wantsGift 필드 제어
  const {
    field: { value: wantsGift, onChange },
  } = useController({
    name: 'wantsGift',
    control,
  });

  return (
    <ItemWrapper vertical className="gap-12">
      {/* 첫 번째 옵션 (선물도 받을래요) */}
      <Box className="h-auto">
        <div className={`${guideOepn.state && 'mb-12'}`}>
          <label
            htmlFor="wantsGift-yes"
            className="flex gap-10 justify-between items-center w-full cursor-pointer"
          >
            <RadioSelect isSelect={wantsGift === true} />
            <input
              id="wantsGift-yes"
              type="radio"
              className="hidden"
              checked={wantsGift === true}
              onClick={() => {
                onChange(true);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onChange(true);
                }
              }}
              tabIndex={0} // 키보드 포커스를 가능하게 함
              readOnly
            />
            <p className="w-full font-galmuri text-white text-[14px]">네! 생일 선물도 받아볼래요</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                guideOepn.handleState();
              }}
              className="flex justify-center items-center w-30 h-30"
            >
              <Image
                src={MainBlueArrowIc}
                alt="화살표 아이콘"
                className={`origin-center transition-transform duration-500 ease-in-out ${
                  guideOepn.state ? 'rotate-90' : '-rotate-90'
                }`}
              />
            </button>
          </label>
        </div>

        {/* 부드럽게 열리는 영역 */}
        <div
          className={`
              overflow-hidden transition-all duration-500 ease-in-out
              ${guideOepn.state ? 'max-h-388 opacity-100 visible' : 'max-h-0 opacity-0 invisible'}
            `}
        >
          {guideOepn.state && <DynamicDropDownPresentList />}
        </div>
      </Box>

      {/* 두 번째 옵션 (편지만 받을래요) */}
      <Box className="flex items-center">
        <label
          htmlFor="wantsGift-no"
          className="flex gap-10 justify-between items-center w-full cursor-pointer"
        >
          <RadioSelect isSelect={wantsGift === false} />
          <input
            id="wantsGift-no"
            type="radio"
            className="hidden"
            checked={wantsGift === false}
            onClick={() => {
              onChange(false);
            }}
            readOnly
          />
          <p className="w-full font-galmuri text-white text-[14px]">아니요. 편지만 받을래요!</p>
        </label>
      </Box>
    </ItemWrapper>
  );
});

export const BirthdayWeekRangeSetter = memo(({ disabled }: { disabled?: boolean }) => {
  const { openModal, closeModal, Modal, modalState } = useModals<['calendar']>();

  const { setValue, control } = useFormContext<WishesFormScehmaType>();

  const [startDate, endDate] = useWatch({
    control,
    name: ['startDate', 'endDate'],
  });

  const handleChangeDate = (selectedDate: Date) => {
    if (selectedDate === startDate) return;

    setValue('startDate', selectedDate);
    setValue('endDate', getDate(selectedDate, 7));
  };

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
          <button type="button" className="w-full" onClick={() => handleOpenCalendar()}>
            <CalendarDateBox date={startDate} readonly={disabled} />
          </button>
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
});
