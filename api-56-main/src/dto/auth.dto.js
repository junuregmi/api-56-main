const Joi = require('joi')


const LoginDTO = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

// strong pwd rule 
// 1 small, 1 capital,1 number, 1 special char, min 8,25
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W@_-]).{8,25}$/;
// +977, 977, 977-, 977 98 ,97,96
const mobileNo = /^(?:\+977[\s-]?|977[\s-]?)?(98|97|96|91)[\s-]?\d{2}[\s-]?\d{3}[\s-]?\d{3}$/

const RegisterDTO = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.min": "Name should be of atleast 2 character long"
  }),
  email: Joi.string().email().required(),
  password: Joi.string().regex(passwordRegex).required().messages({
    "string.pattern.base":
      "Password must contain atleast 1 small letter, 1 capital letter, 1 number, 1 special character and should be of 8-25 character long",
  }), // 1 small letter, 1 capital letter, 1 number, 1 special char, min: 8 to 25 char long
  // confirmPassword: Joi.ref("password"),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  address: Joi.string().allow(null, "").optional().default(null),
  phone: Joi.string().regex(mobileNo).required().messages({
    "string.pattern.base": "Should only support the mobile number from Nepal"
  }),
  // role: Joi.string().allow(["customer", "seller"]).default("customer"), // POS, ecommerce
  role: Joi.string().regex(/^(customer|seller)$/).default("customer").messages({
    "string.pattern.base": "Role must be either 'seller' or 'customer'"
  }), // POS, ecommerce
  image: Joi.string().allow(null, "").optional().default(null),
});

module.exports = {
  LoginDTO,
  RegisterDTO,
};