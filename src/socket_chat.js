const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    chat: String,
    user: {
      id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      name: String,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.module("Chat", userSchema);
