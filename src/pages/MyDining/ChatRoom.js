import React, { useEffect, useState } from "react";
import { GetChatRoomListRes } from "../../respository/reservation";
function showMessage(message) {
  // let messageElem = document.createElement("div");
  // messageElem.textContent = message;
  // console.log("   messageElem.textContent", message);
  // document.getElementById("messages").prepend(messageElem);
}
const ChatRoom = () => {
  const [ws, setWS] = useState(null);
  const [messages, setMessages] = useState([]);
  const protocols = {
    chatRoomId: 2,
    Authorization:
      "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJlbWFpbCI6InN5a29yQGtha2FvLmNvbSIsImlzT3duZXIiOnRydWUsImlhdCI6MTcxMTYzNDY4NiwiZXhwIjoxNzExNzIxMDg2fQ.fNg3gJxzEADL7aBZbuR8CIqnaUI0XZXp4ndwuzpcKoh0XUL4wuLTO7fkNXLozVA3qscGuRh0xA9eSiiPAVvayw",
    memberChat: true,
  };

  const protocols2 = [
    "6",
    "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJlbWFpbCI6InN5a29yQGtha2FvLmNvbSIsImlzT3duZXIiOnRydWUsImlhdCI6MTcxMTYzNDY4NiwiZXhwIjoxNzExNzIxMDg2fQ.fNg3gJxzEADL7aBZbuR8CIqnaUI0XZXp4ndwuzpcKoh0XUL4wuLTO7fkNXLozVA3qscGuRh0xA9eSiiPAVvayw",
    "true",
  ];
  // 웹 소켓 연결 이벤트

  useEffect(() => {
    console.log(window.location);
    let url =
      window.location.host == "skycatch.kro.kr"
        ? "ws://15.164.89.177:8080/chat"
        : window.location.host == "javascript.local"
        ? `ws://javascript.local/article/websocket/chat/ws` // dev integration with local site
        : `wss://javascript.info/article/websocket/chat/ws`; // prod integration with javascript.info

    let socket = new WebSocket(url);

    // send message from the form
    document.forms.publish.onsubmit = function () {
      let outgoingMessage = this.message.value;
      socket.send(outgoingMessage);
      return false;
    };

    // handle incoming messages
    socket.onmessage = function (event) {
      let incomingMessage = event.data;
      console.log(event);
      showMessage(incomingMessage);
    };

    socket.onclose = (event) => console.log(`Closed ${event.code}`);

    GetChatRoomListRes()
      .then((res) => {
        console.log("res", res);
      })
      .catch(() => {
        console.log();
      });
  }, []);

  return (
    <div>
      ChatRoom
      <form name="publish">
        <input type="text" name="message" maxLength="50" />
        <input type="submit" value="Send" onClick={() => {}} />
      </form>
      <div id="messages"></div>
    </div>
  );
};

export default ChatRoom;
