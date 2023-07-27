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
    if (name === 'KakaoTalk') {
      useKakaoShare(loginUserInfo.nickName, wishesLink);
    }
  };

  const handleTextCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 링크가 복사되었습니다.');
    } catch (error) {
      alert('복사에 실패하였습니다');
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
