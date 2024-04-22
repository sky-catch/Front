const { createServer } = require("http");
const app = require("./socket_app");
const { Server } = require("socket.io");
const httpServer = createServer(app);
require("dotenv").config();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

httpServer.listen(process.env.POST, () => {
  console.log("서버 소프트", process.env.POST);
});

require("./socket_io")(io);
