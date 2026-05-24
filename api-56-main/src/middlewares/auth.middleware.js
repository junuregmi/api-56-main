const { AppConfig } = require("../config/app.config");
const { UserRoles } = require("../config/constants");
const sessionService = require("../services/session.service");
const jwt = require('jsonwebtoken')

// login and permission check 
module.exports = (role =null) => {
  return async (req, res, next) => {
    try {
      let token = req.headers["authorization"];
      if(!token) {
        next({code: 401, message: "Token is empty", status: "TOKEN_EMPTY_ERR"})
      } else {
        // 
        token = token.replace("Bearer ", "");
        const sessionDetail = await sessionService.getSingleRowByFilter({token: token})
        
        // console.log(sessionDetail)

        if(!sessionDetail) {
          next({code: 404,  message: "Token not found...", status: "TOKEN_NOT_FOUND_ERR"})
        } else {
          // session 
          /// token verify 
          jwt.verify(token, AppConfig.jwtSecret)
          
          req.loggedInUser = sessionDetail.user

          // route access 
          if (
            role === null ||
            sessionDetail.user.role === UserRoles.ADMIN ||
            (role && role.includes(sessionDetail.user.role))
          ) {
            next();
          } else {
            next({code: 403, message: "Access denied", status: "ACCESS_DENIED_ERR"})
          }
        }

      }
    } catch(exception) {
      let errorBag = {
        status: "AUTH_ERR",
        message: exception.message, 
        status: 401
      }
      next(errorBag)
    }
  };
}