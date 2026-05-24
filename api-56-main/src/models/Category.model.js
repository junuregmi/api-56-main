const mongoose = require("mongoose");
const { Status } = require("../config/constants");

const CategorySchema = new mongoose.Schema(
  {
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
    parentId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    brandId: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Brand",
        default: null,
      },
    ],
    isMenuItem: {
      type: Boolean,
      default: false,
    },
    pinToHome: {
      type: Boolean,
      default: false,
    },
    image: {
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
  },
  {
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
  }
);

const CategoryModel = mongoose.model("Category", CategorySchema);
module.exports = CategoryModel