import * as React from 'react'
import { useStateWithStorage } from '../hooks/use_state_with_storage'
import styled from 'styled-components'
import { putMsg } from '../indexeddb/chatStore'

const StorageKey = 'pages/chat:text'
const AwaitAnswer = 'botchat_awaitAnswer:text'

export const InputForm = (props) => {
  const [message, setMessage] = useStateWithStorage('', StorageKey);
  const [awaitAnswer, setAwaitAnswer] = useStateWithStorage('', AwaitAnswer);

  const handleSubmit = (event) => {
    if (message.length > 0) {
      event.preventDefault();
      //console.log(name);
      props.setValue(message)
      putMsg("自分", message, true, false)
      setAwaitAnswer(message);
      setMessage('');
    } else {
      //error
      console.log("メッセージを入力してください")
    }
  };

  return (
    <>
      <TextArea
        onChange={(event) => setMessage(event.target.value)}
        value={message}
      />
      <form onSubmit={handleSubmit}>
        <SendButton>
          送信
        </SendButton>
      </form>
    </>
  );
}

const TextArea = styled.textarea`
  resize: none;
  border: 1px solid black;
  bottom: 2vh;
  left: 2vh;
  font-size: 1rem;
  padding: 1rem;
  position: absolute;
  height: 10%;
  width: 90%;
`
const SendButton = styled.button`
position:absolute;
		bottom: 2vh;
		right: 4vh;
display       : inline-block;
border-radius : 8%;          /* 角丸       */
font-size     : 18pt;        /* 文字サイズ */
text-align    : center;      /* 文字位置   */
cursor        : pointer;     /* カーソル   */
padding       : 12px 12px;   /* 余白       */
background    : #000066;     /* 背景色     */
color         : #ffffff;     /* 文字色     */
line-height   : 1em;         /* 1行の高さ  */
transition    : .3s;         /* なめらか変化 */
border        : 1px solid #000066;    /* 枠の指定 */
`
