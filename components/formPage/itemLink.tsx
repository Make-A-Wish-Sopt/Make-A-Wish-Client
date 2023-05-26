import theme from '@/styles/theme';
import styled from 'styled-components';
import InputBox from '../common/input/inputBox';
import { SITE_LIST } from '@/interfaces/SiteData';
import Image from 'next/image';
import AlertTextBox from '../common/alertTextBox';
import PresentImageBox from '../common/presentImageBox';
import { validation } from '@/validation/input';
import useInput from '@/hooks/useInput';
import { LIMIT_TEXT } from '@/constant/limitText';
import { useQuery, useQueryClient } from 'react-query';
import { getItemInfo } from '@/api/formPage/getItemData';
import { useState } from 'react';
import { QUERY_KEY } from '@/constant/queryKey';

interface ItemLinkProps {
  changePrice: (input: number) => void;
  changeImageUrl: (input: string) => void;
}

export default function ItemLink(props: ItemLinkProps) {
  const { changePrice, changeImageUrl } = props;
  const [link, changeLink] = useInput('', LIMIT_TEXT.none);
  const [isCorrectLink, setIsCorrectLink] = useState(false);

  const queryClient = useQueryClient();

  const { data: itemData, isSuccess } = useQuery(
    QUERY_KEY.itemData,
    async () => await getItemInfo(link),
    {
      onSuccess: (data) => {
        const imageData = data.imageTag.data?.data;
        const priceData = data.priceTag.data?.data;

        changePrice(Number(extractPrice(priceData)?.replaceAll(',', '')));
        changeImageUrl(extractImageSrc(imageData));
      },
      onError: (error) => {
        console.log(error);
      },
      enabled: isCorrectLink,
    },
  );

  //queryClient부분 다시 체크해야됨!
  const parseImage = () => {
    if (link.length > 0 && validation.isCorrectSite(link)) {
      isCorrectLink && queryClient.invalidateQueries([QUERY_KEY.itemData, link]);
      setIsCorrectLink(true);
      return;
    }
    setIsCorrectLink(false);
  };

  const extractImageSrc = (imageLink: string) => {
    const regex = /<img[^>]+src=[\"']?([^>\"']+)[\"']?[^>]*>/g;
    const imageSrc = regex.exec(imageLink);

    return imageSrc[1];
  };

  const extractPrice = (totalPrice: string) => {
    const html = document.createElement('span');
    html.innerHTML = totalPrice;
    const innerHtmlText = html.querySelector('.css-4bcxzt')?.innerHTML;
    const price = innerHtmlText?.substring(0, innerHtmlText.indexOf('<'));

    return price;
  };

  return (
    <Styled.ItemBox>
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
          onChange={changeLink}
          onBlur={parseImage}
        />
      </InputBox>
      {link.length > 0 && !validation.isCorrectSite(link) && (
        <AlertTextBox> 정해진 사이트에서 링크를 가져와주세요!</AlertTextBox>
      )}

      {isSuccess && (
        <Styled.PresentContainer>
          <PresentImageBox>
            <Styled.ImageWrapper>
              <Image
                src={extractImageSrc(itemData.imageTag.data?.data)}
                fill={true}
                alt="선물"
                style={{ borderRadius: '1.6rem', objectFit: 'cover' }}
              />
            </Styled.ImageWrapper>
          </PresentImageBox>
          <Styled.PresentPrice>
            가격 : {extractPrice(itemData.priceTag.data?.data)}원
          </Styled.PresentPrice>
        </Styled.PresentContainer>
      )}
    </Styled.ItemBox>
  );
}

const Styled = {
  ItemBox: styled.div`
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
