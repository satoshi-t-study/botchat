import * as React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import { Editor } from './pages/chat'

const GlobalStyle = createGlobalStyle`
    body * {
      box-sizing: border-box;
    }
  `

const Main = (
  <>
    <GlobalStyle />
    <Editor />
  </>
)
render(Main, document.getElementById('app'))
