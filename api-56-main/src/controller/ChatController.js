const chatService = require("../services/chat.service");
const userService = require("../services/user.service");

class ChatController{
  async createChat(req, res, next) {
    try {
      const data = req.body; 
      data.sender = req.loggedInUser._id; 
      // file upload 
        // data.image = await cloudinarySvc.uploadSinglefile(req.file.path, '/chats')
      data.isSeen = false; 
      data.reaction = null;

      const chat = await chatService.store(data)

      res.json({
        data: chat, 
        message: "Chat message sent",
        status: "OK"
      })


    } catch(exception) {
      next(exception)
    }
  }

  async getUserList(req, res, next) {
    try {
      let filter = {};
      if(req.query.q) {
        filter = {
          $or: [
            { name: new RegExp(req.query.q, "i") },
            { email: new RegExp(req.query.q, "i") },
            { phone: new RegExp(req.query.q, "i") },
          ],
        };
      }
      const config = {
        page: +req.query.page || 1,
        limit: +req.query.limit || 20
      }
      const {data, pagination} = await userService.getAllRowsByFilter(filter, config);
      res.json({
        data: data, 
        message: "User Lists",
        status: "OK",
        meta: {
          pagination
        }
      })
    } catch(exception) {
      next(exception)
    }
  }

  async getChatDetail(req, res, next) {
    try {
      // let filter = {}
      const loggedInUser = req.loggedInUser;
      const userId = req.params.userId; 

      let filter = {
        $or: [
          { sender: loggedInUser._id, receiver: userId },
          { sender: userId, receiver: loggedInUser._id }
        ]
      }

      const config = {
        page: +req.query.page || 1, 
        limit: +req.query.limit || 50
      }
      await chatService.updateAllRowsByFilter(filter, {isSeen: true})
      const {data, pagination} = await chatService.getAllRowsByFilter(filter, config);
      res.json({
        data: data, 
        message: "Chat Detail",
        status: "OK",
        meta: {
          pagination
        }
      })
    } catch(exception) {
      next(exception)
    }
  }

  async updateChatStatus(req, res, next) {
    try {
      const chatId = req.params.chatId; 
      const loggedInUser = req.loggedInUser; 
      const data = req.body; 

      const chatDetail = await chatService.getSingleRowByFilter({
        $or: [
          {sender: loggedInUser._id},
          {receiver: loggedInUser._id}
        ],
        _id: chatId
      })
      if(!chatDetail) {
        throw {code: 403, message: "You cannot react to other's message", status: "NOT_YOUR_MESSAGE_ERR"}
      }
      let updateData = { isSeen: true };
      if(data && data.reaction) {
        updateData = {
          ...updateData,
          reaction: data.reaction
        }
      }

      const updated = await chatService.updateSingleRowByFilter({
        _id: chatDetail._id
      }, updateData)
      res.json({
        data: updated, 
        message: "Your chat status has been updated",
        status: "OK",
      })
    } catch(exception) {
      next(exception)
    }
  }
}

module.exports = new ChatController()