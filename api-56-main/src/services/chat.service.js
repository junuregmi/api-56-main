const ChatModel = require("../models/Chat.model")

class ChatService {
  async store(data) {
    try {
      const chat = new ChatModel(data)
      return await chat.save()
    }catch(exception){
      throw exception
    }
  }

  async updateSingleRowByFilter(filter, updateBody) {
    try {
      const update = await ChatModel.findOneAndUpdate(filter, {$set: updateBody}, {new: true})
      return update;
    } catch(exception) {
      throw exception
    }
  }

  async updateAllRowsByFilter(filter, data) {
    try {
      const update = await ChatModel.updateMany(
        filter,
        { $set: data }
      );
      return update;
    } catch(exception) {
      throw exception
    }
  }

  async getSingleRowByFilter(filter, ) {
    try {
      const data = await ChatModel.findOne(filter)
        .populate("sender", ["name","email","role","address","phone","image","status","_id"])
        .populate("receiver", ["name","email","role","address","phone","image","status","_id"])
      return data
    } catch(exception) {
      throw exception
    }
  }
  
  async getAllRowsByFilter(filter, config) {
    try {
      const skip = (config.page - 1) * config.limit; 
      const data = await ChatModel.find(filter)
        .populate("sender", ["name","email","role","address","phone","image","status","_id"])
        .populate("receiver", ["name","email","role","address","phone","image","status","_id"])
        .sort({"createdAt": "desc"})
        .skip(skip)
        .limit(config.limit)
      const total = await ChatModel.countDocuments(filter)
      return {
        data: data.reverse(), 
        pagination: {
          page: config.page,
          limit: config.limit,
          total: +total,
          noOfPages: Math.ceil(total / config.limit),
        },
      }
    } catch(exception) {
      throw exception
    }
  }
}

module.exports = new ChatService();