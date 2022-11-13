import { createGlobalStyle } from 'styled-components'

export const GlobalCSSElements = createGlobalStyle`
  html {
    height: 100%;
    font-size: 16px;
  }

  h1 {
    font-size: 30px;
  }

  h2 {
    font-size: 24px;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: var(--color-white-2);
    padding-bottom: var(--footer-height);
    position: relative;
    min-height: 100%;
  }
`
