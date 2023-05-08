import theme from '@/styles/theme';
import styled from 'styled-components';
import Image from 'next/image';
import SideBar from '@/components/common/button/sidebarBtn';

export default function MainPage() {


    return (
        <>
            <Styled.HeaderContainer>
                <Styled.Title>ㅇㅇ님,
                    <br /><span style={{ color: theme.colors.main_blue }}>소원 링크</span>를 생성하고<br />케이크를 모아봐요!
                </Styled.Title >
                <Styled.SideContainer>
                    <SideBar />
                    <Styled.DDay>
                        D-?</Styled.DDay>
                </Styled.SideContainer>
            </Styled.HeaderContainer>

            <Styled.CenterContainer>
                <div style={{ display: "block" }}>
                    <Styled.BarContainer>
                        <Image src="assets/images/GaugeBarImg.svg"
                            width={10}
                            height={280}
                            alt="GaugeBar"
                        />
                    </Styled.BarContainer>
                    <Image src="assets/images/mainPage_chat.svg"
                        width={163}
                        height={62}
                        alt="Main Cake Chat" />
                    <Styled.ImageContainer>
                        <Image src="assets/images/pillCake.svg"
                            width={219}
                            height={219}
                            alt="Main Cake" />
                    </Styled.ImageContainer>
                    <Styled.About>모인 케이크 금액</Styled.About>
                    <Styled.AboutSmall>총 ???원</Styled.AboutSmall>
                </div>
            </Styled.CenterContainer>

            <button>소원 링크 생성하기</button>
        </>
    );
}

const Styled = {
    HeaderContainer: styled.div`
    display:flex; 
    `,

    SideContainer: styled.div`
    margin-left: auto;
    `,

    Title: styled.div`
    ${theme.fonts.headline24_130};
    margin: 0 0 3rem;
    `,

    DDay: styled.div`
    ${theme.fonts.headline20};
    color: ${theme.colors.main_blue};
    display: flex;
    justify-content: center;
    margin-top: 2.3rem;
    `,

    CenterContainer: styled.div`
    margin: 9rem 0 0;
    `,

    BarContainer: styled.div`
    float: right;
    margin: 6rem 1.5rem 0 0;
    `,

    ImageContainer: styled.div`
    width : 100%;
    text-align : center;
    `,

    About: styled.div`
    ${theme.fonts.headline24_100};
    color: ${theme.colors.main_blue};
    margin: 0 0 1rem;
    display: flex;
    justify-content: center;
    `,

    AboutSmall: styled.div`
    ${theme.fonts.headline24_100};
    display: flex;
    justify-content: center;
    margin: 0 0 15rem;
    `,
};