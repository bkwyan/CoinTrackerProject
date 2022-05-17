import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

    @font-face {
        font-family: "Europa"; 
        src: local('Europa'), local('Europa'),
        font-weight: 300;
        font-style: normal;
    }

    html,
    body {
        margin: 0;
        font-family: 'Europa';
    }

`;