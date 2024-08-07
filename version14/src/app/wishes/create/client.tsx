'use client';

import Text from '@/components/Common/Text';

export function Step1Input() {
  return (
    <>
      <Text as="h2" color="main_blue" font="headline24_100">
        소원 링크 생성하기
      </Text>

      <Text as="span" color="main_blue" font="body16">
        이미지 등록하기
      </Text>
    </>
  );
}

export function InputTest() {
  
}

export default function WishesCreateContent() {
  return (
    <>
      <Step1Input></Step1Input>
    </>
  );
}
