import Image from 'next/image';
import InputText from '../Input/inputText';
import CloseIconInModal from './CloseIconInModal';
import { LinkCopyIc } from '../../../../public/assets/icons';
import { snsShareListArray } from '@/constant/model/snsShareList';
import { useEffect } from 'react';

export default function ShareLinkModal({
  modalState,
  handleModalState,
  wishId,
  nickName,
}: {
  modalState: boolean;
  handleModalState: () => void;
  wishId: string;
  nickName: string;
}) {
  const wishLink = `sunmulzu.com/wishes/${wishId}`;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { Kakao } = window;

      //refactor : 카카오 환경변수 변경해야됨
      // if (!Kakao.isInitialized()) {
      //   Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
      // }
    }
  }, []);

  async function handleAccountWishesLink() {
    try {
      await navigator.clipboard.writeText(wishLink);
      alert('링크가 복사됐어요!');
    } catch (error) {}
  }

  return (
    <CloseIconInModal isOpen={modalState} handleState={handleModalState}>
      <div className="flex gap-10 justify-center w-full p-10">
        {snsShareListArray.map((snsItem) => (
          <Image
            src={snsItem.image}
            alt="sns아이콘"
            onClick={() => {
              snsItem.onClick(wishLink, nickName);
            }}
          />
        ))}
      </div>

      <InputText onClick={handleAccountWishesLink} value={wishLink} readOnly>
        <Image src={LinkCopyIc} alt="" onClick={handleAccountWishesLink} />
      </InputText>
    </CloseIconInModal>
  );
}
