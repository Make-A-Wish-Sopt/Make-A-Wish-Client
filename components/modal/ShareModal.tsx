import theme from '@/styles/theme';
import styled from 'styled-components';
import Image from 'next/image';
import { CloseSmallIC } from '@/public/assets/icons';
import { LinkCopyIC } from '@/public/assets/icons';
import IconButton from '@/components/common/button/iconButton';
import InputLink from '@/components/common/input/inputLink';
import SnsBox from '@/components/common/button/snsBox';

import { SHARE_LIST } from '@/interfaces/ShareData';


interface ShareModalProps {
    clickModal: () => void;
}

export default function ShareModal(props: ShareModalProps) {
    const { clickModal } = props

    return (
        <Styled.Modal>
            <IconButton src={CloseSmallIC} alt="닫기" />

            <Styled.SnsContainer>
                {SHARE_LIST.map((sns) => (
                    <SnsBox>
                        <Image src={sns.logo} alt={`${sns.name}`} />
                    </SnsBox>
                ))}
            </Styled.SnsContainer>

            <InputLink>
                <Styled.InputText value="www.asdf.co.kr" />
                <IconButton src={LinkCopyIC} alt="링크 복사" />

                <IconButton src={CloseSmallIC} alt="닫기" />

            </InputLink>
        </Styled.Modal >

    )
}

const Styled = {
    Modal: styled.div`
    width: 100%;
    height: 14.3rem;
    background-color: ${theme.colors.pastel_blue};
    padding: 1.6rem 1.5rem 1.6rem;
    border-radius: 1.6rem;
    `,

    SnsContainer: styled.div`
    margin: 0 0 1.7rem;
    display: flex;
    justify-content: center;
    `,

    InputText: styled.input`
    ${theme.fonts.body12};
    color: ${theme.colors.white};
    width: 100%;
    `,
};

