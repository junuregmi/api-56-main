const authRouter = require("express").Router()
const authCtrl = require("../controller/AuthController");
const loginCheck = require("../middlewares/auth.middleware");
const uploader = require("../middlewares/uploader.middleware");
const bodyValidator = require('../middlewares/validator.middleware')

const { LoginDTO, RegisterDTO } = require("../dto/auth.dto");

// /register
// uploader().none(), => it will parse multipart/form-data but if file is not uploaded
// uploader().single("fieldName") => it will upload a single file selected on "fieldName"
// uploader().array("fieldName") => it will upload multiple files selected on "fieldName"
// uploader().fields([{name: "fieldName", maxCount: number}]) => it will upload multiple files selected on "fieldName"

authRouter.post("/register", uploader().single('image'), bodyValidator(RegisterDTO), authCtrl.userRegister);
authRouter.get("/activate/:token", authCtrl.activateUser);
authRouter.get("/re-activate/:token", authCtrl.resendActivationLink);
// /login
authRouter.post("/login", bodyValidator(LoginDTO), authCtrl.loginUser);
authRouter.get("/me", loginCheck(), authCtrl.getLoggedInUserProfile);
// authRouter.get("/me", loginCheck(['admin','seller']), authCtrl.getLoggedInUserProfile);

authRouter.put("/user-edit/:userId", loginCheck(), authCtrl.updateUserProfile);     // name, address, phone, image, gender, (excepti email, password)

authRouter.get("/logout", loginCheck(), authCtrl.logout)


module.exports = authRouter