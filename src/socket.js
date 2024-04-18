// 서버 파일 (예: socket.js)
const { create } = require("domain");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);

const io = socketIo(server);
console.log(http);
// 클라이언트가 연결되었을 때의 이벤트 리스너
io.on("connection", (socket) => {
  console.log("클라이언트가 연결되었습니다.");

  // 클라이언트로부터 메시지를 받았을 때의 이벤트 리스너
  socket.on("message", (data) => {
    console.log("클라이언트로부터 메시지:", data);

    // 클라이언트에게 메시지를 전송
    io.emit("message", "서버에서 클라이언트로 메시지를 전송합니다.");
  });

  // 연결 종료 시의 이벤트 리스너
  socket.on("disconnect", () => {
    console.log("클라이언트 연결이 종료되었습니다.");
  });
});

// 클라이언트에 대한 경로 핸들러 설정
// app.use("/chat", (req, res) => {
//   // 클라이언트로부터의 요청을 처리할 코드 작성
//   // 예를 들어, 클라이언트에게 HTML 파일을 제공하거나 기타 작업을 수행할 수 있습니다.
// });

app.get("/chat", (req, res) => {
  // 클라이언트로부터의 요청을 처리할 코드 작성
  // 예를 들어, 클라이언트에게 HTML 파일을 제공하거나 기타 작업을 수행할 수 있습니다.
});
// 서버를 시작
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 시작되었습니다.`);
});
