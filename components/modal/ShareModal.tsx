import theme from '@/styles/theme';
import styled from 'styled-components';
import Image from 'next/image';
import { CloseSmallIc } from '@/public/assets/icons';
import { LinkCopyIc } from '@/public/assets/icons';
import IconButton from '@/components/button/iconButton';
import InputLink from '@/components/common/input/inputLink';
import SnsBox from '@/components/button/snsBox';
import { useAuthKaKao } from '@/hooks/useAuthKakao';
import { SHARE_LIST } from '@/interfaces/ShareData';
import { sendKakaoMessage } from '@/hooks/sendkakaoMessage';
import { useState } from 'react';

interface ShareModalProps {
  clickModal: () => void;
}

export default function ShareModal(props: ShareModalProps) {
  const { clickModal } = props;
  const [wishLink, setWishLink] = useState('');

  const { nickname } = useAuthKaKao();

  const shareKakao = () => {
    sendKakaoMessage(nickname);
  };

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 링크가 복사되었습니다.');
    } catch (e) {
      alert('복사에 실패하였습니다');
    }
  };

  // 수정: 링크 가져오기

  return (
    <Styled.Modal>
      <Styled.Header>
        <IconButton src={CloseSmallIc} alt="닫기" onClick={clickModal} />
      </Styled.Header>

      <Styled.SnsContainer>
        {SHARE_LIST.map((sns) => (
          <SnsBox key={sns.name} onClick={sns.name === 'KaKaoTalk' ? shareKakao : undefined}>
            <Image src={sns.logo} alt={`${sns.name}`} />
          </SnsBox>
        ))}
      </Styled.SnsContainer>

      <InputLink>
        <Styled.InputText value={wishLink} readOnly />
        <IconButton
          src={LinkCopyIc}
          alt="링크 복사"
          onClick={() => handleCopyClipBoard('www.asdf.co.kr')} // 수정: 받아온 링크
        />
      </InputLink>
    </Styled.Modal>
  );
}

const Styled = {
  Modal: styled.div`
    width: 31.6rem;
    height: 14.3rem;
    background-color: ${theme.colors.pastel_blue};
    padding: 2.2rem 1.5rem 1.6rem;
    border-radius: 1.6rem;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,

  Header: styled.header`
    position: absolute;
    top: 20%;
    right: 5%;
    transform: translate(-50%, -50%);
  `,

  SnsContainer: styled.div`
    margin: 0 0 1.5rem;
    display: flex;
    justify-content: center;
  `,

  InputText: styled.input`
    ${theme.fonts.body12};
    color: ${theme.colors.white};
    width: 100%;
  `,
};
