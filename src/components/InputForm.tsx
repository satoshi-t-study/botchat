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

    if (message.length > 0) {
      //console.log(name);
      props.setValue(message)
      putMsg("自分", message, true, false)
      // setAwaitAnswer(message);
      setMessage('');
    } else {
      //error
      console.error("メッセージを入力してください")
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
//入力ボックス
const TextArea = styled.textarea`
  resize: none;
  border: 1px solid black;
  bottom: 2vh;
  left: 2vh;
  font-size: 1rem;
  padding: 1rem;
  position: absolute;
  height: 10%;
  width: 50%;
`
//送信ボタン
const SendButton = styled.button`
position:absolute;
		bottom: 2vh;
		right: 4vh;
border-radius : 8%; 
font-size     : 12pt; 
text-align    : center;
padding       : 12px 12px;
background    : #000066;
color         : #ffffff; 
line-height   : 1em;
border        : 1px solid #000066; 
`
