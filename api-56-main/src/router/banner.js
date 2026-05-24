const bannerRouter = require('express').Router()
const { UserRoles } = require('../config/constants');
const bannerCtrl = require('../controller/BannerController');
const { BannerDTO } = require('../dto/banner.dto');
const loginCheck = require("../middlewares/auth.middleware");
const uploader = require('../middlewares/uploader.middleware');
const bodyValidator = require("../middlewares/validator.middleware")

// public listing
bannerRouter.get("/list-all", bannerCtrl.publicListAll);


// CRUD
bannerRouter.post("/", loginCheck([UserRoles.ADMIN]), uploader().single("image"), bodyValidator(BannerDTO), bannerCtrl.create);
bannerRouter.get("/", loginCheck([UserRoles.ADMIN]), bannerCtrl.listAll);

// Edit/update
bannerRouter.get("/:id", loginCheck([UserRoles.ADMIN]), bannerCtrl.getDetailById);
bannerRouter.put("/:id", loginCheck([UserRoles.ADMIN]), uploader().single('image'), bodyValidator(BannerDTO), bannerCtrl.update);
// Delete 
bannerRouter.delete("/:id", loginCheck([UserRoles.ADMIN]), bannerCtrl.delete);

module.exports = bannerRouter