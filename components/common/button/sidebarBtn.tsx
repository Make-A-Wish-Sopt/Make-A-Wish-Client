import { SideBarIc } from '@/public/assets/icons';
import Image from 'next/image';
import styled from 'styled-components'

export default function InfoBtn() {

    return (
        <Button>
            <Image
                src={SideBarIc}
                alt="사이드바"
                style={{ cursor: 'pointer' }}
            ></Image>
        </Button>
    );
}

const Button = styled.div`
`;