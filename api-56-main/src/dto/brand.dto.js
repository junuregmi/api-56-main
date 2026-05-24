const Joi = require("joi");

const BrandDTO = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  status: Joi.string().regex(/^(active|inactive)$/).required(),
  logo: Joi.string().allow(null, '').optional().default(null)
})

module.exports = {
  BrandDTO
}