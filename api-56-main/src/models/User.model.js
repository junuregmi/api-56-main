const mongoose = require("mongoose")
const { UserRoles, Status, Gender } = require("../config/constants")

// schema 
const UserSchema = new mongoose.Schema(
  {
    // definition of your collection(table)
    name: {
      type: String,
      min: 2,
      max: 50,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      // enum: [UserRoles.ADMIN, UserRoles.SELLER, UserRoles.CUSTOMER]
      // enum: ["admin","seller","customer"],
      enum: Object.values(UserRoles),
      default: UserRoles.CUSTOMER,
    },
    address: {
      type: String,
      default: null,
    },
    // phone: {
    //   type: String
    // }
    phone: String,
    image: {
      publicId: String,
      secureUrl: String,
      optimizedUrl: String,
    },
    gender: {
      type: String, 
      enum: Object.values(Gender)
    },
    // register -> activation 
    status: {
      type: String, 
      enum: Object.values(Status),
      default: Status.INACTIVE
    },
    activationToken: String, 
    expiryTime: Date,
    // createdAt, updatedAt,
  },
  {
    // config for model
    timestamps: true,     // createdAt, updatedAt, 
    autoCreate: true,
    autoIndex: true
  }
);

const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel