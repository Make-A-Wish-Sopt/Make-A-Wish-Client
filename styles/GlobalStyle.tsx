import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
    ${reset}

    :root {
        --vh: 100%;
    }

    * {
        box-sizing: border-box !important;
        -moz-box-sizing:border-box !important; /* Firefox */
        -webkit-box-sizing:border-box !important; /* Safari */
        transition: ${createTransitionQuery()};
        -webkit-tap-highlight-color:rgba(0,0,0,0); // 아이폰 버튼 클릭 깜박임 해제
    }

    html,
    body {
        width: 100%;
        height: 100vh;

        padding: 0;
        margin: 0;
        overflow-x: hidden;
        font-size: 62.5%;
    }

    html {
        display:flex;
        justify-content: center;
        background-color: ${theme.colors.white};

        height: -webkit-fill-available;


        overflow: hidden;
    }

    body {
        width:37.5rem;
        min-height: 100vh;
        /* mobile viewport bug fix */
        min-height: -webkit-fill-available;
        height: fill-available;

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
