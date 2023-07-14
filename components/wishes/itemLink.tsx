import theme from '@/styles/theme';
import styled from 'styled-components';
import InputBox from '../common/input/inputBox';
import { SITE_LIST } from '@/constant/siteList';
import Image from 'next/image';
import AlertTextBox from '../common/alertTextBox';
import { validation } from '@/validation/input';
import useInput from '@/hooks/common/useInput';
import { useEffect, useState } from 'react';
import { useGetItemInfo } from '@/hooks/queries/wishes/useGetItemInfo';
import { useSetRecoilState } from 'recoil';
import { WishesData } from '@/recoil/formPage/wishesData';

export default function ItemLink() {
  const [linkURL, handleChangeLinkURL] = useInput('');
  const [isCorrectLink, setIsCorrectLink] = useState(false);
  const { imageURL, price, isSuccess } = useGetItemInfo(isCorrectLink, linkURL);

  const setWishesData = useSetRecoilState(WishesData);

  useEffect(() => {
    setWishesData((prev) => ({
      ...prev,
      imageURL: imageURL,
      price: Number(price),
    }));
  }, [imageURL, price]);

  //queryClient부분 다시 체크해야됨!
  const parseImage = () => {
    if (linkURL.length > 0 && validation.isCorrectSite(linkURL)) {
      setIsCorrectLink(true);
      return;
    }
    setIsCorrectLink(false);
  };

  const changePriceToNumber = (price: number): string => {
    return price.toString().replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
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

      {isSuccess && (
        <Styled.PresentContainer>
          <Styled.PresentBox>
            <Styled.ImageWrapper>
              <Image
                src={imageURL}
                fill={true}
                alt="선물"
                style={{ borderRadius: '1.6rem', objectFit: 'cover' }}
              />
            </Styled.ImageWrapper>
          </Styled.PresentBox>
          <Styled.PresentPrice>가격 : {changePriceToNumber(price)}원</Styled.PresentPrice>
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

  PresentBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 16rem;

    border: 0.1rem solid ${theme.colors.main_blue};
    background-color: ${theme.colors.white};
    border-radius: 1.6rem;
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
