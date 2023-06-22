import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';

import theme from '@/styles/theme';
import { CloseSmallIc, LinkCopyIc } from '@/public/assets/icons';
import IconButton from '@/components/button/iconButton';
import InputLink from '@/components/common/input/inputLink';
import SNSBox from '@/components/button/snsBox';

import { SHARE_LIST } from '@/interfaces/ShareData';
import { sendKakaoMessage } from '@/hooks/sendkakaoMessage';
import { LoginUserInfo } from '@/recoil/auth/loginUserInfo';
import { QUERY_KEY } from '@/constant/queryKey';

interface ShareModalProps {
  onClick: () => void;
}


export default function ShareModal(props: ShareModalProps) {
  const { onClick } = props;
  const [wishesLink, setWishesLink] = useState('');
  const loginUserInfo = useRecoilValue(LoginUserInfo);
  console.log(loginUserInfo);

  useEffect(() => {
    setWishesLink(`https://sunmulzu.store/wishes/${loginUserInfo.wishesId}`);
  }, []);

  const handleKakaoShare = () => {
    sendKakaoMessage(loginUserInfo.nickName);
  };

  const handleTextCopy = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      alert('클립보드에 링크가 복사되었습니다.');
    } catch (error) {
      alert('복사에 실패하였습니다');
    }
  };

  return (
    <Styled.Container>
      <Styled.IconContainer>
        <IconButton src={CloseSmallIc} alt="닫기" onClick={onClick} />
      </Styled.IconContainer>

      <Styled.SNSContainer>
        {SHARE_LIST.map((sns) => (
          <SNSBox key={sns.name} onClick={sns.name === 'KaKaoTalk' ? handleKakaoShare : undefined}>
            <Image src={sns.logo} alt={`${sns.name}`} />
          </SNSBox>
        ))}
      </Styled.SNSContainer>

      <InputLink>
        <Styled.InputText value={wishesLink} readOnly />
        <IconButton
          src={LinkCopyIc}
          alt="링크 복사"
          onClick={() => handleTextCopy(wishesLink)}
        />
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
