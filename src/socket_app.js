const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.use((socket, next) => {
  const token = socket.handshake.headers["authorization"];
  const query = socket.handshake.query;
  // if (isValidToken(token)) {
  socket.userData = query; // 쿼리 파라미터를 저장
  next();
  // } else {
  next(new Error("Unauthorized"));
  // }
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.userData);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", { user: socket.userData.name, msg });
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
