import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *
    *::after,
    *::before {
        box-sizing: border-box;
    }
    body {
        font-family: 'Open Sans';
        font-weight: 300;
        background-color: ${props => props.theme.bodyBgColor};
    }
`

export default GlobalStyle