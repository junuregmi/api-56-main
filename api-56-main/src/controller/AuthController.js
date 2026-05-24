const { AppConfig } = require("../config/app.config");
const { Status } = require("../config/constants");
const sessionService = require("../services/session.service");
const userService = require("../services/user.service");
const { randomStringGenerator } = require("../utilities/helpers");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class AuthController {
  userRegister = async (req, res, next) => {
    try {
      // data mapping
      const data = await userService.transformForUserRegister(req);
      // db store
      const userObj = await userService.createUser(data);
      // send email
      await userService.sendActivationEmail(userObj);

      res.json({
        data: userService.getPublicUserProfileFromUser(userObj),
        message: "You are now registered.",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  };

  activateUser = async (req, res, next) => {
    try {
      const token = req.params.token;
      const userDetail = await userService.getSingleUserByFilter({
        activationToken: token,
      });
      if (!userDetail) {
        res.redirect(
          "http://localhost:5173/?status=error&msg=Token does not associate with any user"
        );
        // redirect
        // throw {code: 404, message: "Token does not associate with any user.", status: "INVALID_TOKEN_ERR"}
      } else {
        // time
        const today = Date.now(); //  9:01, 8:01
        if (today > userDetail.expiryTime) {
          // redirect
          res.redirect(
            "http://localhost:5173/?expired=1&status=error&msg=Activation link is expired, please request another link"
          );
          // throw {code: 400, message: "Activation link is expired, please request another link", status: "EXPIRED_LINK_ERR"}
        } else {
          // user found
          const activationBody = {
            status: Status.ACTIVE,
            activationToken: null,
            expiryTime: null,
          };
          // user update
          await userService.updateSingleRowByFilter(
            { _id: userDetail._id },
            activationBody
          );

          res.redirect(
            "http://localhost:5173/?stauts=activationSuccess&msg=Your account has been activated successfully"
          );
        }
      }
    } catch (exception) {
      console.log(exception);
      // redirect
      res.redirect("http://localhost:5173/?status=error&msg=Activation Failed");

      // next(exception)
    }
  };

  resendActivationLink = async (req, res, next) => {
    try {
      const token = req.params.token;
      const userDetail = await userService.getSingleUserByFilter({
        activationToken: token,
      });
      if (!userDetail) {
        throw {
          code: 404,
          message: "Token does not associate with any user.",
          status: "INVALID_TOKEN_ERR",
        };
      }
      const today = Date.now(); //  9:01, 8:01
      if (today <= userDetail.expiryTime) {
        // not expired
        throw {
          code: 422,
          message: "Token is not expired. Please try clicking the link again.",
          status: "TOKEN_NOT_EXPIRED_ERR",
        };
      }

      //expired
      const activationBody = {
        status: Status.INACTIVE,
        activationToken: randomStringGenerator(),
        expiryTime: new Date(today + 86400000),
        // expiryTime: new Date(today + 120000),
      };

      // update
      const user = await userService.updateSingleRowByFilter(
        { _id: userDetail._id },
        activationBody
      );
      // email
      await userService.reSendActivationEmail(user);

      res.json({
        data: activationBody,
        message: "Link has been forwared to your registered email",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  };

  loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const userDetail = await userService.getSingleUserByFilter({
        email: email,
      });
      // email verify
      if (!userDetail) {
        throw {
          code: 404,
          message: "User not registered",
          status: "USER_NOT_REGISTERED_ERR",
        };
      }
      // activation verify
      if (userDetail.status !== Status.ACTIVE) {
        throw {
          code: 422,
          message: "Your account is not active yet.",
          status: "NOT_ACTIVATED_ERR",
        };
      }
      // password verify
      if (!bcrypt.compareSync(password, userDetail.password)) {
        throw {
          code: 422,
          message: "Credentials does not match",
          status: "CREDENTIAL_ERR",
        };
      }
      // TODO: OTP implement

      // access to the platform
      const accessToken = jwt.sign(
        { sub: userDetail._id },
        AppConfig.jwtSecret,
        { expiresIn: "1d" }
      );
      // TODO: logout implement => token store in a collection(session)
      const session = await sessionService.storeSession({
        user: userDetail._id,
        token: accessToken,
        device: "web",
      });

      res.json({
        data: {
          token: accessToken,
          sessionId: session._id,
        },
        message: "You are logged in successfully",
        status: "LOGIN_SUCCESS",
      });
    } catch (exception) {
      next(exception);
    }
  };
  getLoggedInUserProfile(req, res, next) {
    res.json({
      data: req.loggedInUser,
      message: "Your Profile",
      status: "OK",
    });
  }

  updateUserProfile(req, res, next) {
    // check user is logged in or not
    res.json({
      data: {},
      message: "Updated profile",
      status: "OK",
    });
  }

  async logout(req, res, next) {
    try {
      const userId = req.loggedInUser._id;
      await sessionService.deleteSingleRowByFilter({
        user: userId
      })
      res.json({
        data: null, 
        message: "You are logged out successfully",
        status: "LOGOUT_SUCCESS"
      })
    } catch(exception) {
      next(exception)
    }
  }
}
// const authCtrl = new AuthController();
// module.exports = authCtrl

module.exports = new AuthController()