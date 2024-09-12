import { SNS_LIST } from '@/constant/snsList';
import { LinkCopyIc } from '@/public/assets/icons';
import theme from '@/styles/theme';
import Image from 'next/image';
import styled from 'styled-components';

import { useEffect, useState } from 'react';
import useKakaoShare from '@/hooks/common/useKakaoShare';
import { useRecoilValue } from 'recoil';
import { LoginUserInfo } from '@/recoil/auth/loginUserInfo';
import InputLink from '../Input/InputLink';
import { useGetMainProgressData } from '@/hooks/queries/wishes';

export default function ShareContent() {
  const [wishesLink, setWishesLink] = useState('');
  const loginUserInfo = useRecoilValue(LoginUserInfo);

  const { progressData } = useGetMainProgressData();

  useEffect(() => {
    progressData && setWishesLink(`https://sunmulzu.store/wishes/${progressData.wishId}`);
  }, []);

  const handleShareSNS = (name: string) => {
    const link = encodeURIComponent(wishesLink);
    const text = encodeURIComponent(
      `${loginUserInfo.nickName}님의 생일선물을 고민하고 있다면?\n고민할 필요없이 이 귀여운 케이크를 선물해 ${loginUserInfo.nickName}님의 생일 펀딩에 참여해보세요! \n`,
    );
    const hashtag = encodeURIComponent(`#조물주보다생일선물주`);

    if (name === 'KakaoTalk') {
      useKakaoShare(loginUserInfo.nickName, wishesLink);
    } else if (name === 'FaceBook') {
      window.open(`http://www.facebook.com/sharer/sharer.php?u=${link}&hashtag=${hashtag}`);
    } else if (name === 'Twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${text + link}`);
    } else if (name === 'Instagram') {
      window.open(`https://instagram.com`);
    }
  };

  const handleTextCopy = async (text: string) => {
    const isClipboardSupported = () => navigator?.clipboard != null;

    try {
      if (isClipboardSupported()) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();

        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      alert('링크가 복사되었습니다.');
    } catch (error) {
      alert('공유하기가 지원되지 않는 환경입니다.');
    }
  };

  return (
    <Styled.ContentWrapper>
      <Styled.SNSContainer>
        {SNS_LIST.map((sns) => (
          <Styled.SNSBox key={sns.name} onClick={() => handleShareSNS(sns.name)} id={sns.name}>
            <Image src={sns.logo} alt={`${sns.name}`} />
          </Styled.SNSBox>
        ))}
      </Styled.SNSContainer>

      <InputLink>
        <Styled.InputText value={wishesLink} readOnly />
        <Image src={LinkCopyIc} alt="링크 복사" onClick={() => handleTextCopy(wishesLink)} />
      </InputLink>
    </Styled.ContentWrapper>
  );
}

const Styled = {
  ContentWrapper: styled.div`
    width: 100%;
    height: 100%;

    padding: 2.2rem 1.5rem 1.6rem;
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

  SNSBox: styled.div`
    margin: 0 0.5rem 0;
    cursor: pointer;
  `,
};
