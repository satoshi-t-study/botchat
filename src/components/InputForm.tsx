import * as React from 'react'
import { useStateWithStorage } from '../hooks/use_state_with_storage'
import styled from 'styled-components'
import { putMsg } from '../indexeddb/chatStore'

const StorageKey = 'pages/chat:text'

export const InputForm = (props) => {
  const [message, setMessage] = useStateWithStorage('', StorageKey);
  const handleSubmit = (event) => {
    //ページリロードを防ぐ
    event.preventDefault();

    //メッセージが入力されていたら登録
    if (message.length > 0) {
      props.setValue(message)
      putMsg("自分", message, true, false)
      setMessage('');
    }
  };

  return (
    <>
      <TextArea
        onChange={(event) => setMessage(event.target.value)}
        value={message} />
      <form onSubmit={handleSubmit}>
        <SendButton>
          送信
        </SendButton>
      </form>
    </>
  );
}
//入力ボックス
const TextArea = styled.textarea`
resize: none;
border: 1px solid black;
bottom: 2vh;
left: 2vh;
font-size: 1rem;
padding: 0.5rem;
position: absolute;
height: 32px;
width: 70%;
`

//送信ボタン
const SendButton = styled.button`
position:absolute;
bottom: 2vh;
right: 4vh;
border-radius: 8%; 
font-size: 12pt; 
text-align: center;
padding: 12px 12px;
background: #000066;
color: #ffffff; 
line-height: 0.5em;
`
