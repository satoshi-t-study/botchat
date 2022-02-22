// import axios from '../axios';

// export const View = () => {
//   const NOBY_API = "https://app.cotogoto.ai/webapi/noby.json";
//   const NOBY_KEY = "048503e13e7451314d85dc068c4b0c51";


//   const addToChat = (str) => {
//     const elem = document.createElement("li");
//     elem.innerHTML = str;
//     document.getElementById("myChat").appendChild(elem);
//   }

//   return (
//     // ボタンのクリックイベント
//     document.getElementById("myBtn").onclick = () => {
//       console.log("押された");
//       const text = document.getElementById("myText").value;// 入力フォームから文字列
//       // チャットに追加
//       addToChat("You:" + text);// チャットに追加
//       const params = {
//         params: {
//           "text": "hello",
//           "appkey": NOBY_KEY,
//           "persona": 0,
//           "study": 1
//         }
//       };// NobyAPIへ送信するデータ

//       axios.get(NOBY_API, params).then(res => {// NobyAPIへ送信
//         // チャットに追加
//         addToChat("男:" + res.data.text);// チャットに追加
//       }).catch(err => {
//         console.log(err);
//       });
//     }
//   );
// };
