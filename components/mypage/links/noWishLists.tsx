import styled from 'styled-components';
import Image from 'next/image';
import theme from '@/styles/theme';
import { LinksPageChatImg, MainCakeImg } from '@/public/assets/images';
import ButtonBox from '@/components/common/button/buttonBox';
import router from 'next/router';


export default function NoWishLists() {

  const handleMoveToMain = () => {
    router.push('/main');
  };

  return (
    <>
      <Styled.Container>
        <Styled.ImageContainer>
          <Image src={LinksPageChatImg} alt="말풍선" />
          <Image src={MainCakeImg} alt="케이크" width={219} height={219} />
        </Styled.ImageContainer>
      </Styled.Container>

      <ButtonBox
        handleClick={handleMoveToMain}
        backgroundColor={theme.colors.main_blue}
        fontColor={theme.colors.white}
      >
        소원 링크 생성하러 가기
      </ButtonBox>
    </>
  );
}

const Styled = {
  Container: styled.div`
  margin: 6.7rem 0 3.7rem;
`,

  ImageContainer: styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`,

};