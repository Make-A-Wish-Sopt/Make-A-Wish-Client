import styled from 'styled-components';
import Input from './input';
import { ArrowDownIc } from '@/public/assets/icons';
import Image from 'next/image';

export default function InputBank() {
  return (
    <Container
      onClick={() => {
        alert('hello');
      }}
    >
      <Input placeholder="은행 선택" readOnly>
        <Image src={ArrowDownIc} alt="더 보기" />
      </Input>
    </Container>
  );
}

const Container = styled.div``;
