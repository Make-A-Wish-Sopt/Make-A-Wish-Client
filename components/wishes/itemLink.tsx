import theme from '@/styles/theme';
import styled from 'styled-components';
import InputBox from '../common/input/inputBox';
import { SITE_LIST } from '@/constant/wishes/siteData';
import Image from 'next/image';
import AlertTextBox from '../common/alertTextBox';
import { validation } from '@/validation/input';
import useInput from '@/hooks/common/useInput';
import { useState } from 'react';
import { useGetItemInfo } from '@/hooks/queries/wishes/wishes';
import InputLargeBox from '../common/input/inputLargeBox';

interface ItemLinkProps {
  handleChangePrice: (input: number) => void;
  handleChangeImageURL: (input: string) => void;
  imageURL: string;
  price: number;
}

export default function ItemLink(props: ItemLinkProps) {
  const { handleChangePrice, handleChangeImageURL, imageURL } = props;
  const [linkURL, handleChangeLinkURL] = useInput('');
  const [isCorrectLink, setIsCorrectLink] = useState(false);
  const { itemData, isSuccess } = useGetItemInfo(isCorrectLink, linkURL);

  //queryClient부분 다시 체크해야됨!
  const parseImage = () => {
    if (linkURL.length > 0 && validation.isCorrectSite(linkURL)) {
      setIsCorrectLink(true);
      return;
    }
    setIsCorrectLink(false);
  };

  return (
    <Styled.Container>
      <Styled.InputTitle>갖고 싶은 선물 링크 불러오기</Styled.InputTitle>
      {SITE_LIST.map((site) => (
        <Styled.SiteBox key={site.name}>
          <a href={site.link} target="_blank" rel="noopener noreferrer">
            <Image src={site.logo} alt={`${site.name} 로고`} />
          </a>
        </Styled.SiteBox>
      ))}

      <InputBox>
        <Styled.InputText
          placeholder="정해진 사이트에서 원하는 선물 링크 복사, 붙여넣기"
          onChange={handleChangeLinkURL}
          onBlur={parseImage}
        />
      </InputBox>
      {linkURL.length > 0 && !validation.isCorrectSite(linkURL) && (
        <AlertTextBox> 정해진 사이트에서 링크를 가져와주세요!</AlertTextBox>
      )}

      {isSuccess && itemData && (
        <Styled.PresentContainer>
          <InputLargeBox bgColor={theme.colors.white}>
            <Styled.ImageWrapper>
              <Image
                src={imageURL}
                fill={true}
                alt="선물"
                style={{ borderRadius: '1.6rem', objectFit: 'cover' }}
              />
            </Styled.ImageWrapper>
          </InputLargeBox>
          <Styled.PresentPrice>가격 : test원</Styled.PresentPrice>
        </Styled.PresentContainer>
      )}
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
    margin: 0 0 4rem;
  `,

  InputTitle: styled.div`
    ${theme.fonts.body16};
    color: ${theme.colors.main_blue};
    margin: 0 0 1rem;
  `,

  InputText: styled.input`
    ${theme.fonts.body12};
    color: ${theme.colors.dark_blue};
    width: 100%;
  `,

  PresentContainer: styled.div`
    margin: 1rem 0 0;
  `,

  PresentPrice: styled.div`
    ${theme.fonts.button16};
    color: ${theme.colors.main_blue};
    text-align: center;
  `,

  SiteBox: styled.div`
    display: inline-block;
    width: 6rem;
    height: 6rem;
    background-color: ${theme.colors.white};
    cursor: pointer;
    margin: 0 1rem 1rem 0;
  `,
  ImageWrapper: styled.div`
    position: relative;

    width: 100%;
    height: 100%;

    object-fit: fill;
  `,
};
