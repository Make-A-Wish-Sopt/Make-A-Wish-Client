import styled from 'styled-components';
import { CloseSmallIC } from '@/public/assets/icons';
import Image from 'next/image';

export default function CloseSmallBtn() {

    return (
        <Button>
            <Image
                src={CloseSmallIC}
                alt="닫기"
                style={{ cursor: 'pointer' }}
            ></Image>
        </Button>
    );
}

const Button = styled.div`
  float: right;
`;