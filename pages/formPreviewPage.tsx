import theme from '@/styles/theme';
import styled from 'styled-components';
import Image from 'next/image';
import PresentImageBox from '@/components/common/presentImageBox';
import InputHeader from '@/components/common/inputHeader';
import BackBtn from '@/components/common/backBtn';
import InputBox from '@/components/common/input/inputBox';
import InputLargeBox from '@/components/common/input/inputLargeBox';


export default function FormPreviewPage() {

    return (
        <>
            <InputHeader>
                <BackBtn />
            </InputHeader>
            <Styled.Title>소원 링크 화면 미리보기</Styled.Title>
            <Styled.InputTitle>2023.00.00~2023.00.00</Styled.InputTitle>

            <Styled.ItemBox>
                <Styled.InputTitle>소원링크 제목</Styled.InputTitle>
                <Styled.PresentContainer>
                    <PresentImageBox>
                        <Image
                            src=""
                            alt="선물" />
                    </PresentImageBox>
                    <Styled.PresentPrice>가격: 707,480원</Styled.PresentPrice>
                </Styled.PresentContainer>
            </Styled.ItemBox>

            <Styled.ItemBox>
                <InputLargeBox>
                    <Styled.Text>선물에 대한 힌트 자유롭게</Styled.Text>
                </InputLargeBox>
            </Styled.ItemBox>

            <Styled.ItemBox>
                <Styled.InputTitle>선물의 초성</Styled.InputTitle>
                <InputBox>
                    <Styled.Text>ㅇㅍㅇㅊ</Styled.Text>
                </InputBox>
            </Styled.ItemBox>

            <Styled.ItemBox>
                <Styled.InputTitle>예금주명/은행/계좌번호</Styled.InputTitle>
                <InputBox>
                    <Styled.Text>예금주명/은행/계좌번호</Styled.Text>
                </InputBox>
            </Styled.ItemBox>

            <Styled.ItemBox>
                <Styled.InputTitle>연락처</Styled.InputTitle>
                <InputBox>
                    <Styled.Text>00000000000</Styled.Text>
                </InputBox>
            </Styled.ItemBox>

            <button>소원 링크 생성하기</button>

        </>
    );
}

const Styled = {
    Title: styled.h1`
    ${theme.fonts.headline24_100};
    color: ${theme.colors.main_blue};
    margin: 2.4rem 0 2rem;
    `,

    ItemBox: styled.div`
    margin: 0 0 4rem;
    `,

    InputTitle: styled.div`
    ${theme.fonts.body16};
    color: ${theme.colors.main_blue};
    margin: 0 0 1rem;
    `,

    PresentContainer: styled.div`
    margin: 1rem 0 0;
    `,

    PresentPrice: styled.div`
    ${theme.fonts.button16};
    color: ${theme.colors.main_blue};
    text-align: center;
    `,

    Text: styled.div`
    ${theme.fonts.body12};
    color: ${theme.colors.dark_blue};
    text-align: left;
    `
};
