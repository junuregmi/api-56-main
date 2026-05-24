const brandRouter = require('express').Router()
const { UserRoles } = require('../config/constants');
const brandCtrl = require('../controller/BrandController');
const { BrandDTO } = require('../dto/brand.dto');
const loginCheck = require("../middlewares/auth.middleware");
const uploader = require('../middlewares/uploader.middleware');
const bodyValidator = require("../middlewares/validator.middleware")

// public listing
brandRouter.get("/list-all", brandCtrl.publicListAll);
// brand wise product list 
brandRouter.get('/:slug/detail', brandCtrl.listAllProductsByBrandSlug)


// CRUD
brandRouter.post("/", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), uploader().single("logo"), bodyValidator(BrandDTO), brandCtrl.create);
brandRouter.get("/", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), brandCtrl.listAll);

// Edit/update
brandRouter.get("/:id", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), brandCtrl.getDetailById);
brandRouter.put("/:id", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), uploader().single('logo'), bodyValidator(BrandDTO), brandCtrl.update);
// Delete 
brandRouter.delete("/:id", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), brandCtrl.delete);

module.exports = brandRouter