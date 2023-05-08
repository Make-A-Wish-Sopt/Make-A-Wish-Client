import { InfoBtnIC } from '@/public/assets/icons';
import Image from 'next/image';
import styled from 'styled-components'

export default function InfoBtn() {

    return (
        <Button>
            <Image
                src={InfoBtnIC}
                alt="서비스 소개"
                style={{ cursor: 'pointer' }}
            ></Image>
        </Button>
    );
}

const Button = styled.div`
`;