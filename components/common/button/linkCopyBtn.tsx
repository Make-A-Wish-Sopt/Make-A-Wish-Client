import { LinkCopyIC } from '@/public/assets/icons';
import Image from 'next/image';
import styled from 'styled-components'

export default function LinkCopyBtn() {

    return (
        <Button>
            <Image
                src={LinkCopyIC}
                alt="링크 복사"
                style={{ cursor: 'pointer' }}
            ></Image>
        </Button>
    );
}

const Button = styled.div`
`;