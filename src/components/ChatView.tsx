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
    getMsg().then(setMemos)
  }, [])

  return (
    <>
      <DisplayMsgArea>
        <div>
          {memos.map(memo =>
            memo.isOwner ?
              <Kaiwa key={memo.datetime}>
                <div >
                  <MemoTitle>{memo.name}</MemoTitle>
                  <MemoText>{memo.text}</MemoText>
                </div>
              </Kaiwa>
              :
              <KaiwaAI key={memo.datetime}>
                <div >
                  <MemoTitle>{memo.name}</MemoTitle>
                  <MemoText>{memo.text}</MemoText>
                </div>
              </KaiwaAI>
          )
          }
        </div>
      </DisplayMsgArea>
    </>
  );
}

const DisplayMsgArea = styled.div`
padding: 20px 10px;
margin: 15px auto;
text-align: right;
background: #7da4cd;
  bottom: 30%;
  overflow-y: scroll;
  font-size: 1rem;
  left: 0;
  padding: 0.5rem;
  position: absolute;
  top: 0;
  width: 100%;
`
const KaiwaAI = styled.div`
text-align: left;
float: left;
display: inline-block;
position: relative; 
margin: 0 0 0 10px;
padding: 10px;
max-width: 600px;
border-radius: 12px;
background: #edf1ee;
`

const Kaiwa = styled.div`
display: inline-block;
float: right;
position: relative; 
margin: 0 10px 0 0;
padding: 8px;
max-width: 600px;
border-radius: 12px;
background: #30e852;
font-size: 15px:
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
