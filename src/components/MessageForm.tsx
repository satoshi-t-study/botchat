import * as React from 'react'
import { useStateWithStorage } from '../hooks/use_state_with_storage'
const StorageKey = 'pages/editor:text'
import styled from 'styled-components'

const TextArea = styled.textarea`
  resize: none;
  border: 1px solid black;
  border-radius :10%;          /* 角丸       */
  bottom: 10px;
  left: 10px;
  font-size: 1rem;
  padding: 1rem;
  position: absolute;
  height: 20%;
  width: 90%;
`
const SendButton = styled.button`
position:absolute;
		bottom: 10px;
		right: 10px;
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

export const InputForm = () => {
  const [message, setMessage] = useStateWithStorage('', StorageKey);
  console.log(message);
  // const handleChange = (event) => {
  //   switch (event.target.name) {
  //     // case 'name':
  //     //   setName(event.target.value);
  //     //   break;
  //     case 'message':
  //       setMessage(event.target.value);
  //       break;
  //     default:
  //       console.log('key not found');
  //   }
  // };


  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(name);
    console.log(JSON.stringify(message));
    console.log(message);
    setMessage('');
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
