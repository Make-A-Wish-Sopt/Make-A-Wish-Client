import { WishesCreateStepType } from '@/app/wishes/create/page';
import { WishesLinkInputForm } from './client';
import { WishesAccountInputForm, WishesCreateStepTitle } from './server';

export default function WishesCreatePageContainer({
  createStep,
}: {
  createStep: WishesCreateStepType;
}) {
  return (
    <>
      <WishesCreateStepTitle
        stepTitle={createStep === 'link' ? '생일잔치 링크 생성하기' : '생일선물함 생성하기'}
      >
        {
          {
            link: <WishesLinkInputForm />,
            account: <WishesAccountInputForm />,
          }[createStep]
        }
      </WishesCreateStepTitle>
    </>
  );
}
