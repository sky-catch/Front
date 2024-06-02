const express = require("express");
const socketIo = require("socket.io");
const fetch = require("node-fetch");

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

// 프록시 엔드포인트 추가
app.get("/proxy", async (req, res) => {
  const url = req.query.url;
  console.log("url", url);
  try {
    const response = await fetch(url);
    const buffer = await response.buffer();
    res.set("Content-Type", response.headers.get("content-type"));
    res.send(buffer);
  } catch (error) {
    console.error("Error fetching the URL:", error);
    res.status(500).send("Error fetching the URL");
  }
});

// Socket.IO 설정
io.on("connection", (socket) => {
  console.log("A user connected");

  // 클라이언트로부터 받은 메시지를 다시 클라이언트로 전송
  socket.on("message", (message) => {
    console.log("Received message:", message);
    io.emit("message", message);

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

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// 포트 설정
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on("upgrade", (request, socket, head) => {
  socketServer.handleUpgrade(request, socket, head, (ws) => {
    socketServer.emit("connection", ws, request);
  });
});
