import theme from '@/styles/theme';
import styled from 'styled-components';
import { validation } from '@/validation/input';
import { useState } from 'react';
import { convertMoneyText } from '@/utils/common/convertMoneyText';
import { QUERY_KEY } from '@/constant/queryKey';
import { extractImageSrc, extractPrice } from '@/utils/common/extractItem';
import { useQuery } from 'react-query';
import { getSiteData } from '@/utils/common/getSiteData';
import Input from '@/components/Common/Input/Input';
import { UseFormReturn } from 'react-hook-form';
import AlertTextBox from '@/components/Common/AlertTextBox';
import ItemImageBox from '@/components/Common/Box/ItemImageBox';
import { WishesDataInputType } from '@/types/wishesType';
import { getPresentLinkInfo } from '@/api/wishes';

interface ItemLinkProps {
  methods: UseFormReturn<WishesDataInputType, any, undefined>;
}

export default function ItemLink(props: ItemLinkProps) {
  const { methods } = props;
  const [isCorrectLinkURL, setIsCorrectLinkURL] = useState(false);

  const linkURL = methods.watch('linkURL');
  const imageUrl = methods.getValues('imageUrl');
  const price = methods.getValues('price');

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
    () => getPresentLinkInfo(linkURL, getSiteData(linkURL)),
    {
      onSuccess: (data) => {
        const imageData = extractImageSrc(data?.imageTag?.data?.data);
        const priceData = extractPrice(data?.priceTag?.data?.data, linkURL);

        if (imageData) {
          methods.setValue('imageUrl', imageData);
          methods.setValue('price', priceData);
        }
      },
      enabled: isCorrectLinkURL && validation.isCorrectSite(linkURL),
    },
  );

  return (
    <Styled.Container>
      <Input
        register={methods.register('linkURL', {
          onBlur: parseImage,
        })}
        placeholder="정해진 사이트에서 원하는 선물 링크 붙여넣기"
      />
      {linkURL && linkURL.length > 0 && !validation.isCorrectSite(linkURL) && (
        <AlertTextBox> 정해진 사이트에서 링크를 가져와주세요!</AlertTextBox>
      )}

      {imageUrl && linkURL && isCorrectLinkURL && (
        <Styled.ItemImageWrapper>
          <ItemImageBox src={imageUrl} alt="링크에서 불러온 선물이미지" />
          {`가격 : ${convertMoneyText(price.toString())}원`}
        </Styled.ItemImageWrapper>
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

  ItemImageWrapper: styled.div`
    margin-top: 1.2rem;
  `,
};
