import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    background-color: #F5F0E8;
    color: #2A2A2A;
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    outline: none;
    cursor: pointer;
    font-family: inherit;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 24px;
  }
  
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #E8E0D5;
  }

  ::-webkit-scrollbar-thumb {
    background: #2A2A2A;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #1A1A1A;
  }
`;