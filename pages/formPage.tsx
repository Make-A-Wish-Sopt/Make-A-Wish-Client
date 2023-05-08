import theme from '@/styles/theme';
import styled from 'styled-components';
import Image from 'next/image';
import InputHeader from '@/components/common/inputHeader';
import BackBtn from '@/components/common/backBtn';
import InputBox from '@/components/common/input/inputBox';
import InputBankBox from '@/components/common/input/inputBankBox';
import InputLength from '@/components/common/input/inputLength';
import SiteBtn from '@/components/common/button/siteBtn';
import AlertTextBox from '@/components/common/AlertText';
import PresentImageBox from '@/components/common/presentImageBox';

import InputCalendar from '@/components/common/input/inputCalendar';
import BankModal from '@/components/modal/BankModal';
import { SITE_LIST } from '@/interfaces/SiteData';
import { useState } from 'react'
import InputLargeBox from '@/components/common/input/inputLargeBox';



export default function FormPage() {
    const [showModal, setShowModal] = useState(false)

    const clickModal = () => setShowModal(!showModal)

    return (
        <>
            <InputHeader>
                <BackBtn />
            </InputHeader>
            <Styled.Title>소원 링크 생성하기</Styled.Title>

            <Styled.ItemBox>
                <Styled.InputTitle>갖고 싶은 선물 링크 불러오기</Styled.InputTitle>
                {SITE_LIST.map((site) => (
                    <SiteBtn>
                        <Image src={site.siteLogo} alt={`${site.name} 로고`} />
                    </SiteBtn>
                ))}
                <InputBox>
                    <Styled.InputText
                        placeholder="정해진 사이트에서 원하는 선물 링크 복사, 붙여넣기"
                    />
                </InputBox>
                <Styled.AlertBox>
                    <AlertTextBox> 정해진 사이트에서 링크를 가져와주세요!</AlertTextBox>
                </Styled.AlertBox>
                <Styled.PresentContainer>
                    <PresentImageBox>
                        <Image
                            src=""
                            width={100}
                            height={100}
                            alt="Present Image" />
                    </PresentImageBox>
                    <Styled.PresentPrice>가격: 707,480원</Styled.PresentPrice>
                </Styled.PresentContainer>
            </Styled.ItemBox>

            <Styled.ItemBox>
                <Styled.InputTitle>소원 링크 제목 작성하기</Styled.InputTitle>
                <InputBox>
                    <Styled.InputText
                        placeholder="ex. OO이의 앙큼 벌스데이"
                    />
                    <InputLength inputLength={0} limit={20} />
                </InputBox>
            </Styled.ItemBox>

            <Styled.ItemBox>
                <Styled.InputTitle>선물에 대한 힌트 자유롭게 적어보기</Styled.InputTitle>
                <InputLargeBox>
                    <Styled.TextareaText
                        placeholder="ex. 내가 이 물건 자주 언급했는데...기억나지?ㅋㅋ"
                    />
                    <InputLength inputLength={0} limit={300} />
                </InputLargeBox>
            </Styled.ItemBox>

            <Styled.ItemBox>
                <Styled.InputTitle>선물의 초성 적어보기</Styled.InputTitle>
                <InputBox>
                    <Styled.InputText
                        placeholder="ex. 애플워치 -> ㅇㅍㅇㅊ"
                    />
                    <InputLength inputLength={0} limit={15} />
                </InputBox>
            </Styled.ItemBox>

            <Styled.ItemBox>
                <Styled.InputTitle>나의 생일주간 설정하기</Styled.InputTitle>
                <Styled.CalendarContainer>
                    <InputCalendar>
                        <Styled.InputTextDone
                            placeholder="2023.04.12"
                            readOnly
                        />
                        <Image
                            src="assets/icons/CalendarIC.svg"
                            width={19}
                            height={22}
                            alt="Calendar Icon" />
                    </InputCalendar>
                    <InputCalendar>
                        <Styled.InputText
                            placeholder="종료일"
                            readOnly
                        />
                        <Image
                            src="assets/icons/CalendarIC.svg"
                            width={19}
                            height={22}
                            alt="Calendar Icon" />
                    </InputCalendar>
                </Styled.CalendarContainer>
            </Styled.ItemBox>

            <Styled.ItemBox>
                <Styled.InputTitle>송금 받을 계좌번호 입력하기</Styled.InputTitle>
                <InputBox>
                    <Styled.InputText
                        placeholder="예금주명"
                    />
                </InputBox>
                <br />
                {/* Modal */}
                <InputBankBox onClick={clickModal}>
                    <Styled.InputText
                        placeholder="은행 선택"
                        readOnly
                    />
                    <Image
                        src="assets/icons/arrow_downIC.svg"
                        width={14}
                        height={8}
                        alt="arrow-down" />
                </InputBankBox>
                {showModal && <BankModal clickModal={clickModal} />}
                <br />
                <InputBox>
                    <Styled.InputText
                        placeholder="계좌번호는 (-)없이 입력해주세요"
                    />
                </InputBox>
                <Styled.AlertBox>
                    <AlertTextBox> 계좌번호는 (-)없이 입력해주세요</AlertTextBox>
                </Styled.AlertBox>
            </Styled.ItemBox>

            <Styled.ItemBox>
                <Styled.InputTitle>연락처 입력하기</Styled.InputTitle>
                <InputBox>
                    <Styled.InputTextLarge
                        placeholder="연락처는 (-)없이 입력해주세요"
                    />
                </InputBox>
                <Styled.AlertBox>
                    <AlertTextBox> 연락처는 (-)없이 입력해주세요</AlertTextBox>
                </Styled.AlertBox>
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

    InputText: styled.input`
    ${theme.fonts.body12};
    color: ${theme.colors.dark_blue};
    width: 100%;
    `,

    InputTextDone: styled.input`
    ${theme.fonts.body12};
    color: ${theme.colors.dark_blue};
    width: 100%;
    `,

    InputTextLarge: styled.input`
    ${theme.fonts.body12};
    color: ${theme.colors.dark_blue};
    width: 100%;
    height: 10.5rem;
    `,

    CalendarContainer: styled.div`
    display: flex;
    `,

    AlertBox: styled.div`
    display: none
    `,

    PresentContainer: styled.div`
    display: none;
    margin: 1rem 0 0;
    `,

    PresentPrice: styled.div`
    ${theme.fonts.button16};
    color: ${theme.colors.main_blue};
    text-align: center;
    `,

    TextareaText: styled.textarea`
    ${theme.fonts.body12};
    width: 100%;
    height: 10.5rem;
    background-color: ${theme.colors.pastel_blue};
    border: none;
    `,
};
