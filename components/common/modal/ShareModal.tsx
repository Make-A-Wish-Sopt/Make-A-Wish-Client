import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';

import theme from '@/styles/theme';
import { CloseSmallIc, LinkCopyIc } from '@/public/assets/icons';
import IconButton from '@/components/common/button/iconButton';
import InputLink from '@/components/common/input/inputLink';
import SNSBox from '@/components/common/button/snsBox';

import { SNS_LIST } from '@/constant/snsList';
import useKakaoShare from '@/hooks/useKakaoShare';
import { LoginUserInfo } from '@/recoil/auth/loginUserInfo';

interface ShareModalProps {
  handleModalClick: () => void;
}

export default function ShareModal(props: ShareModalProps) {
  const { handleModalClick } = props;
  const [wishesLink, setWishesLink] = useState('');
  const loginUserInfo = useRecoilValue(LoginUserInfo);

  useEffect(() => {
    setWishesLink(`https://sunmulzu.store/wishes/${loginUserInfo.wishesId}`);
  }, []);

  const handlShareSNS = (name: string) => {
    const link = encodeURIComponent(wishesLink);
    const text = encodeURIComponent(`${loginUserInfo.nickName}님의 생일선물을 고민하고 있다면?\n고민할 필요없이 이 귀여운 케이크를 선물해 ${loginUserInfo.nickName}님의 생일 펀딩에 참여해보세요! \n`);
    const hashtag = encodeURIComponent(`#조물주보다생일선물주`);

    if (name === 'KakaoTalk') {
      useKakaoShare(loginUserInfo.nickName, wishesLink);
    } else if (name === 'FaceBook') {
      if (name === 'FaceBook') {
        window.open(`http://www.facebook.com/sharer/sharer.php?u=${link}&hashtag=${hashtag}`);
      }
    } else if (name === 'Twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${text + link}`);
    }
  };

  // const handleTextCopy = async (text: string) => {
  //   try {
  //     await navigator.clipboard.writeText(text);
  //     alert('클립보드에 링크가 복사되었습니다.');
  //   } catch (error) {
  //     alert('공유하기가 지원되지 않는 환경입니다.');
  //   }
  // };

  const isClipboardSupported = () => navigator?.clipboard != null;

  const handleTextCopy = async (text: string) => {
    if (isClipboardSupported()) {
      try {
        await navigator.clipboard.writeText(text);
        alert('링크가 복사되었습니다.');
      } catch (error) {
      }
    }

    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('링크가 복사되었습니다.');
    } catch (err) {
      alert('공유하기가 지원되지 않는 환경입니다.');
    }
  };

  return (
    <Styled.Container>
      <Styled.IconContainer>
        <IconButton src={CloseSmallIc} alt="닫기" onClick={handleModalClick} />
      </Styled.IconContainer>

      <Styled.SNSContainer>
        {SNS_LIST.map((sns) => (
          <SNSBox key={sns.name} handleClick={() => handlShareSNS(sns.name)}>
            <Image src={sns.logo} alt={`${sns.name}`} />
          </SNSBox>
        ))}
      </Styled.SNSContainer>

      <InputLink>
        <Styled.InputText value={wishesLink} readOnly />
        <IconButton src={LinkCopyIc} alt="링크 복사" onClick={() => handleTextCopy(wishesLink)} />
      </InputLink>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
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

  IconContainer: styled.header`
    position: absolute;
    top: 20%;
    right: 5%;
    transform: translate(-50%, -50%);
  `,

  SNSContainer: styled.div`
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
