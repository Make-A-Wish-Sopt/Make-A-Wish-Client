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
    }

    html {
        display:flex;
        justify-content: center;
        font-size: 62.5%;
        background-color: ${theme.colors.white};
    }

    body {
        width:37.5rem;
        height:100vh;

        display : flex;
        justify-content: center;
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

    @font-face{
    font-family:'bitbit';
    src:url('//cdn.df.nexon.com/img/common/font/DNFBitBit-Regular.woff'),url('//cdn.df.nexon.com/img/common/font/DNFBitBit-Regular.woff2') ;
}
`;

export default GlobalStyle;
