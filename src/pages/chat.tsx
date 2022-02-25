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
const StorageKey = 'pages/chat:text'

const { useEffect } = React

export const Editor: React.FC = () => {
  const [msg, setValue] = useStateWithStorage('', StorageKey);
  const NOBY_API = "https://app.cotogoto.ai/webapi/noby.json";
  const NOBY_KEY = "048503e13e7451314d85dc068c4b0c51";
  const intervalGetResponse = 5000;

  /**
 * NobyAPIへ送信するパラメータ
 * 
 * 送信message
 * APIkey
 * 人格
 * 学習有無
 */
  //未処理データがあればAPIへ投げてレスポンスを処理する
  useEffect(() => {
    const intervalId = setInterval(() => {
      //indexedDBから未処理データを取得
      getNotProcessedMsg().then(
        (getObj) => {
          if (getObj != null) {

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
              if (res.data.text != "") {
                //AIのレスポンスを登録
                putMsg("AI", res.data.text, false, true)
                //未処理データのフラグを処理済みに更新
                updateMsg(getObj['name'], getObj['text'], getObj['isOwner'], true, getObj['datetime'])
              } else {
                console.error("AIの応答がありません");
              }
            }).catch(e => {
              console.error(e);
            });
          } else {
            //処理対象のレコードが存在しない
            console.log("No record");
          }
        }
      ).catch(e => {
        console.error(e);
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
      <ChatView />
      <InputForm setValue={setValue} />
    </>
  )
}

//ヘッダー
const Header = styled.header`
  font-size: 1.5rem;
  height: 1vh;
  left: 1vh;
  line-height: 2rem;
  padding: 0.5rem 1rem;
  position: relative;
  left: 5px;
  top: 0px;
`
