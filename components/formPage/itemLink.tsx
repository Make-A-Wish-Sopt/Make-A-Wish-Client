import theme from '@/styles/theme';
import styled from 'styled-components';
import InputBox from '../common/input/inputBox';
import { SITE_LIST } from '@/interfaces/SiteData';
import Image from 'next/image';
import AlertTextBox from '../common/AlertText';
import PresentImageBox from '../common/presentImageBox';
import { validation } from '@/validation/input';
import useInput from '@/hooks/useInput';
import { LIMIT_TEXT } from '@/constant/limitText';
import { useQuery, useQueryClient } from 'react-query';
import { getItemImage } from '@/api/formPage/getItemData';
import { useState } from 'react';
import { QUERY_KEY } from '@/constant/queryKey';

export default function ItemLink() {
  const [link, changeLink] = useInput('', LIMIT_TEXT.none);
  const [isCorrectLink, setIsCorrectLink] = useState(false);

  const queryClient = useQueryClient();

  const { data: itemData, isSuccess } = useQuery(
    QUERY_KEY.itemData,
    async () => await getItemImage(replacedLink(link)),
    {
      onError: (error) => {
        console.log(error);
      },
      enabled: isCorrectLink,
    },
  );

  //queryClient부분 다시 체크해야됨!
  const parseImage = () => {
    if (link.length > 0 && validation.isCorrectSite(link)) {
      console.log(link);
      isCorrectLink && queryClient.invalidateQueries([QUERY_KEY.itemData, link]);
      setIsCorrectLink(true);
      return;
    }
    setIsCorrectLink(false);
  };

  const replacedLink = (link: string) => {
    return link.replace('https://www.coupang.com/', '').replace('https://product.29cm.co.kr/', '');
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
            <Image src={itemData.itemImage} width={158} height={158} alt="선물" />
          </PresentImageBox>
          <Styled.PresentPrice>가격 : {itemData.totalPrice}</Styled.PresentPrice>
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
};
