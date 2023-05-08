import theme from '@/styles/theme';
import styled from 'styled-components';
import Image from 'next/image';
import InputLink from '@/components/common/input/inputLink';
import CloseSmallBtn from '@/components/common/button/closeSmallBtn';
import LinkCopyBtn from '@/components/common/button/linkCopyBtn';
import ShareBtn from '@/components/common/button/shareBtn';

import { useState } from 'react'
import { SHARE_LIST } from '@/interfaces/ShareData';


interface ShareModalProps {
    clickModal: () => void;
}

export default function ShareModal(props: ShareModalProps) {
    const { clickModal } = props

    return (
        <Styled.Modal>
            <CloseSmallBtn></CloseSmallBtn>

            <Styled.SnsContainer>
                {SHARE_LIST.map((sns) => (
                    <ShareBtn>
                        <Image src={sns.logo} alt={`${sns.name}`} />
                    </ShareBtn>
                ))}
            </Styled.SnsContainer>

            <InputLink>
                <Styled.InputText value="www.asdf.co.kr" />
                <LinkCopyBtn></LinkCopyBtn>
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
    border-radius: 16px;
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

