const mongoose = require("mongoose");
const { DBConfig } = require("./app.config");

(async () => {
  try {
    // db connect
    await mongoose.connect(DBConfig.mongoDb.url, {
      dbName: DBConfig.mongoDb.dbName,
      autoCreate: true, 
      autoIndex: true, 
    })
    console.log("**** Mongodb Server connected Successfully. ****")
  } catch(exception) {
    console.error("**** Error while connecting mongodb Server ****")
    process.exit(1)
  }
})();