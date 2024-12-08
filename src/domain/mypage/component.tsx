import Image from 'next/image';
import { GuideImg, MypageDefaultCakeImg } from '../../../public/assets/images';
import MoreBox from '@/components/UI/MoreBox';
import useToggle from '@/hooks/common/useToggle';
import Modal from '@/components/Common/Modal';
import CloseTopModal from '@/components/Common/Modal/CloseTopModal';

export function MypageUserName({ nickName }: { nickName: string }) {
  return (
    <div className="flex gap-10 items-center mt-11 mb-20">
      <Image
        src={MypageDefaultCakeImg}
        alt="마이페이지 기본 케이크 이미지"
        width={50}
        height={50}
      />
      <span className="font-bitbit text-[24px] text-white">{nickName}님</span>
    </div>
  );
}

export function UserManualGuideButton() {
  const { state: guideModalState, handleState: handleGuideModalState } = useToggle();

  return (
    <>
      <MoreBox text="사용설명서 보기" handleClick={handleGuideModalState} />
      {
        <CloseTopModal isOpen={guideModalState} handleState={handleGuideModalState}>
          <div className="flex justify-center items-center w-full h-full ">
            <Image className="w-[85%]" src={GuideImg} alt="안내 이미지" />
          </div>
        </CloseTopModal>
      }
    </>
  );
}
