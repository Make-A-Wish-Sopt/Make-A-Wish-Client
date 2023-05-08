import styled from 'styled-components';
import { CloseBtnIc } from '@/public/assets/icons';
import Image from 'next/image';

export default function CloseBtn() {

    return (
        <Button>
            <Image
                src={CloseBtnIc}
                alt="닫기"
                style={{ cursor: 'pointer' }}
            ></Image>
        </Button>
    );
}

const Button = styled.div`
  float: right;
`;