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
        height: calc(var(--vh, 1vh) * 100);
        padding: 0;
        margin: 0;
        line-height: 1.6;

        width: 100%;
        height: 100vh;
        height: var(--vh);
        overflow-x: hidden;
        font-size: 62.5%;
        position:fixed;
        @media (max-height:700px){
            font-size: 56.25%;
        }
    }

    html {
        display:flex;
        justify-content: center;

        font-size: 62.5%;

        overflow: hidden;
    }

    body {
        width:37.5rem;
        padding : 2.2rem;
        background-color: ${theme.colors.background};
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
        color:inherit;
        font : inherit
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
