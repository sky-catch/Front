const http = require("http");
const express = require("express");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
// const io = socketIo("http://15.164.89.177:8080");

// Socket.IO 설정
io.on("connection", (socket) => {
  console.log("A user connected");

  // 클라이언트로부터 받은 메시지를 다시 클라이언트로 전송
  socket.on("message", (message) => {
    console.log("Received message:", message);
    io.emit("message", message);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  // console.log("io", io);
  console.log(`Server is running on port ${PORT}`);
});
