const mongoose = require("mongoose");
const { Status } = require("../config/constants");

const BrandSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 2,
    max: 100,
    required: true,
    unique: true,
  },
  slug: {
    // user will not add this slug
    type: String,
    required: true,
    unique: true,
  },
  logo: {
    publicId: String,
    secureUrl: String,
    optimizedUrl: String,
  },
  status: {
    type: String,
    enum: Object.values(Status),
    default: Status.INACTIVE,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    default: null,
  },
  updatedBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    default: null,
  },
}, {
  autoCreate: true, 
  autoIndex: true, 
  timestamps: true
});

const BrandModel = mongoose.model("Brand", BrandSchema)
module.exports = BrandModel