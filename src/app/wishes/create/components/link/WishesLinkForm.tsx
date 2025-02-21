import InputForm from '@/components/UI/InputForm';
import WishesLinkContainer from './WishesLinkContainer';
import dynamic from 'next/dynamic';
import { SkeltonBox } from '@/app/loading';

const SelectWantsGiftOption = dynamic(() => import('./selectWantsGiftOption'), {
  ssr: false,
  loading: () => <SkeltonBox />,
});

const UploadImageBox = dynamic(() => import('@/components/UI/UploadImageBox'), {
  ssr: false,
  loading: () => <SkeltonBox height="22rem" />,
});

const MessageToGiver = dynamic(() => import('./MessageToGiver'), {
  ssr: false,
  loading: () => <SkeltonBox height="22rem" />,
});

const SetWishesPeriod = dynamic(() => import('./setWishesPeriod'), {
  ssr: false,
  loading: () => <SkeltonBox />,
});

export default function WishesLinkForm() {
  return (
    <WishesLinkContainer>
      <InputForm title="생일 선물도 받고 싶어요!">
        <SelectWantsGiftOption />
      </InputForm>

      <InputForm title={'친구에게 보여줄 이미지를 등록해보세요!'}>
        <UploadImageBox />
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
