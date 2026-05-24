const mainRouter = require("express").Router();
const authRouter = require("./auth");
const bannerRouter = require("./banner");
const brandRouter = require("./brand");
const categoryRouter = require("./category");
const chatRouter = require("./chat");
const homeRouter = require("./home");


mainRouter.use(homeRouter)
// module/feature router mount 
mainRouter.use("/auth",authRouter)
mainRouter.use("/brand", brandRouter);
mainRouter.use("/category", categoryRouter);
mainRouter.use("/banner", bannerRouter)
mainRouter.use("/chat", chatRouter)

module.exports = mainRouter
