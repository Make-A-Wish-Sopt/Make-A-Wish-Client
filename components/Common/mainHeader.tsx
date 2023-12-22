import styled from 'styled-components';

interface MainHeaderProps {
  title: React.ReactNode;
  side?: React.ReactNode;
  children?: React.ReactNode;
}

export default function MainHeader(props: MainHeaderProps) {
  const { title, side } = props;


  return (
    <>
      <Styled.Container>
        {title}
        <Styled.SideContainer>{side}</Styled.SideContainer>
      </Styled.Container>

    </>
  );
}

const Styled = {
  Container: styled.div`
    display: flex;
    margin: 2rem 0 0rem;
  `,

  SideContainer: styled.div`
    margin-left: auto;
`,
};
