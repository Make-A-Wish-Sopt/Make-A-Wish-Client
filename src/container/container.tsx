import { AlimTalkReceiveButton, KakaoLoginButton } from './client';
import { MainPageContent } from './server';

function MainPageContainer() {
  return (
    <>
      <MainPageContent />
      <div className="flex flex-col gap-10">
        <KakaoLoginButton />
        <AlimTalkReceiveButton />
      </div>
    </>
  );
}

export default MainPageContainer;
