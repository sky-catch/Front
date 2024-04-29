const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server);
const url = require("url");
const cors = require("cors");

console.log(url.URLSearchParams());
const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions), function () {
  console.log("안녕");
});

app.use(express.static(path.join(__dirname, "public")));
io.on("connection", () => {});
const PORT = process.env.PORT || 5000;
console.log(`포스트`);
server.listen(PORT, () => {
  console.log(`서버 진행 ${PORT}`);
});
