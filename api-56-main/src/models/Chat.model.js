const mongoose = require("mongoose")

const ChatSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // for group chat, receiver is optional
  receiver: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // roomId: 
  message: {
    type: String, 
    required: true, 
    min: 1, 
    max: 5000,
    index: true
  },
  // image
  isSeen: Boolean, 
  reaction: String 
}, {
  timestamps: true, 
  autoCreate: true, 
  autoIndex: true
});

const ChatModel = mongoose.model("Chat", ChatSchema)
module.exports = ChatModel;