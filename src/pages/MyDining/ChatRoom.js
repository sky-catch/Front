import React, { useEffect } from "react";
import { io } from "socket.io-client";
const ChatRoom = () => {
  // 웹 소켓 연결 이벤트
  // : "ws://15.164.89.177:8080/chat";

  useEffect(() => {
    // 소켓 서버의 주소에 맞게 변경
    // console.log(require("ws")); ws://15.164.89.177:8080/chat
    const socket = io("http://15.164.89.177:8080", {
      path: "/chat",
      transports: ["websocket"],
      upgrade: false,
      timeout: 30000,
      reconnectionAttempts: 5,
      reconnection: true,
      forceNew: true,
      rejectUnauthorized: false,
      autoConnect: true,
      extraHeaders: {
        Authorization:
          "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJlbWFpbCI6InN5a29yQGtha2FvLmNvbSIsImlzT3duZXIiOnRydWUsImlhdCI6MTcxMjA0NzA0NiwiZXhwIjoxNzEyMTMzNDQ2fQ.NRv7W4vKtnikTjLzFEhC7ybS86ORTis1TPgsm4R9P1KLl4gEzNCiXHOH_FNkHpGtuslTlazifTt7Zi4LrBqnXQ",
        chatRoomId: 6,
        memberChat: true,
      },
    }).on("connect_error", (error) => {
      console.error("Socket.io 연결 에러:", error);
    });
    socket.on("connect", () => {
      console.log("서버와 연결되었습니다.");
    });

    socket.on("disconnect", () => {
      console.log("서버와의 연결이 끊어졌습니다.");
    });

    socket.on("message", (data) => {
      console.log("서버로부터 메시지 수신:", data);
    });

    // 서버로 메시지 전송
    socket.emit("message", "안녕하세요, 서버!");

    // GetChatRoom()
    //   .then((res) => {
    //     console.log("res", res);
    //   })
    //   .catch((error) => {
    //     console.log("error", error);

    // socket.onclose = (event) => console.log(`Closed ${event.code}`);

    // GetChatRoomListRes()
    //   .then((res) => {
    //     console.log("res", res);
    //   })
    //   .catch(() => {
    //     console.log();

    //   });
  }, []);

  return (
    <div>
      ChatRoom
      <form name="publish">
        <input type="text" name="message" maxLength="50" />
        <input
          type="submit"
          value="Send"
          onClick={(e) => {
            e.preventDefault();
            // 클라이언트에서 서버로 메시지 발신
            // socket.emit("message", "안녕하세요!");
            // socket.emit("message", "안녕하세요!");
          }}
        />
      </form>
      <div id="messages"></div>
    </div>
  );
};

export default ChatRoom;
