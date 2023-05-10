import theme from '@/styles/theme';
import styled from 'styled-components';
import Image from 'next/image';
import { InfoBtnIC } from '@/public/assets/icons';
import { KakaoLoginIc } from '@/public/assets/icons';
import { LoginChatImg } from '@/public/assets/images';
import { PillCakeImg } from '@/public/assets/images';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import IconButton from '@/components/common/button/iconButton';



export default function LoginPage() {


    return (
        <>
            <Header>
                <IconButton src={InfoBtnIC} alt="서비스 소개" />
            </Header>

            <Styled.Container>
                <Styled.ImageContainer>
                    <Styled.Title>조물주보다<br />생일선물주</Styled.Title>

                    <Image src={LoginChatImg}
                        alt="진짜 원하는 선물을 말해봐요" />
                    <Image src={PillCakeImg}
                        alt="케이크" />
                </Styled.ImageContainer>
                <Styled.About>사실 내가 갖고 싶었던 건...</Styled.About>
                <Styled.AboutSmall>에X팟 맥스</Styled.AboutSmall>
            </Styled.Container>

            <Footer>
                <IconButton src={KakaoLoginIc} alt="카카오 로그인" />
            </Footer>

        </>
    );
}

const Styled = {
    Title: styled.div`
    ${theme.fonts.title56};
    color: ${theme.colors.main_blue};
    margin: 0 0 3rem;
    display: flex;
    justify-content: center;
    white-space: pre-line;
    `,

    Container: styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height : 70%;    
    `,

    ImageContainer: styled.div`
    width : 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    `,

    About: styled.div`
    ${theme.fonts.headline24_100};
    color: ${theme.colors.main_blue};
    margin: 0 0 1.5rem;
    display: flex;
    justify-content: center;
    `,

    AboutSmall: styled.div`
    ${theme.fonts.body16};
    color: ${theme.colors.main_blue};
    display: flex;
    justify-content: center;
    `,
};