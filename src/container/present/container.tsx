import { GivePresentForm } from './client';
import { CheckPresentItem, MessageFromWisheMaker } from './server';

export default function GivePresentPageContainer() {
  return (
    <>
      <GivePresentForm StepOne={<MessageFromWisheMaker />} StepTwo={<CheckPresentItem />} />
    </>
  );
}
