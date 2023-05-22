import theme from '@/styles/theme';
import styled from 'styled-components';
import Image from 'next/image';
import { CloseBlueIc } from '@/public/assets/icons';
import { ShareChatImg, PillCakeImg } from '@/public/assets/images';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import IconButton from '@/components/button/iconButton';
import ButtonBox from '@/components/button/buttonBox';

import ShareModal from '@/components/modal/ShareModal';
import { useState } from 'react'


export default function FormSharePage() {
    const [showModal, setShowModal] = useState(false)

    const clickModal = () => setShowModal(!showModal)


    return (
        <>
            <Header>
                <IconButton src={CloseBlueIc} alt="닫기" />
            </Header>

            <Styled.Container>
                <Styled.Title>ㅇㅇ님의<br />소원 생성 완료!</Styled.Title>
                <Styled.About>선물주들에게 생일 축하 받으러 가볼까요?</Styled.About>

                <Styled.ImageContainer>
                    <Image src={ShareChatImg}
                        alt="이뤄져라 얍!" />
                    <Image src={PillCakeImg}
                        alt="케이크" />
                </Styled.ImageContainer>
            </Styled.Container>

            {showModal && <ShareModal clickModal={clickModal} />}
            <Footer>
                <ButtonBox onClick={clickModal} backgroundColor={theme.colors.main_blue} fontColor={theme.colors.white}>
                    링크 공유하기
                </ButtonBox>
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
            /* margin: 10rem 0 12rem; */
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