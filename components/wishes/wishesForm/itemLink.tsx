import theme from '@/styles/theme';
import styled from 'styled-components';
import InputBox from '../../common/input/inputBox';
import { SITE_LIST } from '@/constant/siteList';
import Image from 'next/image';
import AlertTextBox from '../../common/alertTextBox';
import { validation } from '@/validation/input';
import { ChangeEvent } from 'react';
import PresentBox from '@/components/common/box/PresentBox';
import { convertMoneyText } from '@/utils/common/convertMoneyText';

interface ItemLinkProps {
  linkURL: string;
  handleChangeLinkURL: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  changeValidation: (state: boolean) => void;
  isSuccess: boolean;
  imageURL: string;
  price: number;
}

export default function ItemLink(props: ItemLinkProps) {
  // const [linkURL, handleChangeLinkURL] = useInput('');
  // const [isCorrectLink, setIsCorrectLink] = useState(false);
  // const { imageURL, price, isSuccess } = useGetItemInfo(isCorrectLink, linkURL);
  const { linkURL, handleChangeLinkURL, changeValidation, isSuccess, imageURL, price } = props;

  //queryClient부분 다시 체크해야됨!
  const parseImage = () => {
    if (linkURL.length > 0 && validation.isCorrectSite(linkURL)) {
      changeValidation(true);
      return;
    }
    changeValidation(false);
  };

  return (
    <Styled.Container>
      {SITE_LIST.map((site) => (
        <Styled.SiteBox key={site.name}>
          <a href={site.link} target="_blank" rel="noopener noreferrer">
            <Image src={site.logo} alt={`${site.name} 로고`} />
          </a>
        </Styled.SiteBox>
      ))}

      <InputBox
        placeholder="정해진 사이트에서 원하는 선물 링크 복사, 붙여넣기"
        handleBlur={parseImage}
        handleChangeValue={handleChangeLinkURL}
      ></InputBox>
      {linkURL.length > 0 && !validation.isCorrectSite(linkURL) && (
        <AlertTextBox> 정해진 사이트에서 링크를 가져와주세요!</AlertTextBox>
      )}

      {isSuccess && (
        <Styled.PresentWrapper>
          <PresentBox>
            <Styled.ImageWrapper>
              <Image
                src={imageURL}
                fill={true}
                alt="선물"
                style={{ borderRadius: '1.6rem', objectFit: 'cover' }}
              />
            </Styled.ImageWrapper>
          </PresentBox>
          <Styled.PresentPrice>가격 : {convertMoneyText(price)}원</Styled.PresentPrice>
        </Styled.PresentWrapper>
      )}
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div``,

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

  PresentWrapper: styled.div`
    margin: 1.2rem 0 1rem;
  `,

  PresentPrice: styled.div`
    ${theme.fonts.button18};
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
