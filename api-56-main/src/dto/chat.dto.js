const Joi = require("joi");

const ChatMessageSend = Joi.object({
  receiver: Joi.string().required(),
  message: Joi.string().min(1).max(5000).required(),
  // image: Joi.string().allow(null,'').optional().default(null)
})

module.exports = ChatMessageSend