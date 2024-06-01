const express = require("express");
const app = express();
const WebSocket = require("ws");

app.use("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

const server = app.listen(8080, () => {
  console.log("HTTP 서버가 8080 포트에서 실행 중입니다.");
});
const socketServer = new WebSocket.Server({ noServer: true });

socketServer.on("connection", (ws, req) => {
  const protocol = req.headers["sec-websocket-protocol"];
  const headers = JSON.parse(protocol);

  const token = headers.authorization;
  const chatRoomId = headers.chatRoomId;
  const memberChat = headers.memberChat;

  console.log("웹소켓 클라이언트가 연결되었습니다.");

  ws.on("message", (message) => {
    const parsedMessage = JSON.parse(message);
    console.log("메시지를 받았습니다:", parsedMessage);

    // 여기에 토큰 인증 로직을 추가할 수 있습니다.
    if (token) {
      // 예시: 토큰 인증 로직
      console.log("인증된 토큰:", token);
      ws.send("메시지를 받았습니다.");
    } else {
      console.log("인증 실패");
      ws.send("인증 실패");
    }
  });
});

server.on("upgrade", (request, socket, head) => {
  socketServer.handleUpgrade(request, socket, head, (ws) => {
    socketServer.emit("connection", ws, request);
  });
});
