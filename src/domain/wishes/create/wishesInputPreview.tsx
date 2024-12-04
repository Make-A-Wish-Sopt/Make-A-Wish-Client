import { UseFormReturn } from 'react-hook-form';
import { WishesLinkDataResolverType } from '@/validation/wishes.validate';
import { UploadImageBox } from '@/components/UI/UploadImageBox';
import InputForm from '@/components/UI/InputForm';
import InputText from '@/components/Common/Input/inputText';
import PresentList from '@/components/UI/PresentList';
import Box from '@/components/Common/Box';
import CheckBox from '@/components/UI/CheckBox';
import InputTextarea from '@/components/Common/Input/inputTextarea';
import GradientShadow from '@/components/UI/GradientShadow';
import BorderBox from '@/components/UI/BorderBox';

export default function WishesInputPreview({
  methods,
}: {
  methods: UseFormReturn<WishesLinkDataResolverType, any, undefined>;
}) {
  const { watch } = methods;
  const { hint, imageUrl, wantsGift } = watch();

  return (
    <section className="relative flex flex-col item-center w-full mb-30">
      <div className="w-full">
        {/* 소원 생성 시 등록한 이미지 미리보기 */}
        <div className="flex flex-col w-full gap-10 mb-20">
          <UploadImageBox imageUrl={imageUrl} />
          <BorderBox>
            <p className="text-[14px]">{hint}</p>
          </BorderBox>
        </div>

        {/* 친구가 작성하게될 입력 미리보기 */}
        <InputForm title="친구가 작성하게 될 닉네임">
          <InputText placeholder="당신의 이름이나 별명을 편하게 작성해주세요" blur />
        </InputForm>

        {/* 선물을 원한다고 체크했을 경우*/}
        {wantsGift && (
          <InputForm title="선물하고 싶은 항목 선택하기">
            <PresentList readonly />
            <Box bgColor="dark_green" fontColor="gray2" styles={{ marginTop: '0.6rem' }}>
              <CheckBox checkBoxText="편지만 보낼게요" readOnly />
            </Box>
          </InputForm>
        )}

        {/* 친구가 작성하게될 편지 미리보기 */}
        <InputForm title="친구가 남기게 될 편지">
          <InputTextarea placeholder="ex.) 생일을 축하합니다~" blur>
            {/* 이 글자수 추가하는 부분 다시 생각해야됩니다! */}
          </InputTextarea>
        </InputForm>
        <GradientShadow height={'60%'} />
      </div>
    </section>
  );
}
