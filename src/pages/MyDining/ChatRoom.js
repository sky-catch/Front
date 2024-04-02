import React, { useEffect } from "react";

import { io } from "socket.io-client";

const ChatRoom = () => {
  // 웹 소켓 연결 이벤트
  // : "ws://15.164.89.177:8080/chat";

  useEffect(() => {
    // 소켓 서버의 주소에 맞게 변경

    const socket = io("ws://15.164.89.177:8080/chat", {
      // path: "/chat",
      transports: ["websocket"],
      upgrade: false,
      forceNew: true,
      rejectUnauthorized: false,
      autoConnect: false,
      extraHeaders: {
        authorization:
          "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFM1MTIifQ.eyJlbWFpbCI6InN5a29yQGtha2FvLmNvbSIsImlzT3duZXIiOnRydWUsImlhdCI6MTcxMjA0NzA0NiwiZXhwIjoxNzEyMTMzNDQ2fQ.NRv7W4vKtnikTjLzFEhC7ybS86ORTis1TPgsm4R9P1KLl4gEzNCiXHOH_FNkHpGtuslTlazifTt7Zi4LrBqnXQ",
        chatroomid: 6,
        memberchat: true,
      },
    }).on("connect_error", (error) => {
      console.error("Socket.io 연결 에러:", error);
    });
    // socket.connect();
    // console.log("안녕", soc/ket);
    // console.log(socket.connected);
    socket.on("connect", () => {
      console.log("서버와 연결되었습니다.");

      // 서버에 메시지 전송 예시
      // socket.emit("message", "안녕하세요, 서버!");
    });
    socket.on("reconnect", (attempt) => {
      console.log("서버와 연결되었습니다.");
    });
    // 서버와의 연결이 끊겼을 때 처리
    socket.on("disconnect", () => {
      console.log("서버와의 연결이 끊어졌습니다.");
    });
    // 클라이언트에서 서버로 메시지 발신
    // socket.emit("chatList", "안녕하세요!");

    // 클라이언트에서 서버로부터 메시지 수신
    // socket.on("news", (data) => {
    //   console.log("서버로부터 메시지 수신:", data);
    // });

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
