// importing express from node_modules/
const express = require("express")
const mainRouter = require("../router/router")
const errorHandler = require("../middlewares/error-handler.middleware")
const { sqlInit } = require("./sequelize.config")
const cors = require("cors");
const {rateLimit} = require("express-rate-limit")
const helmet  = require('helmet')
// db load 
require("./mongodb.config")
sqlInit();

// building express applicaiton, serverside application
const app = express() 

const limiter = rateLimit({
  windowMs: 1*60*1000,
  limit: 100
})

// cors allow
app.use(cors());    // cors allowed to every client
app.use(limiter)
app.use(helmet())

// parser 
// 3 method 
  // json
  app.use(express.json({ limit: "5mb" }));  // headers: 
  // urlencoded 
  app.use(express.urlencoded({ limit: "5mb" }))
  

// routing 
// app.use(mainRouter);
app.use("/api/v1",mainRouter);

// 404 
app.use((req, res, next) => {
  next({code: 404, message: "Path not found", status: "NOT_FOUND_ERR"})
})
    
// exporting for external use
app.use(errorHandler)
module.exports = app