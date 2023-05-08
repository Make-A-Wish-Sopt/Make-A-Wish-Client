import theme from '@/styles/theme';
import styled from 'styled-components';
import Image from 'next/image';
import InfoBtn from '@/components/common/button/infoBtn';
import KaKaoLoginBtn from '@/components/common/button/kakaoLoginBtn';
import Footer from '@/components/common/footer';
import Header from '@/components/common/header';


export default function LoginPage() {


    return (
        <>
            <Header>
                <InfoBtn />
            </Header>

            <Styled.Container>
                <Styled.ImageContainer>
                    <Styled.Title>조물주보다<br />생일선물주</Styled.Title>

                    <Image src="assets/images/loginPage_chat.svg"
                        width={241}
                        height={62}
                        alt="Main Cake Chat" />
                    <Image src="assets/images/pillCake.svg"
                        width={219}
                        height={219}
                        alt="Main Cake" />
                </Styled.ImageContainer>
                <Styled.About>사실 내가 갖고 싶었던 건...</Styled.About>
                <Styled.AboutSmall>에X팟 맥스</Styled.AboutSmall>
            </Styled.Container>

            <Footer>
                <KaKaoLoginBtn />
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