import styled from 'styled-components';
import Image from 'next/image';
import router from "next/router";
import theme from '@/styles/theme';
import IconButton from '@/components/button/iconButton';
import { CloseWhiteIc } from '@/public/assets/icons';
import { GuideContentImg, GuideBoxImg } from '@/public/assets/images';
import ButtonBox from '@/components/button/buttonBox';

interface GuideModalProps {
    modalToggle: () => void;
}

export default function GuideModal(props: GuideModalProps) {
    const { modalToggle } = props;

    const handleChange = () => {
        router.push('/');
    };

    return (
        <Styled.Container>
            <Styled.BoxContainer>
                <Styled.ButtonContainer onClick={modalToggle}>
                    <IconButton src={CloseWhiteIc} alt="닫기" />
                </Styled.ButtonContainer>

                <Styled.ContentContainer>
                    <Image src={GuideBoxImg} alt="" fill />
                    <Styled.ScrollContent>
                        <Image
                            src={GuideContentImg}
                            alt="서비스 가이드" />
                        <Styled.ButtonContainer2>
                            <ButtonBox handleClick={handleChange} backgroundColor={theme.colors.main_blue} fontColor={theme.colors.white}>
                                고객센터 문의하기
                            </ButtonBox>
                        </Styled.ButtonContainer2>
                    </Styled.ScrollContent>

                </Styled.ContentContainer>
            </Styled.BoxContainer>
        </Styled.Container>
    );
}

const Styled = {
    Container: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    `,

    BoxContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    `,

    ContentContainer: styled.div`
    position: relative;
    width: 33rem;
    height: 61.4rem;
    overflow: hidden;
    border-radius: 1.6rem;
    display: flex;
    flex-direction: column;
    `,

    ScrollContent: styled.div`
    flex: 1;
    overflow-y: auto;
    position: relative;
    margin: 4.5rem 0 2rem;
    `,

    ButtonContainer: styled.div`
    position: relative;
    margin: 2.3rem 0rem 2.9rem;
    `,

    ButtonContainer2: styled.div`
    position: relative;
    margin: 2.3rem 2.1rem 0;
    `,
}; 