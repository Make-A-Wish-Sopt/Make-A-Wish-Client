import Box from '@/components/Common/Box';
import InputText from '@/components/Common/Input/inputText';
import CheckBox from '@/components/UI/CheckBox';
import InputForm from '@/components/UI/InputForm';
import InputTextForm from '@/components/UI/InputTextForm';
import PresentList from '@/components/UI/PresentList';
import { MAX_TEXTAREA_LENGTH } from '@/constant/input';
import { PresentDataResolverType } from '@/validation/present.validate';
import { UseFormReturn } from 'react-hook-form';

export default function PresentGiverInfoInputForm({
  methods,
  wantsGift,
  messageOnlyOption,
  changeMessageOnlyOption,
}: {
  methods: UseFormReturn<PresentDataResolverType, any, undefined>;
  wantsGift?: boolean;
  messageOnlyOption: boolean;
  changeMessageOnlyOption: (state: boolean) => void;
}) {
  function changeGiftMenutId(id: number) {
    methods.setValue('giftMenuId', id);
  }

  function changeCheckedState(state: boolean) {
    changeMessageOnlyOption(state);
  }

  return (
    <>
      <InputForm title="본인의 닉네임 작성하기">
        <InputText
          register={methods.register('name')}
          placeholder="당신의 이름이나 별명을 편하게 작성해주세요"
        />
      </InputForm>

      {!wantsGift && (
        <InputForm title="선물하고 싶은 항목 선택하기">
          {!messageOnlyOption && <PresentList changeGiftMenutId={changeGiftMenutId} />}
          <Box bgColor="dark_green" fontColor="gray2" styles={{ marginTop: '0.6rem' }}>
            <CheckBox<PresentDataResolverType>
              checkBoxText="편지만 보낼게요"
              changeCheckedState={changeCheckedState}
            />
          </Box>
        </InputForm>
      )}

      <InputForm title="친구에게 편지남기기">
        <InputTextForm
          inputType="textarea"
          register={methods.register('message')}
          control={methods.control}
          placeholder="ex.) 생일을 축하합니다~"
          maxLength={MAX_TEXTAREA_LENGTH}
        />
      </InputForm>
    </>
  );
}
