const categoryRouter = require('express').Router()
const { UserRoles } = require('../config/constants');
const categoryCtrl = require('../controller/CategoryController');
const { CategoryDTO } = require('../dto/category.dto');
const loginCheck = require("../middlewares/auth.middleware");
const uploader = require('../middlewares/uploader.middleware');
const bodyValidator = require("../middlewares/validator.middleware")

// public listing
categoryRouter.get("/list-all", categoryCtrl.publicListAll);
// category wise product list 
categoryRouter.get('/:slug/detail', categoryCtrl.listAllProductsByCategorySlug)


// CRUD
categoryRouter.post("/", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), uploader().single("image"), bodyValidator(CategoryDTO), categoryCtrl.create);
categoryRouter.get("/", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), categoryCtrl.listAll);

// Edit/update
categoryRouter.get("/:id", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), categoryCtrl.getDetailById);
categoryRouter.put("/:id", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), uploader().single('image'), bodyValidator(CategoryDTO), categoryCtrl.update);
// Delete 
categoryRouter.delete("/:id", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), categoryCtrl.delete);

module.exports = categoryRouter