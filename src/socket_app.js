const http = require("http");
const express = require("express");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // 모든 출처를 허용합니다. 필요에 따라 제한할 수 있습니다.
    methods: ["GET", "POST"],
  },
  path: "/chat", // 경로 설정
});

// 정적 파일 서빙
app.use(express.static("public"));

// Socket.IO 설정
io.on("connection", (socket) => {
  console.log("A user connected");

  // 클라이언트로부터 받은 메시지를 다시 클라이언트로 전송
  socket.on("message", (message) => {
    console.log("Received message:", message);
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
