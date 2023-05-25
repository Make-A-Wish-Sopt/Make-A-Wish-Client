import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    html,
    body {
        max-width: 100vw;
        overflow-x: hidden;
        height: 100lvh;
    }

    html {
        display:flex;
        justify-content: center;

        font-size: 62.5%;
    }

    body {
        width:37.5rem;

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
