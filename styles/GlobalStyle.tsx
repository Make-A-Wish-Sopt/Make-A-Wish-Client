import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
	${reset}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}

	* {
    box-sizing: border-box;
		-moz-box-sizing:border-box !important; /* Firefox */
    -webkit-box-sizing:border-box !important; /* Safari */
    transition: ${createTransitionQuery()};
    -webkit-tap-highlight-color:rgba(0,0,0,0); // 아이폰 버튼 클릭 깜박임 해제

  }
  :root {
    --vh: 100%;
  }

	html {
    -webkit-touch-callout: none;
    /* -webkit-user-select:none; */
    -webkit-tap-highlight-color:rgba(0, 0, 0, 0);

    scroll-behavior: smooth;

    font-family: sans-serif;
    font-size: 62.5%;
    user-select: none;

    background-color: ${theme.colors.background};
  }

  body{
    overflow: scroll;
  }

	ul, li {
    padding-left: 0rem;
    list-style: none;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  textarea, input, button {
    outline: none;
    border: none;
    background-color: transparent;
		color:inherit;
		font : inherit
  }
  button {
    cursor: pointer;
    padding: 0;
  }
  input {
    appearance: none;
    &:focus {
      outline: none;
    }
  }




	@font-face{
		font-family:'bitbit';
		src:url('//cdn.df.nexon.com/img/common/font/DNFBitBit-Regular.woff'),url('//cdn.df.nexon.com/img/common/font/DNFBitBit-Regular.woff2') ;
	}
`;

function createTransitionQuery() {
  const properties = ['color', 'background-color', 'border-color'];

  return properties.map((prop) => `${prop} 0.3s`).join(', ');
}

export default GlobalStyle;
