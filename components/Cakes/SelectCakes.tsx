import { CAKE_LIST } from '@/constant/cakeList';
import { CakeListType } from '@/types/cakes/cakeListType';
import InputContainer from '../Common/Input/InputContainer';
import styled from 'styled-components';
import Image from 'next/image';
import theme from '@/styles/theme';
import { convertMoneyText } from '@/utils/common/convertMoneyText';
import ImageBox from '../Common/box/imageBox';
import { StyledBox } from '../Common/Box';

interface SelectCakesProps {
  selectedCake: CakeListType;
  selectedIndex: number;
  selectCake: (index: number) => void;
}

export default function SelectCakes(props: SelectCakesProps) {
  const { selectedCake, selectedIndex, selectCake } = props;

  return (
    <InputContainer title={'보내고 싶은 케이크 선택하기'}>
      <Styled.CakeWrapper>
        {CAKE_LIST.map((cake, index) => (
          <Styled.CakeBox
            as="li"
            onClick={() => selectCake(index)}
            index={index}
            selectedIndex={selectedIndex}
            key={cake.name}
          >
            <Image src={cake.cakeImage} alt={`${cake.name}이미지`} width={44} />
          </Styled.CakeBox>
        ))}
      </Styled.CakeWrapper>

      <ImageBox boxType="imageBox--image" colorSystem="pastelBlue_mainBlue">
        <Image src={selectedCake.detailImage} alt="케이크 상세 이미지" height={150} />
      </ImageBox>

      <Styled.CakeInfo>
        {selectedCake.name} {convertMoneyText(String(selectedCake.price))}원
      </Styled.CakeInfo>
    </InputContainer>
  );
}

const Styled = {
  CakeWrapper: styled.ul`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-column-gap: 1.2rem;
    grid-row-gap: 1rem;

    width: 100%;

    margin-bottom: 1.2rem;
  `,

  CakeBox: styled(StyledBox)<{ index: number; selectedIndex: number }>`
    width: 7.4rem;
    height: 4.6rem;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0.8rem 1.4rem;
    background-color: ${(props) =>
      props.index === props.selectedIndex ? theme.colors.main_blue : theme.colors.pastel_blue};
    border-radius: 0.6rem;

    cursor: pointer;
  `,

  CakeInfo: styled.span`
    ${theme.fonts.button18};
    color: ${theme.colors.main_blue};

    display: flex;
    justify-content: center;

    margin-top: 1rem;
  `,

  CakesImageWrapper: styled.div`
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
