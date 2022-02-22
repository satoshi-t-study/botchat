import axios from 'axios';
//import View from '../components/View';
import * as React from 'react'
import styled from 'styled-components'
import { useStateWithStorage } from '../hooks/use_state_with_storage'
import { InputForm } from '../components/MessageForm';

const StorageKey = 'pages/editor:text'
const { useState } = React


const Header = styled.header`
  font-size: 1.5rem;
  height: 2rem;
  left: 0;
  line-height: 3rem;
  padding: 0.5rem 1rem;
  position: fixed;
  right: 0;
  top: 0;
`

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 4rem;
`

const DisplayMsgArea = styled.div`
  background-color: rgba(63, 81, 181, 0.7); 
  border-right: 1px solid silver;
  border-top: 1px solid silver;
  border-bottom: 1px solid silver;
  bottom: 30%;
  overflow-y: scroll;
  font-size: 1rem;
  left: 0;
  padding: 0.5rem;
  position: absolute;
  top: 0;
  width: 100%;
`

// const SendButton = styled.button`
// position:absolute;
// 		bottom: 10px;
// 		right:10px;
// display       : inline-block;
// border-radius : 5%;          /* 角丸       */
// font-size     : 18pt;        /* 文字サイズ */
// text-align    : center;      /* 文字位置   */
// cursor        : pointer;     /* カーソル   */
// padding       : 12px 12px;   /* 余白       */
// background    : #000066;     /* 背景色     */
// color         : #ffffff;     /* 文字色     */
// line-height   : 1em;         /* 1行の高さ  */
// transition    : .3s;         /* なめらか変化 */
// border        : 2px solid #000066;    /* 枠の指定 */
// `



export const Editor: React.FC = () => {
  const NOBY_API = "https://app.cotogoto.ai/webapi/noby.json";
  const NOBY_KEY = "048503e13e7451314d85dc068c4b0c51";
  const [text, setText] = useStateWithStorage('', StorageKey)
  const [msg, setMsg] = useState<string>('')
  const getNow = () => (new Date()).toISOString()
  const [now, setNow] = useState(getNow())

  return (
    <>
      <Header>
        bot chat
      </Header>
      <Wrapper>
        <DisplayMsgArea id="myText">
          メッセージ表示エリア
        </DisplayMsgArea>
        {/* <TextArea
          onChange={(event) => setText(event.target.value)}
          value={text}
        /> */}
        <InputForm />
      </Wrapper>
    </>
  )
}
