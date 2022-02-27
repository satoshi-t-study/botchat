import * as React from 'react'
import styled from 'styled-components'
import {
  getMsg,
  chatStoreRecord,
} from '../indexeddb/chatStore'

const { useRef, useState, useEffect } = React
//メッセージ更新検知用変数
var mrmoryMemos = 0;
export const ChatView = () => {
  const [memos, setMemos] = useState<chatStoreRecord[]>([])
  const scrollBottomRef = useRef<HTMLDivElement>(null);
  const intervalCheckNewMessage = 300;
  useEffect(() => {
    const intervalId = setInterval(() => {
      getMsg().then(setMemos)
      //メッセージが更新された時のみ最新のメッセージまでスクロール
      if (memos.length != mrmoryMemos) {
        scrollBottomRef.current.scrollIntoView()
        mrmoryMemos = memos.length;
      }
    }, intervalCheckNewMessage);
    return () => {
      clearInterval(intervalId);
    };
  }, [memos])

  return (
    <>
      <Talk>
        {memos.map(memo =>
          //自分かAIかで表示するトークボックスを出し分け
          memo.isOwner ?
            //自分のトークボックス
            <MsgArea >
              <Image />
              <Kaiwa>
                <div >
                  <MemoText>{memo.text}</MemoText>
                </div>
              </Kaiwa>
            </MsgArea>
            :
            //AIのトークボックス
            <MsgArea>
              <Image_AI />
              <KaiwaAI >
                <div >
                  <MemoText>{memo.text}</MemoText>
                </div>
              </KaiwaAI>
            </MsgArea>
        )
        }
        {/* 自動で一番下までスクロールするdiv */}
        <div ref={scrollBottomRef} />
      </Talk>
    </>
  );
}
//トーク全体
const Talk = styled.div`
height:80vh;
position:relative;
top:5vh;
background: #7da4cd;
overflow-y: scroll;
`
//自分のアイコン
const Image = styled.div`
float: right;
width:35px;
height:35px;
vertical-align:text-top;
border-radius:50%;
background-size:cover;
background-image:url(images/icon_own.png);
`
//AIのアイコン
const Image_AI = styled.div`
float: left;
width:35px;
height:35px;
vertical-align:text-top;
border-radius:50%;
background-size:cover;
background-image:url(images/icon_ai.png);
`
//共通のメッセージボックス
const MsgArea = styled.div`
padding:3px;
overflow:auto;
`
//AIのトーク
const KaiwaAI = styled.div`
display:inline-block;
overflow-wrap break-all;
float: left;
position:relative;
background-color:white;
border-radius:10px;
padding:10px;
margin:0 0 0 10px;
`
//自分のトーク
const Kaiwa = styled.div`
display:inline-block;
overflow-wrap break-all;
float: right;
position:relative;
background: #30e852;
border-radius:10px;
padding:10px;
margin:0 10px 0 0;
`

//メッセージ（自動改行）
const MemoText = styled.div`
font-size: 0.9rem;
white-space: normal;
`
