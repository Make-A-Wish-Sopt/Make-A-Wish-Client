import { KakaoLoginIc } from '@/public/assets/icons';
import Image from 'next/image';
import styled from 'styled-components'

export default function KakaoLoginBtn() {

    return (
        <Button>
            <Image
                src={KakaoLoginIc}
                alt="카카오 로그인"
                style={{ cursor: 'pointer' }}
            ></Image>
        </Button>
    );
}

const Button = styled.section`
`;
