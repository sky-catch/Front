// const express = require("express");
// const app = express();
// const WebSocket = require("ws");

// app.use("/", function (req, res) {
//   console.log("안녕");
//   res.sendFile(__dirname + "/index.html");
// });

// const server = app.listen(8080, () => {
//   console.log("HTTP 서버가 8080 포트에서 실행 중입니다.");
// });

// const socket = new WebSocket.Server({ server });

// socket.on("connection", (ws, req) => {
//   console.log("웹소켓 클라이언트가 연결되었습니다.");

//   ws.on("message", (message) => {
//     console.log("메시지를 받았습니다:", message);
//     // ws.send("메시지를 받았습니다.");
//   });
// });
