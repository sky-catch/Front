import React from "react";
import { GetChatRoom } from "../../respository/reservation";
const ChatRoom = () => {
  // server
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

  const webSocket = new WebSocket("ws://15.164.89.177:8080/chat");
  // 웹 소켓 연결 이벤트

  webSocket.onopen = function (ws, req) {
    alert("웹소켓 서버와 연결에 성공했습니다.");
    // console.log(webSocket);

    GetChatRoom(protocols)
      .then((res) => {
        console.log("res", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 웹 소켓 메세지 수신
  webSocket.onmessage = function (event) {
    // alert(event.data);
    console.log("onmessage", event.data);
  };

  // 오류 발생
  webSocket.onerror = function (error) {
    console.log("error", error);
  };

  return (
    <div>
      ChatRoom
      <button
        value={"메세지 전송"}
        onClick={(e) => {
          const message = e.target.value;
          // webSocket.onopen = (event) => {
          // webSocket.send(message);

          // };
        }}
      >
        전송
      </button>
    </div>
  );
};

export default ChatRoom;
