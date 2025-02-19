import InputForm from '@/components/UI/InputForm';
import WishesLinkContainer from './WishesLinkContainer';
import SelectWantsGiftOption from './selectWantsGiftOption';
import { UploadImageBox } from '@/components/UI/UploadImageBox';
import SetWishesPeriod from './setWishesPeriod';
import MessageToGiver from './MessageToGiver';

export default function WishesLinkForm() {
  return (
    <WishesLinkContainer>
      <InputForm title="생일 선물도 받고 싶어요!">
        <SelectWantsGiftOption />
      </InputForm>

      <InputForm title={`링크에 들어온 친구가 보게 될\n 재밌는 이미지를 등록해보세요!`}>
        <UploadImageBox />;
      </InputForm>

      <InputForm title="친구에게 남기고 싶은 한마디">
        <MessageToGiver />
      </InputForm>

      <InputForm title="내 생일 주간 설정하기">
        <SetWishesPeriod />
      </InputForm>
    </WishesLinkContainer>
  );
}
