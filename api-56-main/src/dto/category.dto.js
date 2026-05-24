const Joi = require("joi");

const CategoryDTO = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  parentId: Joi.string().allow(null, '').optional().default(null),
  description: Joi.string().allow(null, '').optional().default(null),
  brandId: Joi.array().items(
    Joi.string().allow(null, '').optional().default(null)
  ).allow(null, '').optional().default(null),
  isMenuItem: Joi.boolean().default(false),
  pinToHome: Joi.boolean().default(false),
  status: Joi.string().regex(/^(active|inactive)$/).required(),
  image: Joi.string().allow(null, '').optional().default(null)
})

module.exports = {
  CategoryDTO
}