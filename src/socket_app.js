const express = require("express");
const app = express();
const WebSocket = require("ws");

// 정적 파일 제공
app.use(express.static(__dirname));

// HTTP 서버 실행
const server = app.listen(8080, () => {
  console.log("HTTP 서버가 8080 포트에서 실행 중입니다.");
});

// WebSocket 서버 실행
const socket = new WebSocket.Server({ server });
// console.log(socket);
// socket.on('connection')
socket.on("connection", (ws, req) => {
  console.log("웹소켓 클라이언트가 연결되었습니다.");

  ws.on("message", (message) => {
    const data = JSON.parse(message);
    if (data.authorization && data.chatRoomId && data.memberChat) {
      // Handle the initial authentication message
      console.log("인증 데이터 수신:", data);
    } else {
      console.log("메시지를 받았습니다:", message);
      ws.send("메시지를 받았습니다.");
    }
  });

  ws.on("close", () => {
    console.log("웹소켓 연결이 닫혔습니다.");
  });

  ws.on("error", (error) => {
    console.error("웹소켓 오류:", error);
  });
});
