'use client';

import useToggle from '@/hooks/common/useToggle';
import { WishesLinkDataResolverType } from '@/validation/wishes.validate';
import { useFormContext, useWatch } from 'react-hook-form';
import RadioSelect from '@/components/UI/RadioSelect';
import DropDwonBox from '@/components/UI/DropDwonBox';
import dynamic from 'next/dynamic';

const DropDownContent = dynamic(() => import('../content'));

export default function SelectWantsGiftOption() {
  const {
    state: dropDownState,
    handleState: handleDropBoxState,
    changeState: changeDropBoxState,
  } = useToggle();

  const { control, setValue } = useFormContext<WishesLinkDataResolverType>();

  const selectOption = useWatch({
    control,
    name: 'wantsGift',
  }) as boolean;

  function handleChangeWantsGiftState(state: boolean) {
    setValue('wantsGift', state);
  }

  return (
    <>
      <ul className="flex flex-col gap-12 font-galmuri text-white">
        <li
          className={`flex flex-col w-full bg-dark_green rounded-xl duration-300`}
          onClick={() => handleChangeWantsGiftState(true)}
          style={{
            maxHeight: dropDownState ? '415px' : '50px',
            transition: 'max-height 0.3s ease-out, opacity 0.3s ease-out',
          }}
        >
          <div>
            <DropDwonBox isOpen={dropDownState} handleState={handleDropBoxState}>
              <RadioSelect isSelect={selectOption} />
              <span className="w-full">네! 생일 선물도 받아볼래요</span>
            </DropDwonBox>
          </div>
          <div
            className="duration-300"
            style={{
              opacity: dropDownState ? 1 : 0,
              visibility: dropDownState ? 'visible' : 'hidden',
            }}
          >
            <DropDownContent />
          </div>
        </li>

        <li
          className="flex items-center gap-8 w-full h-50 text-[14px] bg-dark_green round-xl px-10 py-14 rounded-xl"
          onClick={() => {
            handleChangeWantsGiftState(false);
            changeDropBoxState(false);
          }}
        >
          <RadioSelect isSelect={!selectOption} />
          아니요. 편지만 받을래요!
        </li>
      </ul>
    </>
  );
}
