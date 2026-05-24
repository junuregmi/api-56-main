const { Sequelize } = require("sequelize");
const { DBConfig } = require("./app.config");

const sequelize = new Sequelize(DBConfig.pg.url, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true
    }
  },
  // logging: true
})

// test 
const sqlInit = async() => {
  try {
    await sequelize.authenticate();
    console.log("**** SQL server Connected successfully. ****")
  } catch(exception) {
    // throw 
    throw {code: 500, message: "Error establishing sql connection", stauts: "SQL_CONNECTION_ERR"}
  }
}


module.exports = {
  sequelize,
  sqlInit
}