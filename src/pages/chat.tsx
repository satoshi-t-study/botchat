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
  const NOBY_API = "https://app.cotogoto.ai/webapi/noby.json";
  const NOBY_KEY = "048503e13e7451314d85dc068c4b0c51";
  const [awaitAnswer, setAwaitAnswer] = useStateWithStorage('', AwaitAnswer);
  const [msgAI, setChat] = useStateWithStorage('', StorageKeyChatView);
  const intervalGetResponse = 5000;

  //未処理データがあればAPIへ投げてレスポンスを処理する
  useEffect(() => {
    const intervalId = setInterval(() => {
      //indexedDBから未処理データを取得
      getNotProcessedMsg().then(
        (getObj) => {
          if (getObj != null) {
            //   const parseJson = JSON.stringify(getObj)
            console.log(getObj)
            // console.log(parseJson)
            //  console.log(parseJson['text'])
            setMemos(getObj)
            //console.log(newMsg.text);
            console.log("でーた取得");

            if (getObj['text'] != null) {
              console.log("API接続中" + getObj['text']);
              /**
               * NobyAPIへ送信するパラメータ
               * 
               * 送信message
               * APIkey
               * 人格
               * 学習有無
               */
              const params = {
                params: {
                  "text": getObj['text'],
                  "appkey": NOBY_KEY,
                  "persona": 0,//普通
                  "study": 1//学習あり
                }
              };

              // NobyAPIへデータを送信
              axios.get(NOBY_API, params).then(res => {// NobyAPIへ送信
                console.log(res)
                if (res.data.text != "") {
                  console.log(res.data.text)
                  setChat(res.data.text)
                  //AIのレスポンスを登録
                  putMsg("AI", res.data.text, false, true)
                  //未処理データのフラグを処理済みに更新
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
