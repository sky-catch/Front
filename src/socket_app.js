const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer();
const io = socketIo(server);

// Socket.IO 설정
io.on("connection", (socket) => {
  console.log("A user connected");

  // 클라이언트로부터 받은 메시지를 다시 클라이언트로 전송
  socket.on("message", (message) => {
    console.log("Received message:", message);
    // 클라이언트에게 메시지 전송
    io.emit("message", message);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
