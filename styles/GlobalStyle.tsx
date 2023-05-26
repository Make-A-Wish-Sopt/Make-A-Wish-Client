import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
        transition: ${createTransitionQuery()};
    }

    html,
    body {
        width: 100%;

        overflow-x: hidden;
    }

    html {
        display:flex;
        justify-content: center;

        height: 100vh;
        font-size: 62.5%;

        overflow: hidden;
    }

    body {
        width:37.5rem;
        height: 100svh; /* fallback */
        height: calc(var(--vh) * 100);

        padding : 2.2rem;
        background-color: ${theme.colors.bg_yellow};

    }



    a {
    color: inherit;
    text-decoration: none;
    }

    .non-clickable {
        pointer-events: none;
    }

    button{
        cursor: pointer;
    }

    button, input, textarea {
        border: none;
        outline:none;
        background: transparent;
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
