const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopolgy: true,
  })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  });

module.exports = app;
