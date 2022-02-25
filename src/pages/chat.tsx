import { ChatView } from '../components/ChatView';
import * as React from 'react'
import styled from 'styled-components'
import { useStateWithStorage } from '../hooks/use_state_with_storage'
import { InputForm } from '../components/InputForm';
import { putMsg } from '../indexeddb/chatStore'
import { updateMsg } from '../indexeddb/chatStore'
import axios from 'axios';
import {
  getNotProcessedMsg,
  chatStoreRecord,
} from '../indexeddb/chatStore'
const AwaitAnswer = 'botchat_awaitAnswer:text'
const StorageKeyChatView = 'components/ChatView:text'
const StorageKey = 'pages/chat:text'

const { useState, useEffect } = React

export const Editor: React.FC = () => {
  const [msg, setValue] = useStateWithStorage('', StorageKey);
  const [newMsg, setMemos] = useState<chatStoreRecord[]>([])
  // const getNow = () => (new Date()).toISOString()
  // const [now, setNow] = useState(getNow())
  const NOBY_API = "https://app.cotogoto.ai/webapi/noby.json";
  const NOBY_KEY = "048503e13e7451314d85dc068c4b0c51";
  const [awaitAnswer, setAwaitAnswer] = useStateWithStorage('', AwaitAnswer);
  const [msgAI, setChat] = useStateWithStorage('', StorageKeyChatView);
  const intervalGetNotProcessedMsg = 5000;
  const intervalGetResponse = 5000;

  //indexedDBから未処理データを取得
  useEffect(() => {

    const intervalId = setInterval(() => {

    }, intervalGetNotProcessedMsg);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  //未処理データがあればAPIへ投げてレスポンスを処理する
  useEffect(() => {
    const intervalId = setInterval(() => {
      getNotProcessedMsg().then(
        (getObj) => {
          if (getObj != null) {
            const parseJson = JSON.stringify(getObj)
            console.log(getObj)
            console.log(parseJson)
            console.log(parseJson['text'])
            setMemos(getObj)
            //console.log(newMsg.text);
            console.log("でーた取得");

            if (getObj['text'] != null) {
              console.log("API接続中");
              const params = {
                params: {
                  "text": getObj['text'],
                  "appkey": NOBY_KEY,
                  "persona": 0,
                  "study": 1
                }
              };

              // NobyAPIへ送信するデータ
              axios.get(NOBY_API, params).then(res => {// NobyAPIへ送信
                console.log(res)
                if (res.data.text != "") {
                  console.log(res.data.text)
                  setChat(res.data.text)
                  putMsg("AI", res.data.text, false, true)
                  //未処理データのフラグを処理済みにする
                  updateMsg(getObj['name'], getObj['text'], getObj['isOwner'], true, getObj['datetime'])
                  setAwaitAnswer('')
                  setChat('')
                } else {
                  console.log("AIの応答がありません");
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              //  console.log("返信待ちmsg（awaitAnswer）が空です");
            }
          } else {
            console.log("でーた取得できないか、ありません");
          }
        }
      ).catch(err => {
        console.log(err);
      });
    }, intervalGetResponse);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <Header>
        bot chat
      </Header>
      <Wrapper>
        <div>
          <ChatView />
          <InputForm setValue={setValue} />
        </div>
      </Wrapper>
    </>
  )
}

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
  top: 2rem;
`
