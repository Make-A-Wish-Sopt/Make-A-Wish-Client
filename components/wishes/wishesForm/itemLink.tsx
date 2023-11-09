import theme from '@/styles/theme';
import styled from 'styled-components';
import InputBox from '../../common/input/inputBox';
import { SITE_LIST } from '@/constant/siteList';
import Image from 'next/image';
import AlertTextBox from '../../common/alertTextBox';
import { validation } from '@/validation/input';
import { ChangeEvent, useState } from 'react';
import { convertMoneyText } from '@/utils/common/convertMoneyText';
import ItemImageBox from './itemImageBox';
import { QUERY_KEY } from '@/constant/queryKey';
import { getItemInfo } from '@/api/wishes/wishesAPI';
import { extractImageSrc, extractPrice } from '@/utils/common/extractItem';
import { useQuery } from 'react-query';
import { getSiteData } from '@/utils/common/getSiteData';

interface ItemLinkProps {
  linkURL: string;
  handleChangeLinkURL: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  imageURL: string;
  changeImageURL: (input: string) => void;
  price: number;
  changePrice: (input: number) => void;
  readOnly?: boolean;
}

export default function ItemLink(props: ItemLinkProps) {
  const { linkURL, handleChangeLinkURL, imageURL, changeImageURL, price, changePrice, readOnly } =
    props;
  const [isCorrectLinkURL, setIsCorrectLinkURL] = useState(false);

  //queryClient부분 다시 체크해야됨!
  const parseImage = () => {
    isSuccess && refetch();
    if (validation.isCorrectSite(linkURL)) {
      setIsCorrectLinkURL(true);
    } else {
      setIsCorrectLinkURL(false);
    }
  };

  const { refetch, isSuccess } = useQuery(
    QUERY_KEY.ITEM_DATA,
    () => getItemInfo(linkURL, getSiteData(linkURL)),
    {
      onSuccess: (data) => {
        const imageData = extractImageSrc(data?.imageTag?.data?.data);
        const priceData = extractPrice(data?.priceTag?.data?.data, linkURL);

        if (imageData && priceData) {
          changeImageURL(imageData);
          changePrice(priceData);
        }
      },
      enabled: isCorrectLinkURL && validation.isCorrectSite(linkURL),
    },
  );

  return (
    <Styled.Container>
      {Object.values(SITE_LIST).map((siteData) => (
        <Styled.SiteBox key={siteData.NAME}>
          <a href={siteData.LINK} target="_blank" rel="noopener noreferrer">
            <Image src={siteData.LOGO} alt={`${siteData.NAME} 로고`} />
          </a>
        </Styled.SiteBox>
      ))}

      <InputBox
        placeholder="정해진 사이트에서 원하는 선물 링크 붙여넣기"
        handleBlur={parseImage}
        handleChangeValue={handleChangeLinkURL}
        readOnly={readOnly}
      ></InputBox>
      {linkURL && linkURL.length > 0 && !validation.isCorrectSite(linkURL) && (
        <AlertTextBox> 정해진 사이트에서 링크를 가져와주세요!</AlertTextBox>
      )}

      {imageURL && (
        <ItemImageBox imageURL={imageURL}>가격 : {convertMoneyText(String(price))}원</ItemImageBox>
      )}
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
    margin-bottom: 2.4rem;
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
