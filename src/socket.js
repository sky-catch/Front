/**
Before running:
> npm install ws
Then:
> node server.js
> open http://localhost:8080 in the browser
*/
// const http = require("http");
// const fs = require("fs");
// const ws = new require("ws");
// const wss = new ws.Server({ noServer: true });

// const clients = new Set();

// function accept(req, res) {
//   if (
//     req.url == "/ws" &&
//     req.headers.upgrade &&
//     req.headers.upgrade.toLowerCase() == "websocket" &&
//     // can be Connection: keep-alive, Upgrade
//     req.headers.connection.match(/\bupgrade\b/i)
//   ) {
//     wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
//   } else if (req.url == "/") {
//     // index.html
//     fs.createReadStream("./index.html").pipe(res);
//   } else {
//     // page not found
//     res.writeHead(404);
//     res.end();
//   }
// }

// function onSocketConnect(ws) {
//   clients.add(ws);
//   log(`new connection`);

//   ws.on("message", function (message) {
//     log(`message received: ${message}`);
//     message = message.slice(0, 50); // max message length will be 50
//     for (let client of clients) {
//       // client.send(message);
//     }
//   });

//   ws.on("close", function () {
//     log(`connection closed`);
//     clients.delete(ws);
//   });
// }

// let log;
// if (!module.parent) {
//   log = console.log;
//   http.createServer(accept).listen(8080);
// } else {
//   // to embed into javascript.info
//   log = function () {};
//   // log = console.log;
//   exports.accept = accept;
// }

// import { io } from "socket.io-client";

// export default {
//   data() {
//     return {
//       socket: null,
//       message: "",
//       receivedMessage: [],
//     };
//   },
//   async created() {
//     // 소켓 서버와 연결한다.
//     // 여기서 서버에서 지정해놓은 io.on('connection') 이벤트가 실행된다.
//     // 그리고 생성된 소켓을 반환한다.
//     this.socket = io("http://localhost:8000");

//     this.socket.on("connect", () => {
//       // 여기서 소켓이 생성되고 반환될 때에 코드를 적는다.
//     });

//     this.socket.on("messages", (messages) => {
//       // 커스텀 이벤트
//       this.receivedMessage = messages;
//     });
//   },
//   methods: {
//     sendMessage() {
//       // 소켓을 통해 서버로 메세지를 보낸다.
//       this.socket.emit("send", this.message);
//       this.message = "";
//     },
//   },
// };
// const app = require("express")();
// const server = require("http").createServer(app);
// const cors = require("cors");
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//     credentials: true,
//   },
// });

// io.on("connection", (socket) => {
//   socket.on("message", ({ name, message }) => {
//     io.emit("message", { name, message });
//   });
// });

// server.listen(4000, function () {
//   console.log("listening on port 4000");
// });
