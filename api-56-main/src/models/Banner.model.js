const {sequelize} = require("../config/sequelize.config")
const {DataTypes} = require("sequelize");
const {Status} = require("../config/constants");

const BannerModel = sequelize.define("banners", {
  _id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING, // 255
    allowNull: true,
  },
  image: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(Object.values(Status)),
    defaultValue: Status.INACTIVE,
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  updatedBy: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Date.now(),
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: null,
    onUpdate: Date.now(),
  },
});
module.exports = BannerModel