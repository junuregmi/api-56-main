const chatRouter = require("express").Router()
const ChatMessageSend = require("../dto/chat.dto");
const checkLogin = require("../middlewares/auth.middleware")
const bodyValidator = require("../middlewares/validator.middleware")
const chatController = require("../controller/ChatController")

chatRouter.get("/list-users",checkLogin(), chatController.getUserList )
chatRouter.post('/send', checkLogin(), bodyValidator(ChatMessageSend), chatController.createChat)
chatRouter.get("/list-chat/:userId", checkLogin(), chatController.getChatDetail)
chatRouter.patch('/status-update/:chatId', checkLogin(), chatController.updateChatStatus)
module.exports = chatRouter;