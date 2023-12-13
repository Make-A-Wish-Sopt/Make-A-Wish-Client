import { SITE_LIST } from '@/constant/siteList';
import theme from '@/styles/theme';
import Image from 'next/image';
import styled from 'styled-components';

export default function SiteList() {
  return (
    <Styled.SiteItemWrapper>
      {Object.values(SITE_LIST).map((siteData) => (
        <Styled.SiteItem key={siteData.NAME}>
          <a href={siteData.LINK} target="_blank" rel="noopener noreferrer">
            <Image src={siteData.LOGO} alt={`${siteData.NAME} 로고`} />
          </a>
        </Styled.SiteItem>
      ))}
    </Styled.SiteItemWrapper>
  );
}

const Styled = {
  SiteItemWrapper: styled.ul`
    display: flex;

    width: 100%;
  `,

  SiteItem: styled.li`
    display: inline-block;
    width: 6rem;
    height: 6rem;
    background-color: ${theme.colors.white};
    cursor: pointer;
    margin: 0 1rem 1rem 0;
  `,
};

const StyledSiteItem = styled.li`
  display: inline-block;
  width: 6rem;
  height: 6rem;
  background-color: ${theme.colors.white};
  cursor: pointer;
  margin: 0 1rem 1rem 0;
`;
