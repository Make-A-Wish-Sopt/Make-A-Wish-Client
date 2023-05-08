import theme from '@/styles/theme';
import styled from 'styled-components';
import Image from 'next/image';
import CloseBtn from '@/components/common/button/closeBtn';
import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import ShareModal from '@/components/modal/ShareModal';
import { useState } from 'react'


export default function FormSharePage() {
    const [showModal, setShowModal] = useState(false)

    const clickModal = () => setShowModal(!showModal)

    return (
        <>
            <Header>
                <CloseBtn />
            </Header>

            <Styled.Container>
                <Styled.Title>ㅇㅇ님의<br />소원 생성 완료!</Styled.Title>
                <Styled.About>선물주들에게 생일 축하 받으러 가볼까요?</Styled.About>

                <Styled.ImageContainer>
                    <Image src="assets/images/sharePage_chat.svg"
                        width={163}
                        height={62}
                        alt="Main Cake Chat" />
                    <Image src="assets/images/pillCake.svg"
                        width={219}
                        height={219}
                        alt="Main Cake" />
                </Styled.ImageContainer>
            </Styled.Container>

            {showModal && <ShareModal clickModal={clickModal} />}
            <Footer>
                <button onClick={clickModal}>링크 공유하기</button>
            </Footer>
        </>
    );
}

const Styled = {
    Title: styled.div`
            ${theme.fonts.headline30};
            color: ${theme.colors.main_blue};
            margin: 0 0 2rem;
            display: flex;
            justify-content: center;
            white-space: pre-line;
            text-align: center;
            `,

    Container: styled.div`
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            `,

    ImageContainer: styled.div`
            width : 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            `,

    About: styled.div`
            ${theme.fonts.body14};
            color: ${theme.colors.main_blue};
            margin: 0 0 4.3rem;
            display: flex;
            justify-content: center;
            `,
};