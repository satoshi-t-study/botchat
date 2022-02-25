import * as React from 'react'
import styled from 'styled-components'
import {
  getMsg,
  chatStoreRecord,
} from '../indexeddb/chatStore'

const { useState, useEffect } = React
export const ChatView = () => {
  const [memos, setMemos] = useState<chatStoreRecord[]>([])
  //console.log(memos)

  useEffect(() => {
    const intervalId = setInterval(() => {
      getMsg().then(setMemos)
    }, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, [])

  return (
    <>
      <Talk>
        <div>
          {memos.map(memo =>
            //自分かAIかで表示するトークボックスを出し分け
            memo.isOwner ?
              //自分のトークボックス
              <MsgArea>
                <Image><p></p>
                </Image>
                <Kaiwa key={memo.datetime}>
                  <div >
                    <MemoTitle>{memo.name}</MemoTitle>
                    <MemoText>{memo.text}</MemoText>
                  </div>
                </Kaiwa>
              </MsgArea>
              :
              //AIのトークボックス
              <MsgArea>
                <Image_AI><p></p>
                </Image_AI>
                <KaiwaAI key={memo.datetime}>
                  <div >
                    <MemoTitle>{memo.name}</MemoTitle>
                    <MemoText>{memo.text}</MemoText>
                  </div>
                </KaiwaAI>
              </MsgArea>
          )
          }
        </div>
      </Talk>
    </>
  );
}
const Talk = styled.div`
width: 100%;
height:75vh;
position:relative;
 top:5vh;
  overflow-y: scroll;
`
const Image = styled.p`
	content:'';
	display:inline-block;
	width:50px;
	height:50px;
	vertical-align:top;
	border-radius:50%;
	background-size:cover;
	background-position:-10px;
  background-image:url(../images/icon_own.png);  /* ←アイコンはここを変更 */
`
const Image_AI = styled.p`
content:'';
display:inline-block;
width:50px;
height:50px;
vertical-align:top;
border-radius:50%;
background-size:cover;
background-image:url(../images/icon_ai.png); /* ←アイコンはここを変更 */
`

const MsgArea = styled.div`
padding:1em;
overflow:auto;
background: #7da4cd;
`
const KaiwaAI = styled.div`
display:inline-block;
float: left;
	position:relative;
	background-color:white;
	border-radius:10px;
	padding:10px;
	margin:0 0 0 10px;
`

const Kaiwa = styled.div`
display:inline-block;
float: right;
	position:relative;
  background: #30e852;
	border-radius:10px;
	padding:10px;
	margin:0 10px 0 0;
`
const MemoTitle = styled.div`
font-size: 1rem;
margin-bottom: 0.5rem;
`

const MemoText = styled.div`
font-size: 0.85rem;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
`
