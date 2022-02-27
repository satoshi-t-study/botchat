import * as React from 'react'
import { render } from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import { Chat } from './pages/chat'

const GlobalStyle = createGlobalStyle`
    body * {
      box-sizing: border-box;
    }
  `

const Main = (
  <>
    <GlobalStyle />
    <Chat />
  </>
)
render(Main, document.getElementById('app'))
