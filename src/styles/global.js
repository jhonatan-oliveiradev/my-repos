import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100%;
  }

  ::-webkit-scrollbar {
    width: 0.625rem;
    background: #161B22;
  }

  ::-webkit-scrollbar-thumb {
    background: #63f5b8;
    border-radius: 0.3125rem;

    &:hover {
      background: #52d89f;
    }
  }

  body {
    background: #161B22;
    font-size: 1rem;
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    color: #f3f3f3;
    font-size: 1rem;
    font-family: "Poppins", sans-serif;
  }

  button {
    cursor: pointer;
  }
`;
